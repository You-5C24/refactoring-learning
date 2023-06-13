/**
 * 提炼函数
 */

export interface IInvoice {
  orders: {
    amount: number;
  }[];
}

// export function printOwing(invoice: IInvoice) {
//   let outstanding = 0;

//   for (const o of invoice.orders) {
//     outstanding += o.amount;
//   }

//   return outstanding
// }

export function printOwing(invoice: IInvoice) {
  const outstanding = calculateOutstanding(invoice);

  return outstanding;
}

function calculateOutstanding(invoice: IInvoice): number {
  let result = 0;
  for (const o of invoice.orders) {
    result += o.amount;
  }

  return result;
}
