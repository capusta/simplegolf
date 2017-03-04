import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
//import Players from '../Players'
import './style.css'

export default class Control extends Component {
    //Props:
    //Game Relate        gamename SetAlert SetGameName
    //Player Related:    activeplayer numplayers
    constructor(props){
        super(props)
        this.state = {
            activeplayer: null,
            userinput: null,
        }
        this.HandleGameLoad    = this.HandleGameLoad.bind(this);
        this.HandleGameName    = this.HandleGameName.bind(this);
        this.HandleAddPlayerChange = this.HandleAddPlayerChange.bind(this);
        this.HandleAddPlayerSubmit = this.HandleAddPlayerSubmit.bind(this);
    }
    HandleAddPlayerChange(event){
        event.preventDefault();
        this.setState({userinput: event.target.value})
    }
    HandleGameName(event){
        event.preventDefault();
        this.setState({userinput: event.target.value})
    }
    HandleAddPlayerSubmit(event){
        event.preventDefault();
        this.props.SetAlert("Adding Player " +  this.state.userinput)
        var payload = {oldname: null, newname: this.state.userinput},
            that = this
        console.log("Control adding palyer " + JSON.stringify(payload))
        fetch(process.env.REACT_APP_BASE_URL+'/api/players/'+that.props.gamename,
            {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            .then(function(res){
                console.log("Control got reply")
                return res.json();
            })
            .then(function(data){
                console.log("Control got reply for adding player " + JSON.stringify(data))
                if (!data.success){
                    that.props.SetAlert(data.msg)
                    return
                }
                that.props.SetAlert(data.msg)
                var p = that.props.players
                p.push({name: data.name, score: 0})
                that.props.SetPlayers(p)
                that.setState({userinput: null})
            })
    }
    HandleGameLoad(event){
        var that = this;
        event.preventDefault();
        this.props.SetAlert("Loading game " +  this.state.userinput)
        fetch(process.env.REACT_APP_BASE_URL+'/api/games/'+this.state.userinput)
            .then(function(res){
                that.setState({userinput: null})
                if(res.status != 200){
                    return {gamename: null}
                } else {
                    return res.json();
                }
            })
            .then(function(data){
                if (data.gamename == null) {
                    that.props.SetAlert("Error parsing game data for  " + data.gamename)
                } else {
                    // Update alert banner
                    that.props.SetAlert("game loaded")
                    // Update parent display
                    console.log("Setting GameName " + data.gamename)
                    that.props.SetGameName(data.gamename);
                    that.props.SetPlayers(data.players);
                }
            })
    }
    render() {
        const { className, ...props } = this.props;
        var utility, utilityplayer, utilitygame = null;
        console.log(this.state.userinput)
        // Handle all the selections
        if (this.props.activeplayer != null){
            utility = (
                this.props.activeplayer
            )
        }
        // Add Players if there are none
        if (this.props.players.length == 0 && this.props.gamename != null){
            utilityplayer = (
                <form onSubmit={this.HandleAddPlayerSubmit}>
                    <label>
                        <input type="text" value={this.state.userinput}
                            onChange={this.HandleAddPlayerChange} />
                </label>
                <button type="submit">
                    <i className={classnames("fa", "fa-user-plus")} aria-hidden="true"></i>
                </button>
                </form>
            )
        }
        // Need to find a game name first
        if (this.props.gamename == null){
            utilitygame = (
                <form onSubmit={this.HandleGameLoad}>
                    <label>
                        <input type="text" value={this.state.userinput}
                            onChange={this.HandleGameName} />
                </label>
                <input type="submit" value="Submit" />
                </form>
            )
        }
        return (
            <div className={classnames('Control', className)} {...props}>
                <div className={classnames('row','block')}>
                    {utility}
                    {utilityplayer}
                    {utilitygame}
                </div>
            </div>
        );
    }
}
