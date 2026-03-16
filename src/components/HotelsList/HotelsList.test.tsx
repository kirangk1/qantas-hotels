import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import HotelsList from './HotelsList';
import { renderWithRouter } from '../../test-utils/renderWithRouter';
import { comparePriceFromLowToHigh, comparePriceFromHighToLow, compareByPopularity } from './utils/compareHelper';
import { seasideEscapeHotel, desertResortHotel } from '../../fixtures/hotels';

describe('HotelsList component', () => {
  it('should render the sort dropdown with all options', () => {
    renderWithRouter(<HotelsList />);

    const sortDropdown = screen.getByRole('combobox', { name: 'Sort hotels' });
    expect(sortDropdown).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('Popularity');
    expect(options[1]).toHaveTextContent('Highest Price');
    expect(options[2]).toHaveTextContent('Lowest Price');
  });

  it('should default to Popularity sort', () => {
    renderWithRouter(<HotelsList />);

    expect(screen.getByRole('combobox', { name: 'Sort hotels' })).toHaveValue('popularity');
  });
});

describe('Sort comparators', () => {
  it('should sort lower price first with comparePriceFromLowToHigh', () => {
    const res = comparePriceFromLowToHigh(seasideEscapeHotel, desertResortHotel);

    expect(res).toBe(-150);
  });

  it('should sort higher price first with comparePriceFromLowToHigh', () => {
    const res = comparePriceFromLowToHigh(desertResortHotel, seasideEscapeHotel);

    expect(res).toBe(150);
  });

  it('should sort higher price first with comparePriceFromHighToLow', () => {
    const res = comparePriceFromHighToLow(seasideEscapeHotel, desertResortHotel);

    expect(res).toBe(150);
  });

  it('should sort lower price first with comparePriceFromHighToLow', () => {
    const res = comparePriceFromHighToLow(desertResortHotel, seasideEscapeHotel);

    expect(res).toBe(-150);
  });

  it('should sort higher rating first with compareByPopularity', () => {
    const res = compareByPopularity(seasideEscapeHotel, desertResortHotel);

    expect(res).toBe(2.5);
  });

  it('should sort lower rating last with compareByPopularity', () => {
    const res = compareByPopularity(desertResortHotel, seasideEscapeHotel);

    expect(res).toBe(-2.5);
  });
});
