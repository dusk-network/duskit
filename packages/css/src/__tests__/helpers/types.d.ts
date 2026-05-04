type CSSDictionary = Record<string, Record<string, string>>;

/**
 * Contrast Algorithms supported by colorjs.io.
 * Hardcoded because colorjs.io types are too
 * loose (evaluates to string).
 */
type ContrastAlgorithm =
  | "APCA"
  | "DeltaPhi"
  | "Lstar"
  | "Michelson"
  | "WCAG21"
  | "Weber";

type CSSToken = `--${string}`;

type DistanceAlgorithm = "DeltaE2000";

type BaseRule = {
  description: string;
  testAgainst: CSSToken[];
  tokens: CSSToken[];
};

type ContrastRule = BaseRule & {
  algorithm: ContrastAlgorithm;
  minimumRatio: number;
};

type DistanceRule = BaseRule & {
  algorithm: DistanceAlgorithm;
  minimumDistance: number;
};

type ThemeRule = ContrastRule | DistanceRule;
