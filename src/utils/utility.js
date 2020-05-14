import React from 'react';
import _ from 'underscore';
import { FormattedMessage } from 'react-intl';
import World from './world.json';
import Iran from './iran.json';
import AppLocale from '../languageProvider';

const localMessages = AppLocale.fa.messages;
console.log('------------localMessages---------', localMessages);

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
  const groupOptions = [
    { value: '', label: <FormattedSimpleMsg id="global.select_group" /> }
  ];

  let i;

  for (i = 1; i < 19; i += 1) {
    groupOptions.push({
      value: `${i}`,
      label: <FormattedSimpleMsg id="global.group_i" values={{ i }} />
    });
  }

  groupOptions.push({
    value: 'lanthanide',
    label: <FormattedSimpleMsg id="global.lanthanide" />
  });

  groupOptions.push({
    value: 'actinide',
    label: <FormattedSimpleMsg id="global.actinide" />
  });

  if (type === 'all') {
    return groupOptions;
  }

  const foundedOption = groupOptions.find(option => option.value === by);

  return foundedOption ? foundedOption.label : '';
}

export function getElementsCategory(type = 'all', by) {
  const options = [
    { value: '', label: 'انتخاب دسته' },
    {
      value: 'alkali_metals',
      label: <FormattedSimpleMsg id="global.alkali_metals" />
    },
    {
      value: 'alkaline_earth_metals',
      label: <FormattedSimpleMsg id="global.alkaline_earth_metals" />
    },
    {
      value: 'transition_metal',
      label: <FormattedSimpleMsg id="global.transition_metal" />
    },
    {
      value: 'metalloid',
      label: <FormattedSimpleMsg id="global.metalloid" />
    },
    {
      value: 'nonmetal',
      label: <FormattedSimpleMsg id="global.nonmetal" />
    },
    { value: 'halogen', label: <FormattedSimpleMsg id="global.halogen" /> },
    { value: 'noble_gas', label: <FormattedSimpleMsg id="global.noble_gas" /> },
    {
      value: 'base_metal',
      label: <FormattedSimpleMsg id="global.base_metal" />
    },
    {
      value: 'precious_metal',
      label: <FormattedSimpleMsg id="global.precious_metal" />
    },
    {
      value: 'rare_earth_element',
      label: <FormattedSimpleMsg id="global.rare_earth_element" />
    },
    {
      value: 'heavy_metal',
      label: <FormattedSimpleMsg id="global.heavy_metal" />
    },
    {
      value: 'radioactive',
      label: <FormattedSimpleMsg id="global.radioactive" />
    }
  ];

  if (type === 'all') {
    return options;
  }

  const foundedOption = options.find(option => option.value === by);

  return foundedOption ? foundedOption.label : '';
}

export function getLocationType(type = 'all', by) {
  const options = [
    { value: '', label: 'انتخاب نوع' },
    { value: 'world', label: <FormattedSimpleMsg id="global.world" /> },
    { value: 'iran', label: <FormattedSimpleMsg id="global.iran" /> }
  ];

  if (type === 'all') {
    return options;
  }

  const foundedOption = options.find(option => option.value === by);

  return foundedOption ? foundedOption.label : '';
}

export function getIndustryTypes(type = 'all', by) {
  const options = [
    { value: '', label: 'انتخاب نوع' },
    { value: 'upstream', label: <FormattedSimpleMsg id="global.upstream" /> },
    {
      value: 'downstream',
      label: <FormattedSimpleMsg id="global.downstream" />
    }
  ];

  if (type === 'all') {
    return options;
  }

  const foundedOption = options.find(option => option.value === by);

  return foundedOption ? foundedOption.label : '';
}

export function getUnit(type = 'all', by) {
  const options = [
    { value: '', label: 'انتخاب واحد' },
    { value: 'carat', label: 'قیراط' },
    { value: 'ounce', label: 'اونس' },
    { value: 'pound', label: 'پوند' },
    { value: 'kilogram', label: 'کیلوگرم' },
    { value: 'ton', label: 'تن' },
    { value: 'kTons', label: 'هزار تن' },
    { value: 'mTons', label: 'میلیون تن' },
    { value: 'm3', label: 'مترمکعب' },
    { value: 'kM3', label: 'هزار مترمکعب' },
    { value: 'mM3', label: 'میلیون مترمکعب' }
  ];

  if (type === 'all') {
    return options;
  }

  const foundedOption = options.find(option => option.value === by);

  return foundedOption ? foundedOption.label : '';
}

/**
 * Get the standard value
 */
