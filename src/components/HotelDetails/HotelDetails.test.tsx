import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import HotelDetails from './HotelDetails';
import { renderWithRoute } from '../../test-utils/renderWithRouter';
import { seasideEscapeHotel, desertResortHotel } from '../../fixtures/hotels';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderHotelDetails = (
  hotelId: string,
  fetchData = [seasideEscapeHotel],
  locationState: { fromPage?: number } = {}
) => {
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(fetchData),
  });

  return renderWithRoute(<HotelDetails />, '/hotel/:id', [{ pathname: `/hotel/${hotelId}`, state: locationState }]);
};

describe('HotelDetails component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading state', () => {
    it('should show spinner while loading', () => {
      global.fetch = jest.fn().mockReturnValue(new Promise(() => {}));

      renderWithRoute(<HotelDetails />, '/hotel/:id', ['/hotel/some-id']);

      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Hotel not found', () => {
    it('should show not found message when hotel ID does not exist', async () => {
      renderHotelDetails('non-existent-id', [seasideEscapeHotel]);

      await waitFor(() => {
        expect(screen.getByText('Hotel not found')).toBeInTheDocument();
      });
      expect(screen.getByText(/Back to Hotels/)).toBeInTheDocument();
    });

    it('should navigate back from not found page', async () => {
      renderHotelDetails('non-existent-id', [seasideEscapeHotel], { fromPage: 3 });

      await waitFor(() => {
        expect(screen.getByText('Hotel not found')).toBeInTheDocument();
      });

      await userEvent.click(screen.getByText(/Back to Hotels/));
      expect(mockNavigate).toHaveBeenCalledWith('/', { state: { page: 3 } });
    });
  });

  describe('Hotel found - Hero section', () => {
    it('should render hotel name and location', async () => {
      renderHotelDetails(seasideEscapeHotel.id);

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Seaside Escape', level: 1 })).toBeInTheDocument();
      });
      expect(screen.getByText('Canberra, Australia')).toBeInTheDocument();
    });

    it('should render hotel hero image', async () => {
      renderHotelDetails(seasideEscapeHotel.id);

      await waitFor(() => {
        expect(screen.getByAltText('Seaside Escape')).toBeInTheDocument();
      });
    });
  });

  describe('Hotel found - Rating section', () => {
    it('should show rating value with guest rating label for self type', async () => {
      renderHotelDetails(seasideEscapeHotel.id);

      await waitFor(() => {
        expect(screen.getByText(/2 \/ 5/)).toBeInTheDocument();
      });
      expect(screen.getByText(/Guest Rating/)).toBeInTheDocument();
    });

    it('should show star rating label for star type', async () => {
      renderHotelDetails(desertResortHotel.id, [desertResortHotel]);

      await waitFor(() => {
        expect(screen.getByText(/4.5 \/ 5/)).toBeInTheDocument();
      });
      expect(screen.getByText(/Star Rating/)).toBeInTheDocument();
    });
  });

  describe('Hotel found - Inclusions', () => {
    it('should render all inclusions', async () => {
      renderHotelDetails(seasideEscapeHotel.id);

      await waitFor(() => {
        expect(screen.getByText('Gym Access')).toBeInTheDocument();
      });
      expect(screen.getByText('Airport Shuttle')).toBeInTheDocument();
      expect(screen.getByText('Pool')).toBeInTheDocument();
      expect(screen.getByText('Free WiFi')).toBeInTheDocument();
    });
  });

  describe('Hotel found - Room details', () => {
    it('should show sleep count', async () => {
      renderHotelDetails(seasideEscapeHotel.id);

      await waitFor(() => {
        expect(screen.getByText(/Sleeps 2/)).toBeInTheDocument();
      });
    });

    it('should show 1 Night Stay', async () => {
      renderHotelDetails(seasideEscapeHotel.id);

      await waitFor(() => {
        expect(screen.getByText('1 Night Stay')).toBeInTheDocument();
      });
    });
  });

  describe('Hotel found - Booking card', () => {
    it('should display price', async () => {
      renderHotelDetails(seasideEscapeHotel.id);

      await waitFor(() => {
        expect(screen.getByText('A$315')).toBeInTheDocument();
      });
    });

    it('should display currency', async () => {
      renderHotelDetails(seasideEscapeHotel.id);

      await waitFor(() => {
        expect(screen.getByText('AUD')).toBeInTheDocument();
      });
    });

    it('should display guest info', async () => {
      renderHotelDetails(seasideEscapeHotel.id);

      await waitFor(() => {
        expect(screen.getByText('2 Adults')).toBeInTheDocument();
      });
    });

    it('should display total guest count', async () => {
      renderHotelDetails(seasideEscapeHotel.id);

      await waitFor(() => {
        expect(screen.getByText('2')).toBeInTheDocument();
      });
    });

    it('should display Book Now button', async () => {
      renderHotelDetails(seasideEscapeHotel.id);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Book Now' })).toBeInTheDocument();
      });
    });
  });

  describe('Back navigation', () => {
    it('should navigate back to page 1 by default', async () => {
      renderHotelDetails(seasideEscapeHotel.id);

      await waitFor(() => {
        expect(screen.getByText('Seaside Escape')).toBeInTheDocument();
      });

      await userEvent.click(screen.getByText(/Back to Hotels/));
      expect(mockNavigate).toHaveBeenCalledWith('/', { state: { page: 1 } });
    });

    it('should navigate back to the original page when fromPage is provided', async () => {
      renderHotelDetails(seasideEscapeHotel.id, [seasideEscapeHotel], { fromPage: 5 });

      await waitFor(() => {
        expect(screen.getByText('Seaside Escape')).toBeInTheDocument();
      });

      await userEvent.click(screen.getByText(/Back to Hotels/));
      expect(mockNavigate).toHaveBeenCalledWith('/', { state: { page: 5 } });
    });
  });

  describe('Fetch error handling', () => {
    it('should show not found when fetch fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      renderWithRoute(<HotelDetails />, '/hotel/:id', ['/hotel/some-id']);

      await waitFor(() => {
        expect(screen.getByText('Hotel not found')).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Data fetching', () => {
    it('should fetch data with correct URL', async () => {
      renderHotelDetails(seasideEscapeHotel.id);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/data/hotelsDetails.json');
      });

      await waitFor(() => {
        expect(screen.getByText('Seaside Escape')).toBeInTheDocument();
      });
    });
  });

  describe('Inclusion icons', () => {
    const makeHotelWithInclusions = (inclusions: string[]) => ({
      ...seasideEscapeHotel,
      inclusions,
    });

    it('should show breakfast icon', async () => {
      renderHotelDetails(seasideEscapeHotel.id, [makeHotelWithInclusions(['Breakfast'])]);

      await waitFor(() => {
        expect(screen.getByText('Breakfast')).toBeInTheDocument();
      });
    });

    it('should show parking icon', async () => {
      renderHotelDetails(seasideEscapeHotel.id, [makeHotelWithInclusions(['Parking'])]);

      await waitFor(() => {
        expect(screen.getByText('Parking')).toBeInTheDocument();
      });
    });

    it('should show spa icon', async () => {
      renderHotelDetails(seasideEscapeHotel.id, [makeHotelWithInclusions(['Spa'])]);

      await waitFor(() => {
        expect(screen.getByText('Spa')).toBeInTheDocument();
      });
    });

    it('should show default icon for unknown inclusion', async () => {
      renderHotelDetails(seasideEscapeHotel.id, [makeHotelWithInclusions(['Room Service'])]);

      await waitFor(() => {
        expect(screen.getByText('Room Service')).toBeInTheDocument();
      });
    });
  });

  describe('Guest details with children and infants', () => {
    it('should display children and infants when present', async () => {
      const hotelWithKids = {
        ...seasideEscapeHotel,
        price: {
          ...seasideEscapeHotel.price,
          stay: {
            ...seasideEscapeHotel.price.stay,
            adults: 2,
            children: 1,
            infants: 1,
          },
        },
      };
      renderHotelDetails(seasideEscapeHotel.id, [hotelWithKids]);

      await waitFor(() => {
        expect(screen.getByText(/2 Adults/)).toBeInTheDocument();
      });
      expect(screen.getByText(/1 Child/)).toBeInTheDocument();
      expect(screen.getByText(/1 Infant/)).toBeInTheDocument();
    });

    it('should pluralize children correctly', async () => {
      const hotelWithKids = {
        ...seasideEscapeHotel,
        price: {
          ...seasideEscapeHotel.price,
          stay: {
            ...seasideEscapeHotel.price.stay,
            adults: 1,
            children: 3,
            infants: 2,
          },
        },
      };
      renderHotelDetails(seasideEscapeHotel.id, [hotelWithKids]);

      await waitFor(() => {
        expect(screen.getByText(/1 Adult(?!s)/)).toBeInTheDocument();
      });
      expect(screen.getByText(/3 Children/)).toBeInTheDocument();
      expect(screen.getByText(/2 Infants/)).toBeInTheDocument();
    });
  });
});
