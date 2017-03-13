import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

export default class Course extends Component {
    //Props: SetCurrentHole gamename
    constructor(props){
        super(props)
        this.state = {
            activehole: null,
        }
        this.SetActive = this.SetActive.bind(this);
    }
    SetActive(e){
        e.preventDefault();
        var n = e.target.getAttribute('data-value')
        this.setState({activehole: n});
        this.props.SetCurrentHole(n);
    }
    render(){
        const { className, ...props } = this.props;
        console.log("Rendering course")
        var that = this
        var course = []
        var ci = null
        //TODO: separate into two rows ... maybe it will look nice
        for (var i = 0;i<=17;i++){
            if (that.state.activehole && that.state.activehole == i){
                course.push(
                    <div className={classnames('col')}> <b>{i}</b> </div>
                    )
            } else {
                course.push(
                    <div className={classnames('col')}>{i}</div>
                    )
            }
        }
        return(
            <div className={classnames('row','text-center','course')}>
                {course}
            </div>
        )
    }
}
