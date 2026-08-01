import { createPersistedStore } from "./index.js";

type Selection = { id: string };

const initialSelection: Selection | null = { id: "initial" };

createPersistedStore<Selection | null>("selection", initialSelection, {
  validate: (value): value is Selection | null =>
    value === null ||
    (typeof value === "object" &&
      value !== null &&
      "id" in value &&
      typeof value.id === "string"),
});

const inferredNullableStore = createPersistedStore(
  "selection",
  { id: "initial" },
  {
    validate: (value): value is null => value === null,
  }
);

inferredNullableStore.subscribe((value) => {
  // @ts-expect-error the validator expands the inferred store value to include null
  value.id;
});

createPersistedStore<Selection>(
  "selection",
  { id: "initial" },
  {
    // @ts-expect-error an explicit non-null store cannot accept null
    validate: (value): value is null => value === null,
  }
);
