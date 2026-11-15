import type { Meta, StoryObj } from "@storybook/react";
import { SignupForm } from "./SignupForm";

const meta: Meta<typeof SignupForm> = { component: SignupForm };
export default meta;
type Story = StoryObj<typeof SignupForm>;

export const Empty: Story = {};
export const Filled: Story = { args: { initialValues: { fullName: "Ada", email: "a@b.co", password: "secret12" } } };
