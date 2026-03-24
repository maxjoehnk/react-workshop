import type { Meta, StoryObj } from '@storybook/react-vite';
import { PrioritySelect } from './priority-select.tsx';

const meta = {
	component: PrioritySelect
} satisfies Meta<typeof PrioritySelect>

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Priority",
	}
};
