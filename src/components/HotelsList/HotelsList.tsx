import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Hotel from '../Hotel/Hotel';
import { HotelDetailsPayload, SortTypes } from '../../types/HotelDetailsPayload';
import './HotelsList.scss';
import { compareByPopularity, comparePriceFromHigToLow, comparePriceFromLowToHigh } from './HotelsList.utils';
import Pagination from '../Pagination/Pagination';

const HotelsList: React.FC = () => {
  const [hotelsDetails, setHotelsDetails] = useState<HotelDetailsPayload[]>([]);
  const [sortValue, setSortValue] = useState<SortTypes>(SortTypes.Popularity);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [paginatedItems, setPaginatedItems] = useState<HotelDetailsPayload[]>([]);

  useEffect(() => {
    fetch('./data/hotelsDetails.json')
      .then((res) => res.json())
      .then((res) => {
        setHotelsDetails(res.sort(compareByPopularity));
        setTotalItems(res.length);
        setPaginatedItems(res.slice(0, itemsPerPage));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSortValue(e.target.value as SortTypes);
    const sortHotels = () => {
      console.log('sortHotels:', sortValue, e.target.value);
      switch (e.target.value) {
        case SortTypes.HighestPrice:
          {
            setHotelsDetails(hotelsDetails.sort(comparePriceFromHigToLow));
            setPaginatedItems(hotelsDetails.sort(comparePriceFromHigToLow).slice(0, itemsPerPage));
            setCurrentPage(1);
          }
          break;
        case SortTypes.LowestPrice:
          {
            setHotelsDetails(hotelsDetails.sort(comparePriceFromLowToHigh));
            setPaginatedItems(hotelsDetails.sort(comparePriceFromLowToHigh).slice(0, itemsPerPage));
            setCurrentPage(1);
          }
          break;
        default: {
          setHotelsDetails(hotelsDetails.sort(compareByPopularity));
          setPaginatedItems(hotelsDetails.sort(compareByPopularity).slice(0, itemsPerPage));
          setCurrentPage(1);
        }
      }
    };
    sortHotels();
  };

  const handlePageChange = (pageNumber: number) => {
    let start = 0;
    let end = itemsPerPage;
    if (pageNumber > 1) {
      start = (pageNumber - 1) * itemsPerPage;
      end = (pageNumber - 1) * itemsPerPage + itemsPerPage;
    }
    setPaginatedItems(hotelsDetails.slice(start, end));
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Form.Select value={sortValue} onChange={handleSorting} className="custom-select">
        <option data-testid="opt1" value={SortTypes.Popularity}>
          Popularity
        </option>
        <option data-testid="opt2" value={SortTypes.HighestPrice}>
          Highest Price
        </option>
        <option data-testid="opt3" value={SortTypes.LowestPrice}>
          Lowest Price
        </option>
      </Form.Select>

      {paginatedItems &&
        paginatedItems.map((hotelDetails: HotelDetailsPayload) => <Hotel key={hotelDetails.id} {...hotelDetails} />)}

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
};
export default HotelsList;
