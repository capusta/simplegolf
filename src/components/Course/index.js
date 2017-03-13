import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

export default class Course extends Component {
    //Props: SetActiveHole gamename
    constructor(props){
        super(props)
    }
    render(){
        const { className, ...props } = this.props;
        var that = this
        var course = []
        var ci = null
        //TODO: separate into two rows ... maybe it will look nice
        for (var i = 1;i<=18;i++){
            var divcolor = null
            var h = i
            if (that.props.activehole && that.props.activehole == i){
                 divcolor = { 'background-color': 'lightgray'}
                 h = (<b>{i}</b>)
            } else {
                 divcolor = { 'background-color': 'white'}
            }
            course.push(
                <div className={classnames('col','course-general')} data-value={i}
                    onClick={this.props.SetActiveHole} style={divcolor}>
                    {h}
                </div>
            )
        }
        return(
            <div className={classnames('row','text-center','course')}>
                {course}
            </div>
        )
    }
}
