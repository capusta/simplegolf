// src/components/NotFound/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import './public.css';

export default class Public extends Component {

  render() {
      const { className, ...props } = this.props;
      let btnclass = classnames('btn','btn-info')
      let centerRow = classnames('row','text-center', 'center-align')

    return (
        <div className={centerRow}>
            <div className={classnames('row','text-center', className)} {...props}>
                <p>... blah blah app ... blah blah ...</p>
            </div>
            <div className={centerRow}>
                <a className={btnclass} href='/app' role="button">Start</a>
            </div>
        </div>
    );
  }
}
