import type { Meta, StoryObj } from '@storybook/react-vite';
import { IssueForm } from './issue-form.tsx';

const meta = {
	component: IssueForm
} satisfies Meta<typeof IssueForm>

export default meta;
type Story = StoryObj<typeof IssueForm>;

export const Default: Story = {
	args: {
	}
};
