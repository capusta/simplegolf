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
        for (var i = 0;i<=17;i++){
            if (that.props.activehole && that.props.activehole == i){
                course.push(
                    <div className={classnames('col')} data-value={i} onClick={this.props.SetActiveHole}>
                        <b>{i+1}</b>
                    </div>
                    )
            } else {
                course.push(
                    <div className={classnames('col')} data-value={i} onClick={this.props.SetActiveHole}>
                        {i+1}
                    </div>
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
