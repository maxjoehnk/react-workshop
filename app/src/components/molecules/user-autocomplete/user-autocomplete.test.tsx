import { UserAutocomplete } from './user-autocomplete.tsx';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { searchUsers } from '../../../api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('../../../api/sdk.gen.ts')

const searchUsersMock = vi.mocked(searchUsers)

describe('UserAutocomplete', () => {
	test('entering text should search for user', async () => {
		render(<UserAutocomplete label="Assignee"/>, {
			wrapper: props => <QueryClientProvider client={new QueryClient()} {...props} />
		});

		await userEvent.type(screen.getByRole('combobox'), 'user')

		expect(searchUsersMock).toHaveBeenCalledWith(expect.objectContaining({ query: { q: 'user' }}));
	})
});
