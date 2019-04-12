import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ImgButton extends Component<Props> {
  render() {
    const { className, src, title, link } = this.props;
    return (
      <div className={className}>
        <Link className="smfp-btn-img" to={link}>
          <img src={src} alt="img" />
          <div className="title">{title}</div>
        </Link>
      </div>
    );
  }
}

export default ImgButton;
