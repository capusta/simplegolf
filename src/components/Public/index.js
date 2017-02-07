// src/components/NotFound/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import './public.css';

export default class Public extends Component {

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('Public', className)} {...props}>
          This is a public page
      </div>
    );
  }
}
