import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hotel from './Hotel';
import { HotelsStub1 } from '../../stubs/HotelStubs';

describe('Hotel component', () => {
  it('should render hotel tile with all the details', () => {
    render(<Hotel {...HotelsStub1} />);

    expect(screen.getByTestId('name')).toHaveTextContent('Seaside Escape');
    expect(screen.getByTestId('city')).toHaveTextContent('Canberra');
    expect(screen.getByTestId('currency')).toHaveTextContent('1 night from [AUD]');
    expect(screen.getByTestId('price')).toHaveTextContent('A$315');
  });
});
