import React, { Component } from 'react';
import CkEditor from '../General/CkEditor';

export default class SPD extends Component<Props> {
  render() {
    return (
      <div>
        <h4 id="add-new-user">صنایع پایین دستی</h4>
        <CkEditor />
      </div>
    );
  }
}
