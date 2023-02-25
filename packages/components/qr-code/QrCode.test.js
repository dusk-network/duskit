import fs from "fs";
import { render } from "@testing-library/svelte";
import QrCode from "./QrCode.svelte";

test("QrCOde Component renders correctly", () => {
	const results = render(QrCode, {
		props: {
			value:
				"0x66D30033B4E0BAF8970e9c8A0aD1D02Cc3e21115fhkllA9urdrTVbAyQZnwy0JLyvbCVZBHpzfBU87Gy4USFWaA6sZ",
			align: "center",
		},
	});
	expect(() => results.toHaveClass("duk-qr-code"));
	expect(() => results.toHaveClass("duk-qr-code--center"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/atoms-qr-code-snap.png")).toMatchImageSnapshot();
});
