import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

export default class Game extends Component {

  render() {
    const { className, ...props } = this.props;
    var players = this.props.players
    return (
      <div className={classnames('Game', className)} {...props}>
        <h5> {this.props.gameName} </h5>
        <p>{players}.</p>
      </div>
    );
  }
}
