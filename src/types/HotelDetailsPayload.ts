export interface HotelDetailsPayload  {
    id: string;
    heroImage: string;
    name: string;
    location: {
      city: string;
      country: string;
    };
    rating: {
      value: number;
      type: 'self' | 'star';
    };
    inclusions: string[];
    sleep: number;
    img:string;
    price: {
      total: {
        amount: string;
        currency: string;
      };
      stay: {
        checkIn: string;
        checkout: string;
        adults: number;
        children: number;
        infants: number;
      };
    };
  }

  export enum SortTypes {
    Popularity = 'popularity',
    HighestPrice = 'highest_price',
    LowestPrice = 'lowest_price'
  }