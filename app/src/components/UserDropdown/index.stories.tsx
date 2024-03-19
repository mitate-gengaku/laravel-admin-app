import UserDropdown from "./components/UserDropdown";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserDropdown> = {
  component: UserDropdown,
  title: "components/UserDropdown",
};

export default meta;
type Story = StoryObj<typeof UserDropdown>;

export const Default: Story = {
  args: {},
};
