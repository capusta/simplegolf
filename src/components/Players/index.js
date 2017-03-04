import React, { PropTypes, Component } from 'react';
import './style.css'
import classnames from 'classnames';
import Person from '../Person'

export default class Players extends Component {
    //Props: setAlert gameName players
    constructor(props){
        super(props)
        this.state = {
            players: []
        }
    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps.gameName == null && this.props.gameName != null){
            //we are loading for the first time
            //this.loadPlayers(this.props.gameName)
        }
    }
    render(){
        const { className, ...props } = this.props;
        var players = [];
        var that = this
        this.props.players.map(function(p){
            players.push(<div className={classnames('col')}>
                <Person name={p.name} gamename={that.props.gamename} SetAlert={that.props.SetAlert}/>
                </div>)
        })
        return(
            <div>
                <div className={classnames('row','text-center','Players', className)} {...props}>
                    {players}
                </div>
            </div>
        )
    }
}
