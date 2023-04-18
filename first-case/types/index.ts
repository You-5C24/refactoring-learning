export interface IPerformance {
  playID: string;
  audience: number;
}

export interface IInvoice {
  customer: string;
  performances: IPerformance[];
}

export interface IPlays {
  [key: string]: {
    name: string;
    type: string;
  };
}

export interface IPlay {
  name: string;
  type: string;
}
