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

export function getElementsGroups(type = 'all', by) {
  const options = [
    { value: '', label: 'انتخاب دسته' },
    { value: 'group1', label: 'فلزات پایه' },
    { value: 'group2', label: 'فلزات گرانبها' },
    { value: 'group3', label: 'عناصر نادر خاکی' }
  ];

  if (type === 'all') {
    return options;
  }

  const foundedOption = options.find(option => option.value === by);

  return foundedOption ? foundedOption.label : '';
}

export function getLocationType() {
  return [
    { value: '', label: 'انتخاب نوع' },
    { value: 'world', label: <FormattedSimpleMsg id="global.world" /> },
    { value: 'iran', label: <FormattedSimpleMsg id="global.iran" /> }
  ];
}

export function getUnit(type = 'all', by) {
  const options = [
    { value: '', label: 'انتخاب واحد' },
    { value: 'ton', label: 'تن' }
  ];

  if (type === 'all') {
    return options;
  }

  const foundedOption = options.find(option => option.value === by);

  return foundedOption ? foundedOption.label : '';
}

export function getPriceUnit(type = 'all', by) {
  const options = [
    { value: '', label: 'انتخاب واحد' },
    { value: 'dollar', label: 'دلار' },
    { value: 'euro', label: 'یورو' }
  ];

  if (type === 'all') {
    return options;
  }

  const foundedOption = options.find(option => option.value === by);

  return foundedOption ? foundedOption.label : '';
}

export function getQualityLevel(type = 'all', by) {
  const options = [
    { value: 'very_high', label: <FormattedSimpleMsg id="global.veryHigh" /> },
    { value: 'high', label: <FormattedSimpleMsg id="global.high" /> },
    { value: 'medium', label: <FormattedSimpleMsg id="global.medium" /> },
    { value: 'low', label: <FormattedSimpleMsg id="global.low" /> },
    { value: 'very_low', label: <FormattedSimpleMsg id="global.veryLow" /> }
  ];

  if (type === 'all') {
    return options;
  }

  const foundedOption = options.find(option => option.value === by);

  return foundedOption ? foundedOption.label : '';
}

export function getCountries(type = 'all', by) {
  const countries = World.Countries;
  const options = [];

  if (type === 'option') {
    const foundedOption = countries.find(country => country.country === by);

    return foundedOption ? foundedOption.title : '';
  }

  countries.forEach(country => {
    options.push({
      label: <FormattedSimpleMsg id={country.title} />,
      value: country.country
    });
  });

  return options;
}

export function getStates(type = 'all', by) {
  const states = Iran.States;
  const options = [];

  if (type === 'option') {
    const foundedOption = states.find(state => state.state === by);

    return foundedOption ? foundedOption.title : '';
  }

  states.forEach(state => {
    options.push({
      label: <FormattedSimpleMsg id={state.title} />,
      value: state.state
    });
  });

  return options;
}

export function getPhaseAtSTPOptions(type = 'all', by) {
  const options = [
    { value: '', label: 'انتخاب حالت' },
    { value: 'solid', label: 'جامد' },
    { value: 'liquid', label: 'مایع' },
    { value: 'gas', label: 'گاز' }
  ];

  if (type === 'all') {
    return options;
  }

  const foundedOption = options.find(option => option.value === by);

  return foundedOption ? foundedOption.label : '';
}

export function getElementPeriod(type = 'all', by) {
  const options = [
    { value: '6', label: 6 },
    { value: '8', label: 8 },
    { value: '12', label: 12 },
    { value: '16', label: 16 }
  ];

  if (type === 'all') {
    return options;
  }

  const foundedOption = options.find(option => option.value === by);

  return foundedOption ? foundedOption.label : '';
}

export function getElCOptions(type = 'all', by) {
  return getQualityLevel(type, by);
}