export function getStandardValueByUnit(value, unit) {
  let standardValue = 0;

  switch (unit) {
    case 'carat':
      standardValue = 0.0002 * value;
      break;
    case 'ounce':
      standardValue = 0.03110348 * value;
      break;
    case 'pound':
      standardValue = 0.45359237 * value;
      break;
    case 'kilogram':
      standardValue = value;
      break;
    case 'kTons':
      standardValue = 1000 * 1000 * value;
      break;
    case 'mTons':
      standardValue = 1000000 * 1000 * value;
      break;
    case 'm3':
      standardValue = value;
      break;
    case 'kM3':
      standardValue = 1000 * value;
      break;
    case 'mM3':
      standardValue = 1000000 * value;
      break;
    case 'ton':
    default:
      standardValue = 1000 * value;
  }

  return standardValue;
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
    { value: '', label: 'انتخاب' },
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

export function getQualityNumber(by) {
  const options = [
    { quality: '', value: 0 },
    { quality: 'very_high', value: 5 },
    { quality: 'high', value: 4 },
    { quality: 'medium', value: 3 },
    { quality: 'low', value: 2 },
    { quality: 'very_low', value: 1 }
  ];

  const foundedOption = options.find(option => option.quality === by);

  return foundedOption ? foundedOption.value : 0;
}

export function getMineStatus(type = 'all', by) {
  const options = [
    { value: '', label: 'انتخاب' },
    { value: 'active', label: <FormattedSimpleMsg id="global.active" /> },
    { value: 'inactive', label: <FormattedSimpleMsg id="global.inactive" /> }
  ];

  if (type === 'all') {
    return options;
  }

  const foundedOption = options.find(option => option.value === by);

  return foundedOption ? foundedOption.label : '';
}

export function getCountries(type = 'all', by) {
  const countries = World.Countries;

  const none = [
    {
      label: localMessages['global.selectCountry'],
      value: ''
    }
  ];

  const options = [
    {
      label: localMessages['world.all'],
      value: 'all'
    },
    {
      label: localMessages['world.other'],
      value: 'other'
    }
  ];

  const cOptions = [];

  countries.forEach(country => {
    cOptions.push({
      label: localMessages[country.title],
      value: country.country
    });
  });

  if (type === 'option') {
    const foundedOption = [...options, ...cOptions].find(
      option => option.value === by
    );

    return foundedOption ? foundedOption.label : '';
  }

  return [...none, ...options, ..._.sortBy(cOptions, 'label')];
}

export function getStates(type = 'all', by) {
  const states = Iran.States;
  const options = [
    {
      label: localMessages['global.selectState'],
      value: ''
    }
  ];

  if (type === 'option') {
    const foundedOption = states.find(state => state.state === by);

    return foundedOption ? foundedOption.title : '';
  }

  const sOptions = [];

  states.forEach(state => {
    sOptions.push({
      label: localMessages[state.title],
      value: state.state
    });
  });

  return [...options, ..._.sortBy(sOptions, 'label')];
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

export function getMagneticPropertyOptions(type = 'all', by) {
  const options = [
    { value: '', label: 'انتخاب' },
    { value: 'ferromagnetic', label: 'فرومغناطیس' },
    { value: 'paramagnetism', label: 'پارامغناطیس' },
    { value: 'diamagnetics', label: 'دیامغناطیس' },
    { value: 'non-magnetic', label: 'غیرمغناطیسی' }
  ];

  if (type === 'all') {
    return options;
  }

  const foundedOption = options.find(option => option.value === by);

  return foundedOption ? foundedOption.label : '';
}

export function getElementPeriod(type = 'all', by) {
  const options = [
    { value: '', label: 'انتخاب' },
    { value: '1', label: 1 },
    { value: '2', label: 2 },
    { value: '3', label: 3 },
    { value: '4', label: 4 },
    { value: '5', label: 5 },
    { value: '6', label: 6 },
    { value: '7', label: 7 }
  ];

  if (type === 'all') {
    return options;
  }

  const foundedOption = options.find(option => option.value === by);

  return foundedOption ? foundedOption.label : '';
}

export function getElCOptions(type = 'all', by) {
  const options = [
    { value: '', label: 'انتخاب' },
    { value: 'conductor', label: <FormattedSimpleMsg id="global.conductor" /> },
    {
      value: 'semiconductor',
      label: <FormattedSimpleMsg id="global.semiconductor" />
    },
    { value: 'insulator', label: <FormattedSimpleMsg id="global.insulator" /> }
  ];

  if (type === 'all') {
    return options;
  }

  const foundedOption = options.find(option => option.value === by);

  return foundedOption ? foundedOption.label : '';
}
