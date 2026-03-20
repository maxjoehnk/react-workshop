import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IssueForm } from './issue-form.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('IssueForm', () => {
	test('filling the form and submitting should create an issue', async () => {
		const onSave = vi.fn();
		const onCancel = vi.fn();
		render(<IssueForm onSave={onSave} onCancel={onCancel} />, {
			wrapper: props => <QueryClientProvider client={new QueryClient()} {...props} />
		});

		await userEvent.type(screen.getByRole('textbox', { name: 'Title' }), 'Titel');
		await userEvent.type(screen.getByRole('textbox', { name: 'Description' }), 'Description');
		await userEvent.click(screen.getByRole('combobox', { name: 'Priority' }));
		await userEvent.click(screen.getByText('medium'));
		await userEvent.click(screen.getByRole('button', { name: 'Create' }));

		expect(onSave).toHaveBeenCalledWith({ title: 'Titel', description: 'Description', priority: 'medium', assignee: '' }, expect.anything());
	})
});
