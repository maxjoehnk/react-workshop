import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserAutocomplete } from './user-autocomplete.tsx';

const meta = {
	component: UserAutocomplete,
} satisfies Meta<typeof UserAutocomplete>

export default meta;
type Story = StoryObj<typeof UserAutocomplete>;

export const Default: Story = {
	args: {
	}
};
