import { IInvoice, IPerformance, IPlays, IStatementData } from "../types/index";

export function createStatementData(invoice: IInvoice, plays: IPlays) {
  const statementData = {} as IStatementData;
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return statementData;
  function enrichPerformance(aPerformance: IPerformance) {
    const result = Object.assign({}, aPerformance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }
  function playFor(aPerformance: IPerformance) {
    return plays[aPerformance.playID];
  }
  function amountFor(aPerformance: IPerformance) {
    let result = 0;
    switch (aPerformance.play!.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 1000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
    }

    return result;
  }
  function volumeCreditsFor(aPerformance: IPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === aPerformance.play!.type) {
      result += Math.floor(aPerformance.audience / 5);
    }

    return result;
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
