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
        console.log("Person: active:" + e.target.getAttribute('data-value'));
        this.setState({activeplayer: e.target.getAttribute('data-value')});
        this.props.SetActivePlayer(e.target.getAttribute('data-value'))
    }
    render(){
        const { className, ...props } = this.props;
        var players = [];
        var that = this
        this.props.players.map(function(p){
            if (p.name == that.state.activeplayer){
                var divcolor = 'background-color: white;'
            } else {
                var divcolor = 'background-color: gray;'
            }
            players.push(<div className={classnames('col', p.name)} style={divcolor}>
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
