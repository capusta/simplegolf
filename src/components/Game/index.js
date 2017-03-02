import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Players from '../Players'
import './style.css'

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
                    //that.loadPlayers(data.gameName)
                }
            })
    }
    render() {
        const { className, ...props } = this.props;
        var form
        if (this.state.gameName == null){
            form = (
                <form onSubmit={this.handleGameLoad}>
                    <label>
                        <input type="text" onChange={this.handleGameName} />
                </label>
                <input type="submit" value="Submit" />
                </form>
            )
        }
        return (
            <div className={classnames('Game', className)} {...props}>
                <div className={classnames('row','block')}>
                    {form}
                </div>
            <Players gameName={this.state.gameName} setAlert={this.props.setAlert} />
            </div>
        );
    }
}
