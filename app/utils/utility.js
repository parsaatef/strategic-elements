import React from 'react';
import _ from 'underscore';
import { FormattedMessage } from 'react-intl';

/**
 * for queries on list-register
 * @param queryInfo
 * @param variables
 */
export function addStaticVariables(queryInfo, variables) {
  if (queryInfo && !_.isUndefined(queryInfo.variables)) {
    return {
      ...queryInfo.variables,
      ...variables
    };
  }

  return variables;
}

export function FormattedSimpleMsg(props) {
  return <FormattedMessage {...props}>{txt => <>{txt}</>}</FormattedMessage>;
}
