import React, { Component } from 'react';
import classnames from 'classnames';
import Control from '../Control'
import Players from '../Players'
import './style.css';


class App extends Component {
    //more code here
    constructor(props){
        super(props);
        this.state = {
            gamename:      null,
            alert:         '',
            activeplayer:  null,
            players:       [],
        };
        this.SetAlert    = this.SetAlert.bind(this);
        this.SetPlayers    = this.SetPlayers.bind(this);
		this.SetGameName = this.SetGameName.bind(this);
        this.SetActivePlayer = this.SetActivePlayer.bind(this);
    }
    SetAlert(msg){
        this.setState({alert: msg})
    }
    SetActivePlayer(p){
        this.setState({activeplayer: p})
    }
    SetPlayers(p){
        console.log("App Setting players (length)" + p.length + JSON.stringify(p))
        this.setState({players: p})
    }
	SetGameName(g){
		this.setState({gamename: g})
        console.log("App gamename state:" + this.state.gamename)
	}
    render() {
        const { className, ...props } = this.props;
        if (this.state.gamename) {
            var header  = this.state.gamename
        } else {
            var header = 'golfiness'
        }

        return (
            <div className={classnames('App',className)} {...props}>
                <div className="App-header">
                    <h4>{header}</h4>
                    <div>{this.state.alert}</div>
                </div>
			<Control gamename={this.state.gamename} SetAlert={this.SetAlert}
                SetGameName={this.SetGameName} activeplayer={this.state.activeplayer}
                players={this.state.players} SetPlayers={this.SetPlayers}
                SetActivePlayer={this.SetActivePlayer} />

            <Players gamename={this.state.gamename} SetAlert={this.SetAlert}
                players={this.state.players} SetActivePlayer={this.SetActivePlayer}/>
            </div>
        );
    }
}

export default App;
