import { Shell } from './shell.tsx';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	component: Shell
} satisfies Meta<typeof Shell>

export default meta;
type Story = StoryObj<typeof Shell>;

export const Default: Story = {};
