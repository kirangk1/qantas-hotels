import React from 'react';
import './Hotel.scss';
import { HotelDetailsPayload } from '../../types/HotelDetailsPayload';
import Rating from '../Rating/Rating';
import { formatter } from '../HotelsList/HotelsList.utils';

const Hotel: React.FC<HotelDetailsPayload> = (hotelDetails) => {
  return (
    <div className="container-sm hotel-container">
      <div className="row">
        <div className="col hotel-img-block">
          <img src={`./images/hotels/${hotelDetails.img}`} alt="Sample Image" className="hotel-img" />
        </div>
        <div className="col-6 hotel-content">
          <h3 data-testid="name" className="card-title">
            {hotelDetails.name}
          </h3>
          <p data-testid="city" className="card-text text-body-secondary">
            {hotelDetails.location.city}
          </p>
          <Rating ratingType={hotelDetails.rating.type} ratingValue={hotelDetails.rating.value} />
          <p className="card-text">
            <small className="text-body-secondary">{hotelDetails.inclusions.toString()}</small>
            <small className="text-body-secondary"> &bull; Sleeps {hotelDetails.sleep}</small>
          </p>
        </div>
        <div className="col-3 hotel-pricing">
          <p data-testid="currency" className="card-text text-body-secondary">
            1 night from [{hotelDetails.price.total.currency}]
          </p>
          <h2 data-testid="price" className="card-title">
            {formatter.format(parseInt(hotelDetails.price.total.amount))}
          </h2>
        </div>
      </div>
    </div>
  );
};
export default Hotel;
