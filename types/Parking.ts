interface PaymentOption {
  type: string;
  name: string;
}

interface MerchantPayment {
  online: boolean;
  offline: boolean;
  options: PaymentOption[];
}

interface SafetyFeatures {
  cctv: boolean;
  surveilledAllTime: boolean;
  fenced: boolean;
}

interface TransferOptions {
  walkingDistance: boolean;
  exclusiveTransfer: boolean;
}

interface PaidServices {
  carWash: boolean;
  babySeat: boolean;
  childSeat: boolean;
  chargeForElectricCar: boolean;
}

interface MerchantProperties {
  distance_from_airport: number;
  advance_reservation_fee: boolean;
  pays_airport_fee: boolean;
  corona_proof: boolean;
  distance: number;
  last_gps_check: string;
  official_airport: boolean;
  transfer_type: string;
  return_at_different_airport: boolean;
  usp_night_and_holiday_fee: boolean;
  usp_no_extra_fee: boolean;
  safetyFeatures: SafetyFeatures;
  transferOptions: TransferOptions;
  paidServices: PaidServices;
}

interface Merchant {
  id: number;
  slug: string;
  name: string;
  properties: MerchantProperties;
  payment: MerchantPayment;
  created_at: string;
}

interface WaitTimeInterval {
  total: number;
  maximum: string | null;
  minimum: string;
}

interface WaitTimeDirection {
  direction: "arrival" | "departure";
  intervals: WaitTimeInterval[];
}

interface WaitTimes {
  arrival: WaitTimeDirection;
  departure: WaitTimeDirection;
}

interface Review {
  score: number;
  stars: number;
  count: number;
  waitTimes: WaitTimes;
}

interface ParkingTimes {
  open: string;
  closed: string;
  open247: boolean;
}

interface ParkingProperties {
  key_extend: boolean;
  ev_parking: boolean;
  park_sleep_fly: boolean;
  tank_refill: boolean;
  car_wash: boolean;
  price_calculation: string;
  times: ParkingTimes;
  distance: number;
}

export interface ParkingOffer {
  parking_type: string;
  is_api_pricing: boolean;
  roof: boolean;
  price: number;
  price_group_id: number;
  price_expired: boolean;
  currency: string;
  days: number;
  prs: number;
  expires_at: string | null;
  latitude: number | null;
  longitude: number | null;
  distance_from_airport: number;
  merchant: Merchant;
  review: Review;
  properties: ParkingProperties;
  minprice_review: number;
  maxprice_review: number;
  sort_reviews: number;
  sort_distance: number;
}
