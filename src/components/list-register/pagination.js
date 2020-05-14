import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

class STPagination extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      current: 1
    };

    this.onPageItem = this.onPageItem.bind(this);
  }

  onPageItem(page) {
    const { onPageClick } = this.props;

    this.setState(
      {
        current: page
      },
      () => onPageClick(page)
    );
  }

  render() {
    const { total, perPage } = this.props;

    const { current } = this.state;

    const pagesCount = Math.ceil(total / perPage);

    if (pagesCount < 2) {
      return null;
    }

    const items = [];

    for (let number = 1; number <= pagesCount; ) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === current}
          onClick={this.onPageItem.bind(this, number)}
        >
          {number}
        </Pagination.Item>
      );
      number += 1;
    }

    return (
      <div className="smfp-pagination-wrap animated fadeInUp fast delay-2-5s animation-fill-mode-backwards">
        <div className="smfp-pagination">
          <Pagination>
            {current !== 1 && (
              <Pagination.First onClick={this.onPageItem.bind(this, 1)} />
            )}
            {current !== 1 && (
              <Pagination.Prev
                onClick={this.onPageItem.bind(this, current - 1)}
              />
            )}
            {items}
            {current !== pagesCount && (
              <Pagination.Next
                onClick={this.onPageItem.bind(this, current + 1)}
              />
            )}
            {current !== pagesCount && (
              <Pagination.Last
                onClick={this.onPageItem.bind(this, pagesCount)}
              />
            )}
          </Pagination>
        </div>
      </div>
    );
  }
}

export default STPagination;
