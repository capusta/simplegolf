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
            userinput: null,
            editmode:  false,
        }
        this.HandleGameLoad    = this.HandleGameLoad.bind(this);
        this.HandleEditMode      = this.HandleEditMode.bind(this);
        this.HandleGameName    = this.HandleGameName.bind(this);
        this.HandlePlayerChange = this.HandlePlayerChange.bind(this);
        this.HandleAddPlayerSubmit = this.HandleAddPlayerSubmit.bind(this);
        this.HandlePlayerUpdate    = this.HandlePlayerUpdate.bind(this);
        this.HandleEditModeCancel  = this.HandleEditModeCancel.bind(this);
    }
    HandlePlayerChange(event){
        event.preventDefault();
        this.setState({userinput: event.target.value})
    }
    HandleGameName(event){
        event.preventDefault();
        this.setState({userinput: event.target.value})
    }
    HandleEditMode(){
        var m = this.state.editmode;
        if (!m) {
            this.props.SetAlert('Edit player')
        }
        this.setState({editmode: !m, userinput: this.props.activeplayer})
    }
    HandleEditModeCancel(){
        this.setState({editmode: false})
    }
    HandlePlayerUpdate(){
        console.log("Control changing " + this.props.activeplayer + " to " + this.state.userinput)
        this.setState({editmode: !this.state.editmode})
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
        var utility_player_edit, utility_player_add, utility_game = null;
        // Add Players if there are none
        if (this.props.players.length == 0 && this.props.gamename != null){
            utility_player_add = (
                <form onSubmit={this.HandleAddPlayerSubmit}>
                    <label>
                        <input type="text" value={this.state.userinput}
                            onChange={this.HandlePlayerChange} />
                </label>
                <button type="submit">
                    <i className={classnames("fa", "fa-user-plus", "fa-2x")} aria-hidden="true"></i>
                </button>
                </form>
            )
        }
        if (this.props.activeplayer != null){
            if (this.state.editmode){
                utility_player_edit =  (
                    <div>
                        <input type="text" value={this.state.userinput}
                            onChange={this.HandlePlayerChange} />
                        <i className={classnames("fa","fa-check-square-o","fa-2x")} aria-hidden="true"
                            onClick={this.HandlePlayerUpdate}>  </i>
                    <i className={classnames("fa","fa-times","fa-2x")} aria-hidden="true"
                        onClick={this.HandleEditModeCancel}> </i>
                    </div>
                )} else {
                    utility_player_edit = (
                        <div>{this.props.activeplayer}
                            <i className={classnames("fa","fa-pencil-square-o","fa-2x")} aria-hidden="true"
                                onClick={this.HandleEditMode}>  </i>
                        </div>
                    )}
        }
        // Need to find a game name first
        if (this.props.gamename == null){
            utility_game = (
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
                    {utility_player_add}
                    {utility_game}
                    {utility_player_edit}
                </div>
            </div>
        );
    }
}
