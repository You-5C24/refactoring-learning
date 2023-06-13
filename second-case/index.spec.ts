import { describe, it, expect, beforeEach } from "vitest";
import { Province } from "./province";
import sampleProvinceData from "./sampleProvinceData";

describe("province", () => {
  let asia: any;
  beforeEach(() => {
    asia = new Province(sampleProvinceData());
  });
  it("shortfall", () => {
    expect(asia.shortfall).toBe(5);
  });
  it("profit", () => {
    expect(asia.profit).toBe(230);
  });
});
