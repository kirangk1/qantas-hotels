import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useLocation, useParams } from 'react-router-dom';
import { renderWithRoute, renderWithRouter } from './renderWithRouter';

const LocationProbe = () => {
  const location = useLocation();
  return <div>{location.pathname}</div>;
};

const HotelIdProbe = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

describe('renderWithRouter utility', () => {
  it('should default to root route when initialEntries are not provided', () => {
    renderWithRouter(<LocationProbe />);

    expect(screen.getByText('/')).toBeInTheDocument();
  });

  it('should render with provided initialEntries route', () => {
    renderWithRouter(<LocationProbe />, { initialEntries: ['/hotel/abc'] });

    expect(screen.getByText('/hotel/abc')).toBeInTheDocument();
  });
});

describe('renderWithRoute utility', () => {
  it('should render the element with default initialEntries', () => {
    renderWithRoute(<div>Root route</div>, '/');

    expect(screen.getByText('Root route')).toBeInTheDocument();
  });

  it('should render route params with provided initialEntries', () => {
    renderWithRoute(<HotelIdProbe />, '/hotel/:id', ['/hotel/0419446f-76bb-4f07-9cb4-cb9a4873aa51']);

    expect(screen.getByText('0419446f-76bb-4f07-9cb4-cb9a4873aa51')).toBeInTheDocument();
  });
});
