import { QrCode } from "@duskit/components";

export default {
  title: "Components/Display/QrCode",
  component: QrCode,
  argTypes: {
    altText: { control: "text" },
    bgColor: { control: "color" },
    qrColor: { control: "color" },
    size: { control: "number" },
    value: { control: "text" },
  },
};

export const Default = {
  args: {
    value: "https://dusk.network",
    size: 200,
    bgColor: "#ffffff",
    qrColor: "#101010",
    altText: "Dusk QR",
  },
};
