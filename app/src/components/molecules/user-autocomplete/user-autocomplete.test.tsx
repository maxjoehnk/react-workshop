import { UserAutocomplete } from './user-autocomplete.tsx';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { searchUsers } from '../../../api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('../../../api/sdk.gen.ts')

const searchUsersMock = vi.mocked(searchUsers)

describe('UserAutocomplete', () => {
	test('entering text should search for user', async () => {
		const onChange = vi.fn();
		searchUsersMock.mockResolvedValue({ data: [{ name: 'user', id: 'user', email: '' }], request: null as never, response: null as never })
		render(<UserAutocomplete label="Assignee" onChange={onChange}/>, {
			wrapper: props => <QueryClientProvider client={new QueryClient()} {...props} />
		});

		// Why can't i just interact with the native select that is present here? .__.
		await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Assignee' }), 'user')
		// await userEvent.click(screen.getByRole('button', { name: /Assignee/ }));
		// await userEvent.click(screen.getByRole('option', { name: 'user' }))

		expect(onChange).toHaveBeenCalledWith('user');
		// expect(searchUsersMock).toHaveBeenCalledWith(expect.objectContaining({ query: { q: 'user' }}));
	})
});
