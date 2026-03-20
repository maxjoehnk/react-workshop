import type { Meta, StoryObj } from '@storybook/react-vite';
import { IssueList } from './issue-list.tsx';

const meta = {
	component: IssueList
} satisfies Meta<typeof IssueList>

export default meta;
type Story = StoryObj<typeof IssueList>;

export const Default: Story = {
	args: {
		loading: false,
		issues: new Array(5).fill({ title: 'Sample Issue' })
	}
};
