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
    componentDidUpdate(prevProps, prevState){
        if (prevProps.gameName == null && this.props.gameName != null){
            //not sure if we need this anymore
        }
    }
    SetActive(e){
        e.preventDefault();
        var n = e.target.getAttribute('data-value')
        console.log("Person: active:" + n);
        this.setState({activeplayer: n});
        this.props.SetActivePlayer(n);
    }
    render(){
        console.log("rendering players")
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
            players.push(<div className={classnames('col', p.name)} onClick={that.SetActive} data-value={p.name} style={divcolor}>
                <a href="#" onClick={that.SetActive} data-value={p.name}>{p.name}</a>
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
