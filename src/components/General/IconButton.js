import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class IconButton extends Component<Props> {
  render() {
    const { className, icon, title, link } = this.props;
    return (
      <div className={className}>
        <Link className="smfp-btn-icon" to={link}>
          <div className={`icon ${icon}`} />
          <div className="title">{title}</div>
        </Link>
      </div>
    );
  }
}

export default IconButton;
