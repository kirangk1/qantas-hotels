import { HotelDetailsPayload } from '../../types/HotelDetailsPayload';

export const comparePriceFromLowToHigh = (a: HotelDetailsPayload, b: HotelDetailsPayload) =>
  parseFloat(a.price.total.amount) - parseFloat(b.price.total.amount);
export const comparePriceFromHigToLow = (a: HotelDetailsPayload, b: HotelDetailsPayload) =>
  parseFloat(b.price.total.amount) - parseFloat(a.price.total.amount);
export const compareByPopularity = (a: HotelDetailsPayload, b: HotelDetailsPayload) => b.rating.value - a.rating.value;

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});
