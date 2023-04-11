export interface IInvoice {
  customer: string;
  performances: {
    playID: string;
    audience: number;
  }[];
}

export interface IPlays {
  [key: string]: {
    name: string;
    type: string;
  };
}
