import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Hotel from '../Hotel/Hotel';
import { HotelDetailsPayload, SortTypes } from '../../types/HotelDetailsPayload';
import './HotelsList.scss';
import { compareByPopularity, comparePriceFromHighToLow, comparePriceFromLowToHigh } from './utils/compareHelper';
import Pagination from '../Pagination/Pagination';

const ITEMS_PER_PAGE = 5;

const getSortComparator = (sortType: SortTypes) => {
  switch (sortType) {
    case SortTypes.HighestPrice:
      return comparePriceFromHighToLow;
    case SortTypes.LowestPrice:
      return comparePriceFromLowToHigh;
    default:
      return compareByPopularity;
  }
};

const HotelsList = () => {
  const location = useLocation();
  const restoredPage = (location.state as { page?: number })?.page || 1;

  const [hotelsDetails, setHotelsDetails] = useState<HotelDetailsPayload[]>([]);
  const [sortValue, setSortValue] = useState<SortTypes>(SortTypes.Popularity);
  const [currentPage, setCurrentPage] = useState(restoredPage);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/hotelsDetails.json`)
      .then((res) => res.json())
      .then((data: HotelDetailsPayload[]) => {
        setHotelsDetails([...data].sort(compareByPopularity));
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortValue = e.target.value as SortTypes;
    setSortValue(newSortValue);
    const comparator = getSortComparator(newSortValue);
    setHotelsDetails((prev) => [...prev].sort(comparator));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = hotelsDetails.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(hotelsDetails.length / ITEMS_PER_PAGE);

  return (
    <section className="hotels-list-shell">
      <div className="hotels-list-toolbar">
        <Form.Select value={sortValue} onChange={handleSorting} className="custom-select" aria-label="Sort hotels">
          <option value={SortTypes.Popularity}>Popularity</option>
          <option value={SortTypes.HighestPrice}>Highest Price</option>
          <option value={SortTypes.LowestPrice}>Lowest Price</option>
        </Form.Select>
      </div>

      <div className="hotels-list-grid">
        {paginatedItems.map((hotelDetails) => (
          <Hotel key={hotelDetails.id} {...hotelDetails} currentPage={currentPage} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </section>
  );
};

export default HotelsList;
