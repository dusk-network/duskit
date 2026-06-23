import { cleanup, render, within } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import DPWrapper from "./test-components/DPWrapper.svelte";

describe("DeterministicIdProvider", () => {
  afterEach(cleanup);

  it("should render the provided slot content", () => {
    const { getByTestId } = render(DPWrapper);

    expect(getByTestId("consumer-alpha")).toBeInTheDocument();
    expect(getByTestId("consumer-beta")).toBeInTheDocument();
  });

  it("should provide a sequential ID generator starting from 1 without namespace", () => {
    const { getByTestId } = render(DPWrapper);

    const alphaConsumer = within(getByTestId("consumer-alpha"));
    const betaConsumer = within(getByTestId("consumer-beta"));

    // The first consumer requests two IDs
    expect(alphaConsumer.getByTestId("id-1")).toHaveTextContent("alpha-1");
    expect(alphaConsumer.getByTestId("id-2")).toHaveTextContent("alpha-2");

    // The second consumer requests two IDs, continuing the sequence
    expect(betaConsumer.getByTestId("id-1")).toHaveTextContent("beta-3");
    expect(betaConsumer.getByTestId("id-2")).toHaveTextContent("beta-4");
  });

  it("should prepend the namespace to the generated IDs when provided", () => {
    const { getByTestId } = render(DPWrapper, {
      props: {
        namespace: "myApp",
      },
    });

    const alphaConsumer = within(getByTestId("consumer-alpha"));
    const betaConsumer = within(getByTestId("consumer-beta"));

    expect(alphaConsumer.getByTestId("id-1")).toHaveTextContent(
      "myApp-alpha-1"
    );
    expect(alphaConsumer.getByTestId("id-2")).toHaveTextContent(
      "myApp-alpha-2"
    );
    expect(betaConsumer.getByTestId("id-1")).toHaveTextContent("myApp-beta-3");
    expect(betaConsumer.getByTestId("id-2")).toHaveTextContent("myApp-beta-4");
  });

  it("should isolate counters between completely separate provider instances", () => {
    // Create explicitly isolated DOM nodes in memory
    const containerOne = document.createElement("div");
    const containerTwo = document.createElement("div");

    // Render the first tree into its isolated container
    render(DPWrapper, {
      props: {
        namespace: "treeOne",
      },
      target: containerOne,
    });

    // Render the second tree independently into the other container
    render(DPWrapper, {
      props: {
        namespace: "treeTwo",
      },
      target: containerTwo,
    });

    // Scope queries exclusively to the created containers
    const scopeOne = within(containerOne);
    const scopeTwo = within(containerTwo);

    const alphaOne = within(scopeOne.getByTestId("consumer-alpha"));
    const alphaTwo = within(scopeTwo.getByTestId("consumer-alpha"));

    // Both instances should start their own internal sequence from 1
    expect(alphaOne.getByTestId("id-1")).toHaveTextContent("treeOne-alpha-1");
    expect(alphaTwo.getByTestId("id-1")).toHaveTextContent("treeTwo-alpha-1");
  });
});
