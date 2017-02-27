import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

export default class Person extends Component {
    //props:  name editMode
        //this.handle = this.handle.bind(this)
    render(){
        if (this.props.editMode) {
            var editIcon = (
                <i className={classnames("fa","fa-pencil")} aria-hidden="true"></i>
            )
        } else {
            var editIcon = null
        }
        const { className, ...props } = this.props;
        console.log(JSON.stringify(this.props))
        return (
            <div>
                {this.props.name}{editIcon}
            </div>
        )
    }
}
