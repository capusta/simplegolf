import React, { PropTypes, Component } from 'react';
import './style.css'
import classnames from 'classnames';

export default class Players extends Component {
    //Props: SetAlert gamename players SetActivePlayer activehole
    constructor(props){
        super(props)
        this.state = {
            players: [],
            activeplayer: null,
        }
        this.SetActive       = this.SetActive.bind(this);
        this.UpdateScoreUp   = this.UpdateScoreUp.bind(this);
        this.UpdateScoreDown = this.UpdateScoreDown.bind(this);
    }
    SetActive(e){
        e.preventDefault();
        var n = e.target.getAttribute('data-value')
        console.log("Person: active:" + n);
        this.setState({activeplayer: n});
        this.props.SetActivePlayer(n);
    }
    UpdateScoreUp(e){
        e.preventDefault();
        var n = e.target.getAttribute('data-value')
        console.log("updating score +1 for " + n + " for hole " + this.props.activehole)
    }
    UpdateScoreDown(e){
        e.preventDefault();
        var n = e.target.getAttribute('data-value')
        console.log("updating score -1 for " + n + " for hole " + this.props.activehole)
    }
    render(){
        const { className, ...props } = this.props;
        //console.log("Players length, gamename " + JSON.stringify(this.props.players) + " --- " + this.props.gamename)
        console.log("Players: " +  this.state.activeplayer + "//" + this.props.activehole   )
        var players = [];
        var divcolor, player = null;
        var that = this
        this.props.players.map(function(p){
            if (p.name == that.state.activeplayer){
                divcolor = { 'background-color': 'lightgray' }
            } else {
                divcolor = { 'background-color': 'white' }
            }
            if (that.props.activehole == null) {
                var score = 0
                if (p.course != []){
                    p.course.reduce(function(acc, val){
                        acc += val
                    }, score)
                }
                player = (
                    <p>{ score }</p>
                )
            } else {
                //TODO: Player's actual score
                var tmp = p.course[that.props.activehole]
                if (!tmp){
                    tmp = 0;
                }
                player = (
                    <div>
                        <span className={classnames("fa","fa-minus-square","fa-2x",)} data-value={p.name} onClick={that.UpdateScoreDown} />
                        {tmp}
                        <span className={classnames("fa","fa-plus-square","fa-2x",)} data-value={p.name} onClick={that.UpdateScoreUp} />
                    </div>
                )
            }
            players.push(
                //TODO: This seems like a large push for the component to render
                //especially when the player does not need to be selected in order to increase the score
                // should probably make this a spearate component ...
                <div className={classnames('row','text-center','player','pt-3', className)}
                    {...props} onClick={that.SetActive} data-value={p.name} style={divcolor}>
                    <div className={classnames('col','player_name')} onClick={that.SetActive} data-value={p.name}>
                        <a href="#" onClick={that.SetActive} data-value={p.name}>{p.name}</a>
                </div>
                <div className={classnames('col','player_holescore')}>
                    {player}
                </div>
                </div>)
        })
        return(
            <div>
                {players}
            </div>
        )
    }
}
