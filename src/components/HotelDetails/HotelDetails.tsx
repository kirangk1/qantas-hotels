import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { HotelDetailsPayload } from '../../types/HotelDetailsPayload';
import Rating from '../Rating/Rating';
import { formatter } from '../HotelsList/utils/compareHelper';
import './HotelDetails.scss';

const HotelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [hotel, setHotel] = useState<HotelDetailsPayload | null>(null);
  const [loading, setLoading] = useState(true);

  const fromPage = (location.state as { fromPage?: number })?.fromPage || 1;

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/hotelsDetails.json`)
      .then((res) => res.json())
      .then((data: HotelDetailsPayload[]) => {
        const found = data.find((h) => h.id === id);
        setHotel(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleBack = () => {
    navigate('/', { state: { page: fromPage } });
  };

  if (loading) {
    return (
      <div className="hotel-details-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="hotel-details-not-found">
        <h2>Hotel not found</h2>
        <button className="btn btn-outline-dark" onClick={handleBack}>
          <i className="bi bi-arrow-left me-2" />
          Back to Hotels
        </button>
      </div>
    );
  }

  const { checkIn, checkout, adults, children, infants } = hotel.price.stay;
  const guestCount = adults + children + infants;

  return (
    <div className="hotel-details">
      <button className="btn btn-outline-dark back-btn" onClick={handleBack}>
        <i className="bi bi-arrow-left me-2" />
        Back to Hotels
      </button>

      <div className="hotel-details-card">
        {/* Hero Image */}
        <div className="hotel-details-hero">
          <img
            src={`${process.env.PUBLIC_URL}/images/hotels/${hotel.img}`}
            alt={hotel.name}
            className="hotel-details-hero-img"
          />
          <div className="hotel-details-hero-overlay">
            <h1 className="hotel-details-name">{hotel.name}</h1>
            <p className="hotel-details-location">
              <i className="bi bi-geo-alt-fill me-1" />
              {hotel.location.city}, {hotel.location.country}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="hotel-details-body">
          <div className="row">
            {/* Left column - info */}
            <div className="col-md-8">
              <div className="hotel-details-section">
                <h4 className="section-title">Rating</h4>
                <Rating ratingType={hotel.rating.type} ratingValue={hotel.rating.value} />
                <span className="rating-label">
                  {hotel.rating.value} / 5 ({hotel.rating.type === 'star' ? 'Star Rating' : 'Guest Rating'})
                </span>
              </div>

              <div className="hotel-details-section">
                <h4 className="section-title">What's Included</h4>
                <div className="inclusions-grid">
                  {hotel.inclusions.map((inclusion, index) => (
                    <div key={index} className="inclusion-item">
                      <i className={`bi ${getInclusionIcon(inclusion)} me-2`} />
                      {inclusion}
                    </div>
                  ))}
                </div>
              </div>

              <div className="hotel-details-section">
                <h4 className="section-title">Room Details</h4>
                <div className="room-details">
                  <div className="room-detail-item">
                    <i className="bi bi-people-fill me-2" />
                    Sleeps {hotel.sleep}
                  </div>
                  <div className="room-detail-item">
                    <i className="bi bi-moon-fill me-2" />1 Night Stay
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - booking */}
            <div className="col-md-4">
              <div className="booking-card">
                <div className="booking-price-label">Price per night</div>
                <div className="booking-price">{formatter.format(Number(hotel.price.total.amount))}</div>
                <div className="booking-currency">{hotel.price.total.currency}</div>

                <hr />

                <div className="booking-stay-details">
                  <div className="stay-detail">
                    <span className="stay-label">Check-in</span>
                    <span className="stay-value">{formatDate(checkIn)}</span>
                  </div>
                  <div className="stay-detail">
                    <span className="stay-label">Check-out</span>
                    <span className="stay-value">{formatDate(checkout)}</span>
                  </div>
                  <div className="stay-detail">
                    <span className="stay-label">Guests</span>
                    <span className="stay-value">
                      {adults} Adult{adults !== 1 ? 's' : ''}
                      {children > 0 && `, ${children} Child${children !== 1 ? 'ren' : ''}`}
                      {infants > 0 && `, ${infants} Infant${infants !== 1 ? 's' : ''}`}
                    </span>
                  </div>
                  <div className="stay-detail">
                    <span className="stay-label">Total Guests</span>
                    <span className="stay-value">{guestCount}</span>
                  </div>
                </div>

                <button className="btn btn-primary book-btn">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getInclusionIcon = (inclusion: string): string => {
  const lower = inclusion.toLowerCase();
  if (lower.includes('wifi')) return 'bi-wifi';
  if (lower.includes('pool')) return 'bi-water';
  if (lower.includes('gym')) return 'bi-bicycle';
  if (lower.includes('shuttle') || lower.includes('airport')) return 'bi-airplane';
  if (lower.includes('breakfast')) return 'bi-cup-hot';
  if (lower.includes('parking')) return 'bi-p-circle';
  if (lower.includes('spa')) return 'bi-droplet';
  return 'bi-check-circle';
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export default HotelDetails;
