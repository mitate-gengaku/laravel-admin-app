import Notifications from "./components/Notifications";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Notifications> = {
  component: Notifications,
  title: "components/Notifications",
};

export default meta;
type Story = StoryObj<typeof Notifications>;

export const Default: Story = {
  args: {},
};
