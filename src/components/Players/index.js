import React, { PropTypes, Component } from 'react';
import './style.css'
import classnames from 'classnames';

export default class Players extends Component {
    //Props: SetAlert gamename players SetActivePlayer
    constructor(props){
        super(props)
        this.state = {
            players: [],
            activeplayer: null,
        }
        this.SetActive = this.SetActive.bind(this);
    }
    SetActive(e){
        e.preventDefault();
        var n = e.target.getAttribute('data-value')
        console.log("Person: active:" + n);
        this.setState({activeplayer: n});
        this.props.SetActivePlayer(n);
    }
    render(){
        const { className, ...props } = this.props;
        var players = [];
        var divcolor;
        var that = this
        this.props.players.map(function(p){
            if (p.name == that.state.activeplayer){
                var divcolor = { 'background-color': 'lightgray' }
            } else {
                var divcolor = { 'background-color': 'white' }
            }
            players.push(
                <div className={classnames('row','text-center','player',p.name, className)}
                    {...props} onClick={that.SetActive} data-value={p.name} style={divcolor} >
                    <a href="#" onClick={that.SetActive} data-value={p.name}>{p.name}</a>
                </div>)
        })
        return(
            <div>
                {players}
            </div>
        )
    }
}
