type ConfigGeneratorOptions = {
  buildPath: string;
  prefix?: string;
  themed?: boolean;
  theme?: string | [string | undefined, string | undefined];
};

type StyleDictionaryConfigGenerator = (
  outputName: string,
  source: string[],
  include: string[],
  options: ConfigGeneratorOptions,
  platforms?: Record<
    string,
    import("style-dictionary/types").PlatformConfig | undefined
  >
) => import("style-dictionary/types").Config;
