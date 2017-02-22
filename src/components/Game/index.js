import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Players from '../Players'

export default class Game extends Component {
    //Props: gameName, setAlert
    constructor(props){
        super(props)
        this.state = {
            gameName: null,
            players:  [],
            activePlayer: null,
            activeHole:   null,
        }
        this.handleGameLoad = this.handleGameLoad.bind(this);
        this.handleGameName = this.handleGameName.bind(this);
        //this.getPlayers = this.getPlayers.bind(this);
    }
    handleGameName(event){
        this.setState({userGameInput: event.target.value})
    }
    handleGameLoad(event){
        var that = this;
        event.preventDefault();
        this.props.setAlert("Loading game " +  this.props.gameName)
        fetch(process.env.REACT_APP_BASE_URL+'/api/games/'+this.state.userGameInput)
            .then(function(res){
                if(res.status != 200){
                    return {gameName: null}
                } else {
                    return res.json();
                }
            })
            .then(function(data){
                if (data.gameName == null) {
                    that.props.setAlert("Error parsing game data for  " + data.gameName)
                } else {
                    // Update alert banner
                    that.props.setAlert("game loaded")
                    // Update parent display
                    that.props.setGameName(data.gameName);
                    // Update local state
                    that.setState({gameName: data.gameName});
                    // Grab initial player data
                    that.loadPlayers(data.gameName)
                }
            })
    }
    loadPlayers(gameID){
        var that = this;
        fetch(process.env.REACT_APP_BASE_URL+'/api/players/'+gameID)
            .then(function(res){
                return res.json();
            })
            .then(function(data){
                console.log('fetching players: ' + JSON.stringify(data))
                that.setState({players: data})
            })
    }
    render() {
        const { className, ...props } = this.props;
        if (this.state.gameName == null){
            return (
				<div className={classnames('Game', className)} {...props}>
					<form onSubmit={this.handleGameLoad}>
						<label>
							<input type="text" onChange={this.handleGameName} />
				        </label>
				    <input type="submit" value="Submit" />
				    </form>
				</div>
            )
        }
        return (
            <div className={classnames('Game', className)} {...props}>
                <Players gameName={this.state.gameName} players={this.state.players}
                    setAlert={this.props.setAlert} loadPlayers={this.loadPlayers}/>
            </div>
        );
    }
}
