import { Notification } from "@duskit/components";
import { mdiBellOutline } from "@mdi/js";

export default {
  args: {
    date: new Date(),
    dismissable: true,
    locale: "en-US",
    style: "inline-size: 23rem",
    text: "This is an example notification message.",
    title: "Notification Title",
  },
  argTypes: {
    date: {
      control: "date",
      description: "Notification creation date",
    },
    decayProgress: {
      control: {
        max: 100,
        min: 0,
        step: 1,
        tooltipId: "main-tooltip",
        type: "range",
      },
      description: "Decay bar progress (toast mode only)",
      if: {
        arg: "mode",
        eq: "toast",
      },
    },
    dismissable: {
      control: "boolean",
      description: "Whether to show the dismiss button",
    },
    iconPath: {
      control: "text",
      description: "Icon override (MDI SVG path)",
    },
    mode: {
      control: "inline-radio",
      description: "Notification layout: toast (floating) or panel (list)",
      options: ["panel", "toast"],
    },
    read: {
      control: "boolean",
      description: "Read status (panel mode only)",
      if: {
        arg: "mode",
        eq: "panel",
      },
    },
    text: {
      control: "text",
      description: "Message body",
    },
    title: {
      control: "text",
      description: "Optional notification title",
    },
    type: {
      control: "select",
      description: "Determines default color and icon",
      options: ["error", "info", "success", "warning"],
    },
  },
  component: Notification,
  title: "Components/Feedback/Notification",
};

// --- TOAST MODE ---

export const ToastError = {
  args: {
    decayProgress: 100,
    mode: "toast",
    text: "Unable to connect to the database.",
    title: "System Error",
    tooltipId: "main-tooltip",
    type: "error",
  },
};

export const ToastInfo = {
  args: {
    decayProgress: 45,
    mode: "toast",
    text: "The system has been updated successfully.",
    title: "Information",
    tooltipId: "main-tooltip",
    type: "info",
  },
};

export const ToastSuccess = {
  args: {
    decayProgress: 80,
    mode: "toast",
    text: "The document has been saved successfully.",
    title: "Operation Completed",
    tooltipId: "main-tooltip",
    type: "success",
  },
};

export const ToastWarning = {
  args: {
    decayProgress: 20,
    mode: "toast",
    text: "Your session will expire in 5 minutes.",
    title: "Warning",
    tooltipId: "main-tooltip",
    type: "warning",
  },
};

// --- PANEL MODE ---

export const PanelOld = {
  args: {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // Date older than 2 days to test Intl.DateTimeFormat
    mode: "panel",
    read: true,
    text: "The weekly backup finished without errors.",
    title: "Backup Completed",
    tooltipId: "main-tooltip",
    type: "success",
  },
};

export const PanelRead = {
  args: {
    mode: "panel",
    read: true,
    text: "This notification has already been viewed.",
    title: "Read Message",
    tooltipId: "main-tooltip",
    type: "info",
  },
};

export const PanelUnread = {
  args: {
    mode: "panel",
    read: false,
    text: "You have received a new friend request.",
    title: "New Message",
    tooltipId: "main-tooltip",
    type: "info",
  },
};

export const PanelWarningRecent = {
  args: {
    date: new Date(), // Very recent
    mode: "panel",
    read: false,
    text: "You have used 90% of the available space.",
    title: "Limit Reached",
    tooltipId: "main-tooltip",
    type: "warning",
  },
};

// --- SPECIAL VARIANTS ---

export const ToastDismissable = {
  args: {
    decayProgress: 10,
    dismissable: true,
    mode: "toast",
    text: "The document has been saved successfully.",
    title: "Operation Completed",
    tooltipId: "main-tooltip",
    type: "success",
  },
};

export const CustomIcon = {
  args: {
    decayProgress: 45,
    iconPath: mdiBellOutline,
    mode: "toast",
    text: "This notification uses a non-default icon.",
    title: "Custom Icon",
    tooltipId: "main-tooltip",
    type: "info",
  },
};

export const LongText = {
  args: {
    mode: "panel",
    read: false,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    title: "Notification with very long text",
    tooltipId: "main-tooltip",
    type: "info",
  },
};
