export interface IPerformance {
  playID: string;
  audience: number;
  play?: IPlay;
  amount?: number;
  volumeCredits?: number;
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

export interface IStatementData {
  customer: string;
  performances: IPerformance[];
  totalAmount: number;
  totalVolumeCredits: number;
}
