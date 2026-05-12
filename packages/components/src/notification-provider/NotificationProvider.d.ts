import type { SvelteComponent } from "svelte";

interface NotificationProviderSlots {
  default: {};
}

type NotificationProviderProps = {
  initialNamespace?: string;
};

export default class NotificationProvider extends SvelteComponent<
  NotificationProviderProps,
  {},
  NotificationProviderSlots
> {}
