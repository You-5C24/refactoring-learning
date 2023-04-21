import {
  IStatementData,
  IInvoice,
  IPlays,
  IPerformance,
  IPlay,
} from "../types/index";

interface IPerformanceCaculator {
  performance: IPerformance;
  play: IPlay;
  amount: number;
  volumeCredits: number;
}

class PerformanceCalculator implements IPerformanceCaculator {
  performance: IPerformance;
  play: IPlay;
  constructor(performance: IPerformance, play: IPlay) {
    this.performance = performance;
    this.play = play;
  }

  get amount(): number {
    throw new Error("xxxx");
  }

  get volumeCredits(): number {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
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

function createPerformanceCalculator(
  aPerformance: IPerformance,
  aPlay: IPlay
): IPerformanceCaculator {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error("xxxx");
  }
}

export function createStatementData(
  invoice: IInvoice,
  plays: IPlays
): IStatementData {
  const statementData: IStatementData = {} as IStatementData;
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;

  function enrichPerformance(aPerformance: IPerformance) {
    const calculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }

  function playFor(aPerformance: IPerformance): IPlay {
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
