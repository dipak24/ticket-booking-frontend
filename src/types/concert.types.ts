export enum TierType {
  VIP = 'VIP',
  FRONT_ROW = 'FRONT_ROW',
  GA = 'GA'
}

export interface TicketTier {
  id: string;
  tierType: TierType;
  price: number;
  totalQuantity: number;
  availableQuantity: number;
}

export interface Concert {
  id: string;
  name: string;
  venue: string;
  eventDate: string;
  ticketTiers: TicketTier[];
}

export interface ConcertWithAvailability extends Concert {
  hasAvailableTickets: boolean;
  lowestPrice: number;
  highestPrice: number;
}
