import { HotelDetailsPayload } from '../types/HotelDetailsPayload';

export const seasideEscapeHotel: HotelDetailsPayload = {
  id: '0419446f-76bb-4f07-9cb4-cb9a4873aa51',
  heroImage: 'https://picsum.photos/id/88/400/300',
  name: 'Seaside Escape',
  location: {
    city: 'Canberra',
    country: 'Australia',
  },
  rating: {
    value: 2.0,
    type: 'self',
  },
  inclusions: ['Gym Access', 'Airport Shuttle', 'Pool', 'Free WiFi'],
  price: {
    total: {
      amount: '315.00',
      currency: 'AUD',
    },
    stay: {
      checkIn: '2024-01-01',
      checkout: '2024-01-02',
      adults: 2,
      children: 0,
      infants: 0,
    },
  },
  sleep: 2,
  img: '1.jpeg',
};

export const desertResortHotel: HotelDetailsPayload = {
  id: 'bcf42b34-8cb6-487a-b064-fc1aa01ae4e3',
  heroImage: 'https://picsum.photos/id/17/400/300',
  name: 'Desert Resort',
  location: {
    city: 'Sydney',
    country: 'Australia',
  },
  rating: {
    value: 4.5,
    type: 'star',
  },
  inclusions: ['Free WiFi', 'Pool'],
  price: {
    total: {
      amount: '465.00',
      currency: 'AUD',
    },
    stay: {
      checkIn: '2024-01-01',
      checkout: '2024-01-02',
      adults: 2,
      children: 0,
      infants: 0,
    },
  },
  sleep: 2,
  img: '2.jpeg',
};
