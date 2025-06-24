type PlatformInitializer = (
  outputFile: string,
  prefix: string | undefined,
  buildPath: string,
  options?: import("style-dictionary/types").LocalOptions
) => import("style-dictionary/types").PlatformConfig;
