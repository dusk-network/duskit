import renderWithSlots from "./renderWithSlots";

/** @type {typeof import("..").renderWithSimpleContent} */
const renderWithSimpleContent = renderWithSlots({ default: "some text" });

export default renderWithSimpleContent;
