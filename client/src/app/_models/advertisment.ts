export interface Advertisment {
  title: string;
  description: string;
  price: string;
  vehicleId: number;
  userId: number;
}
export class AdvertismentClass implements Advertisment {
  title: string = '';
  description: string = '';
  price: string = '';
  vehicleId: number = null;
  userId: number = null;
  constructor() {}
}
