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
        }
        this.HandleGameLoad = this.HandleGameLoad.bind(this);
        this.HandleGameName = this.HandleGameName.bind(this);
    }
    HandleGameName(event){
        this.setState({usergameinput: event.target.value})
    }
    HandleGameLoad(event){
        var that = this;
        event.preventDefault();
        this.props.SetAlert("Loading game " +  this.state.usergameinput)
        fetch(process.env.REACT_APP_BASE_URL+'/api/games/'+this.state.usergameinput)
            .then(function(res){
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
        var utility
        if (this.props.activeplayer != null){
            utility = (
                this.props.activeplayer
            )
        }
        if (this.props.players.length == 0){
            utility = (
                'Add Players'
            )
        }
        if (this.props.gamename == null){
            utility = (
                <form onSubmit={this.HandleGameLoad}>
                    <label>
                        <input type="text" onChange={this.HandleGameName} />
                </label>
                <input type="submit" value="Submit" />
                </form>
            )
        }
        return (
            <div className={classnames('Control', className)} {...props}>
                <div className={classnames('row','block')}>
                    {utility}
                </div>
            </div>
        );
    }
}
