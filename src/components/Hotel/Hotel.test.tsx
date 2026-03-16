import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Hotel from './Hotel';
import { renderWithRouter } from '../../test-utils/renderWithRouter';
import { seasideEscapeHotel } from '../../fixtures/hotels';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderHotel = () => renderWithRouter(<Hotel {...seasideEscapeHotel} currentPage={1} />);

describe('Hotel component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render hotel name and city', () => {
    renderHotel();

    expect(screen.getByRole('heading', { name: 'Seaside Escape', level: 3 })).toBeInTheDocument();
    expect(screen.getByText('Canberra')).toBeInTheDocument();
  });

  it('should render hotel image with alt text', () => {
    renderHotel();

    expect(screen.getByAltText('Seaside Escape')).toBeInTheDocument();
  });

  it('should render pricing details', () => {
    renderHotel();

    expect(screen.getByText(/1 night from \[AUD\]/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'A$315', level: 2 })).toBeInTheDocument();
  });

  it('should render inclusions and sleep info', () => {
    renderHotel();

    expect(screen.getByText('Gym Access, Airport Shuttle, Pool, Free WiFi')).toBeInTheDocument();
    expect(screen.getByText(/Sleeps 2/)).toBeInTheDocument();
  });

  it('should navigate to hotel details on click', async () => {
    renderHotel();

    await userEvent.click(screen.getByRole('link'));
    expect(mockNavigate).toHaveBeenCalledWith(`/hotel/${seasideEscapeHotel.id}`, { state: { fromPage: 1 } });
  });

  it('should navigate to hotel details on Enter key', () => {
    renderHotel();

    fireEvent.keyDown(screen.getByRole('link'), { key: 'Enter' });
    expect(mockNavigate).toHaveBeenCalledWith(`/hotel/${seasideEscapeHotel.id}`, { state: { fromPage: 1 } });
  });

  it('should not navigate on non-Enter key', () => {
    renderHotel();

    fireEvent.keyDown(screen.getByRole('link'), { key: 'Tab' });
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
