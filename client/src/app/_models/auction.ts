export interface Auction {
  title: string;
  description: string;
  currentPrice: number;
  currentBidder: string;

  duration: number;
  isFinished: boolean;
  auctionWinner: string;
  vehicleId: number;
  userId: number;
}
export class AuctionClass implements Auction {
  title: string = '';
  description: string = '';
  price: string = '';
  vehicleId: number = null;
  userId: number = null;
  currentPrice: number = 1;
  currentBidder: string = '';
  duration: number = null;
  isFinished: boolean = false;
  auctionWinner: string = '';
  constructor() {}
}
export class DurationClass {
  durationList: any = [1, 2, 5, 7];
}
