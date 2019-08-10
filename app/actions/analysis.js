export const ELEMENTS_RATES = 'ELEMENTS_RATES';

export function setElementsRates(rates) {
  return {
    type: ELEMENTS_RATES,
    rates
  };
}
