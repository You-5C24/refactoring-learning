import { describe, it, expect } from "vitest";
import { Province } from "./province";
import sampleProvinceData from "./sampleProvinceData";

describe("province", () => {
  it("shortfall", () => {
    const asia = new Province(sampleProvinceData());
    expect(asia.shortfall).toBe(5);
  });
});
