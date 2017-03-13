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
        this.SetActive = this.SetActive.bind(this);
    }
    //TODO: Detect hole change and update accordingly
    SetActive(e){
        e.preventDefault();
        var n = e.target.getAttribute('data-value')
        console.log("Person: active:" + n);
        this.setState({activeplayer: n});
        this.props.SetActivePlayer(n);
    }
    render(){
        const { className, ...props } = this.props;
        //console.log("Players length, gamename " + JSON.stringify(this.props.players) + " --- " + this.props.gamename)
        console.log("Players: " +  this.state.activeplayer + "//" + this.props.activehole   )
        var players = [];
        var divcolor, cmp = null;
        var that = this
        this.props.players.map(function(p){
            if (p.name == that.state.activeplayer){
                divcolor = { 'background-color': 'lightgray' }
            } else {
                divcolor = { 'background-color': 'white' }
            }
            if (that.props.activehole == null) {
                cmp = 'score here'
            } else {
                cmp = parseInt(that.props.activehole, 10)
            }
            players.push(
                <div className={classnames('row','text-center','player','pt-3', className)}
                    {...props} onClick={that.SetActive} data-value={p.name} style={divcolor}>
                    <div className={classnames('col','player_name')} onClick={that.SetActive} data-value={p.name}>
                        <a href="#" onClick={that.SetActive} data-value={p.name}>{p.name}</a>
                </div>
                <div className={classnames('col','player_holescore')}>
                    -- {cmp} --
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
