import { describe, expect, it } from "vitest";

import { base64ToUTF8 } from "../..";

describe("base64ToUTF8", () => {
  const source = "bWEgY2hlIGJlbGxhIGNpdHTDoCDwn5iD";
  const source2 = "YSDEgCDwkICAIOaWhyDwn6aE";

  it("should convert a base 64 string to a UTF-8 string", () => {
    expect(base64ToUTF8(source)).toBe("ma che bella città 😃");
    expect(base64ToUTF8(source2)).toBe("a Ā 𐀀 文 🦄");
  });
});
