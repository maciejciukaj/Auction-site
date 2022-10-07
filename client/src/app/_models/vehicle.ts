export interface Vehicle {
  type: string;
  brand: string;
  model: string;
  fuel: string;
  gearbox: string;
  color: string;
  power: number;
  engine: number;
  isCrashed: boolean;
  mileage: number;
  productionYear: number;
  userId: number;
}
export class VehicleClass implements Vehicle {
  type: string = '';
  brand: string = '';
  model: string = '';
  color: string = '';
  fuel: string = '';
  gearbox: string = '';
  power: number = null;
  engine: number = null;
  isCrashed: boolean = false;
  mileage: number = null;
  productionYear: number = null;
  userId: number;
  constructor() {}
}
export class TypeClass {
  typeList: any = [
    'SUV',
    'Combi',
    'Sedan',
    'Hatchback',
    'Coupe',
    'Cabriolet',
    'Motorcycle',
    'Truck',
    'Mini Bus',
  ];
  constructor() {}
}

export class BrandClass {
  brandList: any = [
    'BMW',
    'Audi',
    'Volkswagen',
    'Ford',
    'Opel',
    'Mercedes-Benz',
    'Skoda',
    'Renault',
    'Citroen',
    'Peugeot',
    'Alfa Romeo',
    'Mazda',
    'Dodge',
    'Chevrolet',
    'Honda',
    'Lexus',
    'Nissan',
    'Pontiac',
    'Lincoln',
    'Cadillac',
    'Fiat',
    'Ferrari',
    'Lamborghini',
    'Aston Martin',
    'Bentley',
    'Porsche',
    'Rolls-Royce',
    'Land-Rover',
    'Kia',
    'Chrysler',
    'Seat',
    'Tesla',
    'Subaru',
    'Hyundai',
    'Dacia',
    'Mitsubishi',
    'Lancia',
  ];
}
export class ColorClass {
  colorList: any = [
    'black',
    'white',
    'red',
    'yellow',
    'green',
    'silver',
    'grey',
    'blue',
    'orange',
    'purple',
    'pink',
  ];
}

export class FuelClass {
  fuelList: any = ['Petrol', 'Diesel', 'Gas'];
}
