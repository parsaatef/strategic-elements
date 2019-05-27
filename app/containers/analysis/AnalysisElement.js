// @flow
import React, { Component } from 'react';

type Props = {
  match: object
};

export default class AnalysisElement extends Component<Props> {
  props: Props;

  render() {
    const { match } = this.props;

    const { element, title, type } = match.params;

    return (
      <section>
        <span>{type}</span> -<span>{element}</span> - -<span>{title}</span> - -
        -
      </section>
    );
  }
}
