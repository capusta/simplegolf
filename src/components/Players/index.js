import React, { PropTypes, Component } from 'react';
import './style.css'
import classnames from 'classnames';
import Person from '../Person'

export default class Players extends Component {
    //Props: setAlert gameName players
    constructor(props){
        super(props)
        this.state = {
            editMode: false,
            players: []
        }
        this.handleEditPlayers = this.handleEditPlayers.bind(this)
        this.handleAddSubmit   = this.handleAddSubmit.bind(this)
        this.handleAddChange   = this.handleAddChange.bind(this)
    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps.gameName == null && this.props.gameName != null){
            //we are loading for the first time
            //this.loadPlayers(this.props.gameName)
        }
    }
    // Performs initial loading of the players in the game
    loadPlayers(gameID){
        var that = this;
        fetch(process.env.REACT_APP_BASE_URL+'/api/players/'+gameID)
            .then(function(res){
                return res.json();
            })
            .then(function(data){
                console.log('Players fetching players: ' + JSON.stringify(data))
                that.setState({players: data})
            })
    }
    handleEditPlayers(event){
        event.preventDefault();
        console.log("edit mode: " + this.state.editMode)
        this.setState({editMode: !this.state.editMode})
    }
    handleAddChange(event){
        event.preventDefault();
        this.setState({editedUser: event.target.value})
    }
    handleAddSubmit(event){
        event.preventDefault();
        var payload = {oldname: '', newname: this.state.editedUser},
            that    = this
        console.log("adding user " + this.state.editedUser)
        fetch(process.env.REACT_APP_BASE_URL+'/api/players/'+this.props.gameName,
            {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            .then(function(res){
                return res.json();
            })
            .then(function(data){
                console.log("reply body: " + JSON.stringify(data))
                if (!data.success){
                    that.props.setAlert(data.msg)
                    return
                }
                that.props.setAlert("Player added")
                var p = that.state.players
                p.push({name: data.name, score: 0})
                that.setState({players: p, editMode: false})
            })
    }
    render(){
        const { className, ...props } = this.props;
        var editElem
        if (this.state.players.length == 0 || this.state.editMode){
            editElem = (
                <form onSubmit={this.handleAddSubmit}>
                    <label>
                        <input type="text" onChange={this.handleAddChange} />
                </label>
                <button type="submit">
                    <i className={classnames("fa", "fa-check")} aria-hidden="true"></i>
                </button>
                </form>
            )
        } else {
            editElem = (
                <button onClick={this.handleEditPlayers}>
                    <i className={classnames("fa", "fa-user-plus")} aria-hidden="true"></i>
                </button>
            )
        }
        if(!this.props.gameName){ editElem=null }
        var players = [];
        var that = this
        this.state.players.map(function(p){
            players.push(<div className={classnames('col')}>
                <Person name={p.name} gameName={that.props.gameName} setAlert={that.props.setAlert}/>
                </div>)
        })
        return(
            <div>
                <div className={classnames('row','centered', className)} {...props}>
                    <div className={classnames('centered')}>{editElem}
                    </div>
                </div>
                <div className={classnames('row','text-center','Players', className)} {...props}>
                    {players}
                </div>
            </div>
        )
    }
}
