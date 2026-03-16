import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithRoute } from './test-utils/renderWithRouter';
import App from './App';

jest.mock('./components/HotelsList/HotelsList', () => ({
  __esModule: true,
  default: () => <div>Hotels List View</div>,
}));

jest.mock('./components/HotelDetails/HotelDetails', () => ({
  __esModule: true,
  default: () => <div>Hotel Details View</div>,
}));

describe('App routes', () => {
  it('should render HotelsList on root route', () => {
    renderWithRoute(<App />, '*', ['/']);

    expect(screen.getByText('Hotels List View')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Hotels App' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should render HotelDetails on details route', () => {
    renderWithRoute(<App />, '*', ['/hotel/abc']);

    expect(screen.getByText('Hotel Details View')).toBeInTheDocument();
  });
});
