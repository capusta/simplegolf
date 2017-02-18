import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

export default class Game extends Component {
    constructor(props){
        super(props)
        this.state = {
            players: [],
            holes: [],
            scores: [],
            currentPlayer: null,
            currentHole:   null,
            currentScore:  null,
        }
    }
    render() {
        const { className, ...props } = this.props;
        console.log("rendering game " + JSON.stringify(this.props))
        if (this.props.gameName == null){
            return (
                <div className={classnames('Game', className)} {...props}>
                    <p>'... please load ...'</p>
                </div>
            )
        }
        var players = this.props.getPlayers(this.props.gameName)
        return (
            <div className={classnames('Game', className)} {...props}>
            <p>{this.state.players}.</p>
            </div>
        );
    }
}
