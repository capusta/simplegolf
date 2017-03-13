import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import Players from '../Players'
import Course from '../Course'
import './style.css'

export default class Control extends Component {
    //Props:
    //Game Relate        SetActivePlayer gamename SetAlert
    //Player Related:    activeplayer players ReloadPlayers
    constructor(props){
        super(props)
        this.state = {
            userinput: null,
            editmode:  false,
            activehole: null,
        }
        this.HandleEditModeOn     = this.HandleEditModeOn.bind(this);
        this.HandlePlayerChange   = this.HandlePlayerChange.bind(this);
        this.HandlePlayerUpdate   = this.HandlePlayerUpdate.bind(this);
        this.HandleEditModeOff    = this.HandleEditModeOff.bind(this);
    }

    componentWillUpdate(nextProps, nextState){
        if (this.props.activeplayer != nextProps.activeplayer){
            this.HandleEditModeOff();
        }
    }
    SetActiveHole(i){
        this.setState({activehole: i})
        console.log("active hole is " + i)
        //TODO: fetch player scores for hole i
    }
    HandleEditModeOff(){
        this.setState({editmode: false, userinput: null})
    }
    HandleEditModeOn(){
        var m = this.state.editmode;
        this.props.SetAlert('Editing player')
        this.setState({editmode: true, userinput: this.props.activeplayer})
    }
    HandlePlayerChange(event){
            event.preventDefault();
            this.setState({userinput: event.target.value})
     }
    HandlePlayerUpdate(e){
        e.preventDefault();
        var payload = {oldname: this.props.activeplayer, newname: this.state.userinput},
            that = this
        console.log("Modifying player " + this.props.activeplayer + " to " + this.state.userinput)
        fetch(process.env.REACT_APP_BASE_URL+'/api/players/'+this.props.gamename,
            {   method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            .then(function(res){
                return res.json();
            })
            .then(function(data){
                if (!data.success){
                    that.props.SetAlert(data.msg)
                    return
                }
                that.props.ReloadPlayers();
                that.props.SetActivePlayer(data.newname)
                that.setState({editmode: false})
            })
    }
    render() {
        const { className, ...props } = this.props;
        var course = ( <Course gamename={this.state.gamename} SetCurrentHole={this.SetActiveHole} /> )
        var utility = (
            <div className={classnames("Control")} >
                <i className={classnames("fa","fa-user-plus","fa-2x")} aria-hidden="true"
                    onClick={this.HandleEditModeOn} />
            </div>
        )

        // Add Players if there are none
        if (this.props.players.length == 0 || this.state.editmode){
            utility =  (
                <div className={classnames("Control")} >
                    <form onSubmit={this.HandlePlayerUpdate}>
                        <label>
                            <input type="text" value={this.state.userinput} onChange={this.HandlePlayerChange} />
                </label>
                <button type="submit">
                    <i className={classnames("fa", "fa-user-plus", "fa-2x")} aria-hidden="true"></i>
                </button>
                </form>
                </div>
            )
        }
        if (this.props.activeplayer){
            if (this.state.editmode){
                utility =  (
                    <div className={classnames("Control")} >
                        <input type="text" value={this.state.userinput} onChange={this.HandlePlayerChange} />
                    <i className={classnames("fa","fa-check-square-o","fa-2x")} aria-hidden="true"
                        onClick={this.HandlePlayerUpdate}/>
                    <i className={classnames("fa","fa-times","fa-2x")} aria-hidden="true"
                        onClick={this.HandleEditModeOff}> </i>
                    </div>
                )}
                    else {
                utility = (
                        <div>{this.props.activeplayer}
                            <i className={classnames("fa","fa-pencil-square-o","fa-2x")} aria-hidden="true"
                                onClick={this.HandleEditModeOn}>  </i>
                        </div>
                    )}
        }
        return (
            <div className={classnames('Control', className)} {...props}>
                <div className={classnames('row','block')}>
                    {utility}
                    {course}
                </div>
            <Players gamename={this.props.gamename} SetAlert={this.props.SetAlert}
                players={this.props.players} SetActivePlayer={this.props.SetActivePlayer} />
            </div>
        );
    }
}
