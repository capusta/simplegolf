import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import './style.css';

export default class Game extends Component {

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('Game', className)} {...props}>
        <h3> Game component </h3>
        <h5> {this.props.gameName} </h5>
      </div>
    );
  }
}
