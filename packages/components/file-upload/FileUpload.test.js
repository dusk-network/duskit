import fs from "fs";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/svelte";
import FileUpload from "./FileUpload.svelte";

test("FileUpload Component renders correctly and displays correct file input", async () => {
	const user = userEvent.setup();
	const results = render(FileUpload, {
		name: "File upload",
	});
	expect(() => results.toHaveClass("duk-file-upload"));

	//Create File object to upload
	const str = JSON.stringify({ values: "random test input values" });
	const blob = new Blob([str]);
	const file = new File([blob], "values.json", {
		type: "application/JSON",
	});

	const fileUpload = results.container.querySelector(".duk-file-upload__input");

	//Mock dispatched event on file input
	let mockEvent = vi.fn();
	results.component.$on("inputFile", function (event) {
		mockEvent(event.detail);
	});

	//Simulate file upload
	await user.upload(fileUpload, file);

	//Check if the uploaded file name is displayed
	expect(results.container.querySelector(".duk-file-upload__text").innerHTML).toBe(file.name);

	//Check if dispatched event is called
	expect(mockEvent).toHaveBeenCalled();
	expect(mockEvent).toHaveBeenCalledTimes(1);
});

test("Visual regression test", () => {
	expect(
		fs.readFileSync("./tests/snapshots/molecules-file-upload-snap.png"),
	).toMatchImageSnapshot();
});
