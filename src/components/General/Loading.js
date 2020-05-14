import React, { Component } from 'react';

class Loading extends Component<Props> {
  render() {
    const { className } = this.props;
    return (
      <div className={`spinner-wrap-outer active ${className}`}>
        <div className="spinner-wrap">
          <div className="spinner-pulse" />
        </div>
      </div>
    );
  }
}

export default Loading;
