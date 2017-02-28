import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

export default class Person extends Component {
    constructor(props){
        super(props)
        this.state = {
            editMode: false,
            name: this.props.name,
        }
        this.goEditMode       = this.goEditMode.bind(this)
        this.handleNameUpdate = this.handleNameUpdate.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
    }
    goEditMode(e){
        e.preventDefault();
        this.setState({editMode: true})
    }
    handleNameChange(e){
        e.preventDefault();
        this.setState({name: event.target.value})
    }
    handleNameUpdate(e){
        e.preventDefault();
        var payload = {oldname: this.props.name, newname: this.state.name},
            that    = this,
            data = {}

        console.log("adding " + this.state.name + " 99 " + JSON.stringify(payload))
        fetch(process.env.REACT_APP_BASE_URL+'/api/players/'+this.props.gameName,
            {
                method: "put",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            .then(function(res){
                console.log("got reply for adding player")
                return res.json();
            })
            .then(function(data){
                that.setState({editMode: false, name: data.name})
                console.log(JSON.stringify(data))
            });
    }
    render(){
        if (this.state.editMode) {
            var okIcon = (
                <i className={classnames("fa","fa-check")} aria-hidden="true"></i>
            )
            var nameBox = (
                <form onSubmit={this.handleNameUpdate}>
                    <label>
                        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <button type="submit">{okIcon}</button>
                </form>
            )
        } else {
            var okIcon  = null
            var nameBox = <a href="#" onClick={this.goEditMode}>{this.state.name}{okIcon}</a>
        }
        const { className, ...props } = this.props;
        return (
        <div>
            {nameBox}
        </div>
        )
    }
}
