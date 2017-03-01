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
            players: this.props.players,
        }
        this.handleEditPlayers = this.handleEditPlayers.bind(this)
        this.handleAddSubmit   = this.handleAddSubmit.bind(this)
        this.handleAddChange   = this.handleAddChange.bind(this)
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
                that.props.setAlert("Player added")
                var newPlayers = that.state.players;
                newPlayers.push({name: data.name})
                that.setState({players: newPlayers})
            })
    }
    render(){
        const { className, ...props } = this.props;
        console.log("players state: " + this.state.players)
        var editElem
        if (this.state.players.length == 0){
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
                <Person name={p.name} gameName={that.props.gameName}/>
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
