import {
  IInvoice,
  IPerformance,
  IPlay,
  IPlays,
  IStatementData,
} from "../types/index";

interface IPerformanceCaculator {
  performance: IPerformance;
  play: IPlay;
  amount: number;
  volumeCredits: number;
}

class PerformanceCaculator implements IPerformanceCaculator {
  performance;
  play;
  constructor(aPerformance: IPerformance, aPlay: IPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount(): number {
    throw new Error("subclass responsibility");
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCaculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}
class ComedyCalculator extends PerformanceCaculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 1000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

function createPerformanceCaculator(aPerformance: IPerformance, aPlay: IPlay) {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);
  }
}

export function createStatementData(invoice: IInvoice, plays: IPlays) {
  const statementData = {} as IStatementData;
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return statementData;
  function enrichPerformance(aPerformance: IPerformance) {
    const calculator = createPerformanceCaculator(
      aPerformance,
      playFor(aPerformance)
    );
    const result = Object.assign({}, aPerformance);
    result.play = calculator!.play;
    result.amount = calculator!.amount;
    result.volumeCredits = calculator!.volumeCredits;
    return result;
  }
  function playFor(aPerformance: IPerformance) {
    return plays[aPerformance.playID];
  }

  function totalAmount(data: any) {
    return data.performances.reduce(
      (total: number, p: IPerformance) => total + p.amount!,
      0
    );
  }
  function totalVolumeCredits(data: any) {
    return data.performances.reduce(
      (total: number, p: IPerformance) => total + p.volumeCredits!,
      0
    );
  }
}
