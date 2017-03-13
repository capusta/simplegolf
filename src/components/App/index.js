import React, { Component } from 'react';
import classnames from 'classnames';
import Control from '../Control'
import Players from '../Players'
import Course from '../Course'
import './style.css';


class App extends Component {
    //more code here
    constructor(props){
        super(props);
        this.state = {
            gamename:      null,
            alert:         '',
            userinput:     null,
            activeplayer:  null,
            players:       [],
        };
        this.SetAlert        = this.SetAlert.bind(this);
        this.SetActivePlayer = this.SetActivePlayer.bind(this);
        this.HandleGameLoad  = this.HandleGameLoad.bind(this);
        this.ReloadPlayers   = this.ReloadPlayers.bind(this);
        this.UpdateGameName  = this.UpdateGameName.bind(this);
    }
    componentDidUpdate(prevProps, prevState){
        if (prevState.gamename == null && this.state.gamename != null){
            this.ReloadPlayers();
            console.log("Game trainssition to " + this.state.gamename)
            }
        }
    SetAlert(msg){
        this.setState({alert: msg})
    }
    SetActivePlayer(p){
        this.setState({activeplayer: p})
    }
    SetPlayers(p){
        this.setState({players: p})
    }
    SetGameName(g){
        this.setState({gamename: g})
    }
    UpdateGameName(event){
        event.preventDefault();
        this.setState({userinput: event.target.value})
        console.log("App userinput " + this.state.userinput)
    }
    ReloadPlayers(){
        var that = this;
        console.log("App reloading players ")
        fetch(process.env.REACT_APP_BASE_URL+'/api/games/'+this.state.gamename)
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            that.SetPlayers(data.players)
        })
    }
    HandleGameLoad(event){
        event.preventDefault();
        var that = this;
        this.SetAlert("App Loading game " +  this.state.userinput)
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
                    that.SetAlert("game loaded")
                    that.SetGameName(data.gamename);
                }
            })
    }

    render() {
        const { className, ...props } = this.props;
        if (this.state.gamename) {
            var header   = this.state.gamename
            var gameload = null
            var control = (
            <div>
            <Control gamename={this.state.gamename} SetAlert={this.SetAlert}
                activeplayer={this.state.activeplayer} players={this.state.players}
                SetActivePlayer={this.SetActivePlayer} ReloadPlayers={this.ReloadPlayers} />
            </div>
            )
        } else {
            var header = 'golfiness'
            var gameload = (
                <div>
                <input type="text" value={this.state.userinput} onChange={this.UpdateGameName} />
                <span className={classnames("fa","fa-chevron-circle-right","fa-2x",)}
                    onClick={this.HandleGameLoad} />
                 <p>Please Enter Game Name</p>
                </div>
                )
             var control = null
        }
        return (
            <div className={classnames('App',className)} {...props}>
                <div className="App-header">
                    <h4>{header}</h4>
                    <div>{this.state.alert}</div>
                </div>
                {gameload}
                {control}
            </div>
        );
    }
}

export default App;
