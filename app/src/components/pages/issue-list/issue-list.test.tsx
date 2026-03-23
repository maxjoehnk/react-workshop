import { describe, test, expect } from 'vitest';
import { IssueList } from './issue-list.tsx';
import { render, screen } from '@testing-library/react';
import type { Issue } from '../../../api';

describe('IssueList', () => {
	test('should render title', async () => {
		render(<IssueList loading={false} issues={[]} />)

		expect(screen.getByText('Backlog')).toBeInTheDocument();
	})

	test.each([
		['Title'],
		['Issue']
	])('should render an issue', async (title: string) => {
		const issue = { id: '28fa8186-cb0f-440d-9350-b0075573edc4', title } as unknown as Issue;

		render(<IssueList loading={false} issues={[issue]} />);

		expect(screen.getByText(issue.title)).toBeInTheDocument();
	})
})
