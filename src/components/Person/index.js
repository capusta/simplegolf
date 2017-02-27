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
        console.log("Updating name via api: " + this.state.name)
        this.setState({editMode: false})
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
        console.log(JSON.stringify(this.props))
        return (
        <div>
            {nameBox}
        </div>
        )
    }
}
