import { describe, it, expect } from "vitest";
import { IInvoice, printOwing } from "./index";
describe("outstanding", () => {
  it("test outstanding", () => {
    const invoice: IInvoice = {
      orders: [
        {
          amount: 100,
        },
        {
          amount: 200,
        },
        {
          amount: 300,
        },
      ],
    };

    const outstanding = printOwing(invoice);
    expect(outstanding).toBe(600);
  });
});
