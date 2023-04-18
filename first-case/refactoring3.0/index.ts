import { IInvoice, IPlays } from "../types/index";
import { createStatementData } from "./createStatementData";

/**
 * refctoring 3.0
 * 利用多态将不同戏剧种类的计算集中到各自的地方，可以很好的解决涉及特定类型的计算
 * 当添加新剧种时，只需要添加一个子类，并在创建函数中返回
 */

export function refStatement3(invoice: IInvoice, plays: IPlays): any {
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
