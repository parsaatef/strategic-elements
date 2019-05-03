import React from 'react';
import _ from 'underscore';
import { FormattedMessage } from 'react-intl';
import World from './world.json';
import Iran from './iran.json';

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

export function getYearOptions(from, to) {
  const YearOptions = [
    { value: '', label: <FormattedSimpleMsg id="global.select_year" /> }
  ];

  let i;

  for (i = from; i < to; i += 1) {
    YearOptions.push({
      value: i,
      label: i
    });
  }

  return YearOptions;
}

export function getElementsGroups() {
  return [
    { value: '', label: 'انتخاب دسته' },
    { value: 'Group1', label: 'فلزات پایه' },
    { value: 'Group2', label: 'فلزات گرانبها' },
    { value: 'Group3', label: 'عناصر نادر خاکی' }
  ];
}

export function getCountries() {
  const countries = World.Countries;
  const options = [];

  countries.forEach(country => {
    options.push({
      label: <FormattedSimpleMsg id={country.title} />,
      value: country.country
    });
  });

  return options;
}

export function getStates() {
  const states = Iran.States;
  const options = [];

  states.forEach(state => {
    options.push({
      label: state.title,
      value: state.state
    });
  });

  return options;
}
