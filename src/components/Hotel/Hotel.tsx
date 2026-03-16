import { useNavigate } from 'react-router-dom';
import './Hotel.scss';
import { HotelDetailsPayload } from '../../types/HotelDetailsPayload';
import Rating from '../Rating/Rating';
import { formatter } from '../HotelsList/utils/compareHelper';

interface HotelProps extends HotelDetailsPayload {
  currentPage: number;
}

const Hotel = ({ id, name, location, rating, inclusions, sleep, img, price, currentPage }: HotelProps) => {
  const navigate = useNavigate();
  const featuredInclusion = inclusions[0] || 'Hotel stay';

  const handleClick = () => {
    navigate(`/hotel/${id}`, { state: { fromPage: currentPage } });
  };

  return (
    <div
      className="container-sm hotel-container"
      onClick={handleClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleClick();
      }}
    >
      <div className="hotel-card-layout row g-0">
        <div className="col-lg-4 hotel-img-block">
          <img src={`${process.env.PUBLIC_URL}/images/hotels/${img}`} alt={name} className="hotel-img" />
          <span className="hotel-image-badge">{featuredInclusion}</span>
        </div>
        <div className="col-lg-5 hotel-content">
          <div className="hotel-location-row">
            <p className="hotel-location-pill">{location.city}</p>
            <span className="hotel-country-copy">{location.country}</span>
          </div>
          <h3 className="card-title hotel-title">{name}</h3>
          <div className="hotel-rating-row">
            <Rating ratingType={rating.type} ratingValue={rating.value} />
            <span className="hotel-rating-copy">{rating.value.toFixed(1)} rated stay</span>
          </div>
          <p className="hotel-inclusion-copy">{inclusions.join(', ')}</p>
          <div className="hotel-meta-row">
            <span className="hotel-meta-chip">Sleeps {sleep}</span>
            <span className="hotel-meta-chip">Instant details</span>
          </div>
        </div>
        <div className="col-lg-3 hotel-pricing">
          <p className="hotel-price-eyebrow">1 night from [{price.total.currency}]</p>
          <h2 className="card-title hotel-price-value">{formatter.format(Number(price.total.amount))}</h2>
          <p className="hotel-price-note">Taxes and fees may apply</p>
          <span className="hotel-cta">View stay</span>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
