import { Component } from 'react';
import _ from 'underscore';

class SideEffect extends Component<Props> {
  componentDidUpdate(prevProps) {
    const { formValues, onChange } = this.props;

    if (!_.isEqual(prevProps.formValues, formValues)) {
      onChange(formValues);
    }
  }

  render() {
    return null;
  }
}

export default SideEffect;
