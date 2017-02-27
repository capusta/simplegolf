import React, { PropTypes, Component } from 'react';
import './style.css'
import classnames from 'classnames';
import Person from '../Person'

export default class Players extends Component {
    //Props: setAlert gameName players getPlayers
    constructor(props){
        super(props)
        this.state = {
            editMode: false
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
        this.setState({editedUser: event.target.value})
    }
    handleAddSubmit(event){
        event.preventDefault();
        console.log("will call some api for: " + this.state.editedUser)
    }
    render(){
        const { className, ...props } = this.props;
        var editElem
        if (this.props.players.length == 0){
            editElem = (
                <form onSubmit={this.handleAddSubmit}>
                    <label>
                        <input type="text" onChange={this.handleAddChange} />
                </label>
                <button type="submit">
                    <i className={classnames("fa", "fa-user-plus")} aria-hidden="true"></i>
                </button>
                </form>
            )
        } else {
            editElem = (
                <button onClick={this.handleEditPlayers}>
                    <i className={classnames("fa", "fa-users")} aria-hidden="true"></i>
                </button>
            )
        }
        if(!this.props.gameName){ editElem=null }
        var players = [];
        var that = this
        this.props.players.map(function(p){
            players.push(<div className={classnames('col')}>
                <Person name={p.name} editMode={that.state.editMode}/>
                </div>)
        })
        return(
            <div>
                <div className={classnames('row','text-center','Players', className)} {...props}>
                    {players}
                </div>
                <div className={classnames('row','centered', className)} {...props}>
                    <div className={classnames('centered')}>{editElem}
                    </div>
                </div>
            </div>
        )
    }
}
