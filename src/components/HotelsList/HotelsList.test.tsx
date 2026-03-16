import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import HotelsList from './HotelsList';
import { renderWithRouter } from '../../test-utils/renderWithRouter';
import { comparePriceFromLowToHigh, comparePriceFromHighToLow, compareByPopularity } from './utils/compareHelper';
import { seasideEscapeHotel, desertResortHotel } from '../../fixtures/hotels';
import { HotelDetailsPayload } from '../../types/HotelDetailsPayload';

jest.mock('../Hotel/Hotel', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div data-testid="hotel-card">{name}</div>,
}));

jest.mock('../Pagination/Pagination', () => ({
  __esModule: true,
  default: ({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }) => (
    <div>
      <span data-testid="page-state">
        {currentPage}/{totalPages}
      </span>
      <button onClick={() => onPageChange(2)}>Go page 2</button>
    </div>
  ),
}));

const mockFetchData = (data: HotelDetailsPayload[]) => {
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(data),
  } as Response);
};

const mockPendingFetch = () => {
  global.fetch = jest.fn().mockReturnValue(new Promise(() => {}));
};

const makeHotel = (index: number): HotelDetailsPayload => ({
  ...seasideEscapeHotel,
  id: `hotel-${index}`,
  name: `Hotel ${index}`,
  rating: {
    ...seasideEscapeHotel.rating,
    value: index,
  },
  price: {
    ...seasideEscapeHotel.price,
    total: {
      ...seasideEscapeHotel.price.total,
      amount: String(100 + index * 10),
    },
  },
});

describe('HotelsList component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the sort dropdown with all options', () => {
    mockPendingFetch();
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
    mockPendingFetch();
    renderWithRouter(<HotelsList />);

    expect(screen.getByRole('combobox', { name: 'Sort hotels' })).toHaveValue('popularity');
  });

  it('should render hotels sorted by popularity after data fetch', async () => {
    mockFetchData([seasideEscapeHotel, desertResortHotel]);
    renderWithRouter(<HotelsList />);

    await waitFor(() => {
      expect(screen.getAllByTestId('hotel-card')).toHaveLength(2);
    });

    const hotelCards = screen.getAllByTestId('hotel-card');
    expect(hotelCards[0]).toHaveTextContent('Desert Resort');
    expect(hotelCards[1]).toHaveTextContent('Seaside Escape');
  });

  it('should sort by lowest price when option is selected', async () => {
    mockFetchData([desertResortHotel, seasideEscapeHotel]);
    renderWithRouter(<HotelsList />);

    await waitFor(() => {
      expect(screen.getAllByTestId('hotel-card')).toHaveLength(2);
    });

    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Sort hotels' }), 'lowest_price');

    const hotelCards = screen.getAllByTestId('hotel-card');
    expect(hotelCards[0]).toHaveTextContent('Seaside Escape');
    expect(hotelCards[1]).toHaveTextContent('Desert Resort');
  });

  it('should change page and then reset to page 1 after sorting', async () => {
    const manyHotels = Array.from({ length: 6 }, (_, index) => makeHotel(index + 1));
    mockFetchData(manyHotels);
    renderWithRouter(<HotelsList />);

    await waitFor(() => {
      expect(screen.getByTestId('page-state')).toHaveTextContent('1/2');
    });
    expect(screen.getAllByTestId('hotel-card')).toHaveLength(5);

    await userEvent.click(screen.getByRole('button', { name: 'Go page 2' }));
    expect(screen.getByTestId('page-state')).toHaveTextContent('2/2');
    expect(screen.getAllByTestId('hotel-card')).toHaveLength(1);

    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Sort hotels' }), 'highest_price');
    expect(screen.getByTestId('page-state')).toHaveTextContent('1/2');
    expect(screen.getAllByTestId('hotel-card')).toHaveLength(5);
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
