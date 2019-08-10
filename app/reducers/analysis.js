import { ELEMENTS_RATES } from '../actions/analysis';

const defState = {
  rates: {}
};

export default function analysis(state = defState, action) {
  switch (action.type) {
    case ELEMENTS_RATES:
      return {
        ...state,
        elementsRates: action.rates
      };
    default:
      return state;
  }
}
