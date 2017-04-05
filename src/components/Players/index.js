import React, { PropTypes, Component } from 'react';
import './style.css'
import classnames from 'classnames';

export default class Players extends Component {
    //Props: SetAlert gamename players SetActivePlayer activehole ReloadPlayers
    constructor(props){
        super(props)
        this.state = {
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
        var name = e.target.getAttribute('data-value')
        this.UpdateScore(this.props.gamename,name,'up')
    }
    UpdateScoreDown(e){
        e.preventDefault();
        var name = e.target.getAttribute('data-value')
        this.UpdateScore(this.props.gamename,name,'down')
    }
    UpdateScore(game, player, dir){
        var that = this;
        fetch(process.env.REACT_APP_BASE_URL+
            "/api/score/"+that.props.gamename+"/"+player+"/"+dir,
                {method: 'put'})
                .then(function(res){
                    return res.json();
                })
                .then(function(data){
                    console.log(JSON.stringify(data))
                    that.props.ReloadPlayers()
                })
        console.log("Players: updating " + game + " - " + player + "hole: " + this.props.activehole + " - " + dir)
    };
    render(){
        const { className, ...props } = this.props;
        //console.log("Players length, gamename " + JSON.stringify(this.props.players) + " --- " + this.props.gamename)
        var players = [];
        var divcolor, activescore, player = null;
        var that = this
        this.props.players.map(function(p){
            if (p.name == that.state.activeplayer){
                divcolor = { 'background-color': 'lightgray' }
            } else {
                divcolor = { 'background-color': 'white' }
            }
            if (that.props.activehole == null) {
                var score = 0
                //TODO: good time to go and reload players' scores if necessary
                if (p.course != [] && p.course != undefined){
                    score = p.course.reduce(function(acc, val){
                        return acc += val
                    }, 0)
                }
                player = (
                    <p>{ score }</p>
                )
            } else {
                var score = p.course[that.props.activehole]
                if (!score){
                    score = 0;
                }
                player = (
                    <div>
                        <span className={classnames("fa","fa-minus-square","fa-2x",)} data-value={p.name} onClick={that.UpdateScoreDown} />
                        {score}
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
