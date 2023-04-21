import { IInvoice, IPlays } from "../types/index";
import { createStatementData } from "./createStatementData";

export function refStatement_test(invoice: IInvoice, plays: IPlays): string {
  return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data: any) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    result += `${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

function usd(aNumber: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(aNumber / 100);
}
