import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HotelsList from './HotelsList';
import { comparePriceFromLowToHigh, comparePriceFromHigToLow, compareByPopularity } from './HotelsList.utils';
import { HotelsStub1, HotelsStub2 } from '../../stubs/HotelStubs';

describe('Hotel component', () => {
  it('should render hotel tile with all the details', () => {
    render(<HotelsList />);

    expect(screen.getByTestId('opt1')).toHaveTextContent('Popularity');
    expect(screen.getByTestId('opt2')).toHaveTextContent('Highest Price');
    expect(screen.getByTestId('opt3')).toHaveTextContent('Lowest Price');
  });
});

describe('Hotel utils', () => {
  it('should return negative value for comparePriceFromLowToHigh when param 2 price is higher than param 1', () => {
    const res = comparePriceFromLowToHigh(HotelsStub1, HotelsStub2);

    expect(res).toBe(-150);
  });

  it('should return positive value for comparePriceFromLowToHigh when param 1 price is higher than param 2', () => {
    const res = comparePriceFromLowToHigh(HotelsStub2, HotelsStub1);

    expect(res).toBe(150);
  });

  it('should return positive value for comparePriceFromHigToLow when param 1 price is lower than param 2', () => {
    const res = comparePriceFromHigToLow(HotelsStub1, HotelsStub2);

    expect(res).toBe(150);
  });

  it('should return positive value for comparePriceFromHigToLow when param 2 price is lower than param 1', () => {
    const res = comparePriceFromHigToLow(HotelsStub2, HotelsStub1);

    expect(res).toBe(-150);
  });

  it('should return positive value for compareByPopularity when param 1 rating is lower than param 2', () => {
    const res = compareByPopularity(HotelsStub1, HotelsStub2);

    expect(res).toBe(2.5);
  });

  it('should return positive value for compareByPopularity when param 2 rating is lower than param 1', () => {
    const res = compareByPopularity(HotelsStub2, HotelsStub1);

    expect(res).toBe(-2.5);
  });
});
