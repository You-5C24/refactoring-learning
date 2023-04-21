import { describe, expect, it } from "vitest";
import { IInvoice, IPlays } from "../types/index";
import { statement } from "../original-statement";
import { refStatement } from "../refactoring1.0/index";
import { refStatement2 } from "../refactoring2.0/index";
import { refStatement3 } from "../refactoring3.0/index";
import { refStatement_test } from "../refactoring_test";

describe("statement", () => {
  it.skip("original statement", () => {
    const invoice: IInvoice = {
      customer: "BigCo",
      performances: [
        {
          playID: "hamlet",
          audience: 55,
        },
        {
          playID: "as-like",
          audience: 35,
        },
        {
          playID: "othello",
          audience: 40,
        },
      ],
    };

    const plays: IPlays = {
      hamlet: { name: "Hamlet", type: "tragedy" },
      "as-like": { name: "As You Like It", type: "comedy" },
      othello: { name: "Othello", type: "tragedy" },
    };

    const result = statement(invoice, plays);
    expect(result).toBe(
      `Statement for BigCo\nHamlet: $650.00 (55 seats)\nAs You Like It: $490.00 (35 seats)\nOthello: $500.00 (40 seats)\nAmount owed is $1,640.00\nYou earned 47 credits\n`
    );
  });

  it.skip("refactoring1.0 statement", () => {
    const invoice: IInvoice = {
      customer: "BigCo",
      performances: [
        {
          playID: "hamlet",
          audience: 55,
        },
        {
          playID: "as-like",
          audience: 35,
        },
        {
          playID: "othello",
          audience: 40,
        },
      ],
    };

    const plays: IPlays = {
      hamlet: { name: "Hamlet", type: "tragedy" },
      "as-like": { name: "As You Like It", type: "comedy" },
      othello: { name: "Othello", type: "tragedy" },
    };

    const result = refStatement(invoice, plays);
    expect(result).toBe(
      `Statement for BigCo\nHamlet: $650.00 (55 seats)\nAs You Like It: $490.00 (35 seats)\nOthello: $500.00 (40 seats)\nAmount owed is $1,640.00\nYou earned 47 credits\n`
    );
  });

  it.skip("refactoring2.0 statement", () => {
    const invoice: IInvoice = {
      customer: "BigCo",
      performances: [
        {
          playID: "hamlet",
          audience: 55,
        },
        {
          playID: "as-like",
          audience: 35,
        },
        {
          playID: "othello",
          audience: 40,
        },
      ],
    };

    const plays: IPlays = {
      hamlet: { name: "Hamlet", type: "tragedy" },
      "as-like": { name: "As You Like It", type: "comedy" },
      othello: { name: "Othello", type: "tragedy" },
    };

    const result = refStatement2(invoice, plays);
    expect(result).toBe(
      `Statement for BigCo\nHamlet: $650.00 (55 seats)\nAs You Like It: $490.00 (35 seats)\nOthello: $500.00 (40 seats)\nAmount owed is $1,640.00\nYou earned 47 credits\n`
    );
  });

  it.skip("refactoring3.0 statement", () => {
    const invoice: IInvoice = {
      customer: "BigCo",
      performances: [
        {
          playID: "hamlet",
          audience: 55,
        },
        {
          playID: "as-like",
          audience: 35,
        },
        {
          playID: "othello",
          audience: 40,
        },
      ],
    };

    const plays: IPlays = {
      hamlet: { name: "Hamlet", type: "tragedy" },
      "as-like": { name: "As You Like It", type: "comedy" },
      othello: { name: "Othello", type: "tragedy" },
    };

    const result = refStatement3(invoice, plays);
    expect(result).toBe(
      `Statement for BigCo\nHamlet: $650.00 (55 seats)\nAs You Like It: $490.00 (35 seats)\nOthello: $500.00 (40 seats)\nAmount owed is $1,640.00\nYou earned 47 credits\n`
    );
  });

  it("refactoring_test statement", () => {
    const invoice: IInvoice = {
      customer: "BigCo",
      performances: [
        {
          playID: "hamlet",
          audience: 55,
        },
        {
          playID: "as-like",
          audience: 35,
        },
        {
          playID: "othello",
          audience: 40,
        },
      ],
    };

    const plays: IPlays = {
      hamlet: { name: "Hamlet", type: "tragedy" },
      "as-like": { name: "As You Like It", type: "comedy" },
      othello: { name: "Othello", type: "tragedy" },
    };

    const result = refStatement_test(invoice, plays);
    expect(result).toBe(
      `Statement for BigCo\nHamlet: $650.00 (55 seats)\nAs You Like It: $490.00 (35 seats)\nOthello: $500.00 (40 seats)\nAmount owed is $1,640.00\nYou earned 47 credits\n`
    );
  });
});
