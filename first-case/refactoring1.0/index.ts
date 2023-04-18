import { IInvoice, IPerformance, IPlays } from "../types/index";

/**
 * refctoring 1.0
 * 将复杂的代码块分解为更小的单元，更好的便于理解逻辑结构
 */

export function refStatement(invoice: IInvoice, plays: IPlays): any {
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  function playFor(aPerformance: IPerformance) {
    return plays[aPerformance.playID];
  }
  function amountFor(aPerformance: IPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
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
    if ("comedy" === playFor(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5);
    }

    return result;
  }
  function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
      volumeCredits += volumeCreditsFor(perf);
    }
    return volumeCredits;
  }
  function usd(aNumber: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(aNumber / 100);
  }
  function totalAmount() {
    let totalAmount = 0;
    for (let perf of invoice.performances) {
      totalAmount += amountFor(perf);
    }
    return totalAmount;
  }
}
