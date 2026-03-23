import { type FC, useState } from 'react';
import { useSearchUsersQuery } from '../../../api/@tanstack/react-query.gen.ts';
import { Autocomplete, EmptyState, FieldError, Label, ListBox, SearchField, Spinner } from '@heroui/react';
import { useController } from 'react-hook-form';
import type { Lens } from '@hookform/lenses';

export interface UserAutocompleteProps {
	label: string;
	lens: Lens<string | undefined>;
}

export const UserAutocomplete: FC<UserAutocompleteProps> = ({ label, lens }) => {
	const { field, fieldState } = useController(lens.interop());
	const [searchQuery, setSearchQuery] = useState('')

	// TODO: debounce
	// TODO: only enable for query length > 2
	const { isLoading, data } = useSearchUsersQuery({
		query: {
			q: searchQuery
		}
		// enabled: searchQuery.length > 2,
	});

	return <Autocomplete selectionMode="single" value={field.value} onChange={field.onChange} onBlur={field.onBlur} isInvalid={fieldState.invalid}>
		<Label>{label}</Label>
		<Autocomplete.Trigger>
			<Autocomplete.Value/>
			<Autocomplete.ClearButton aria-label="Clear Assignee"/>
			<Autocomplete.Indicator/>
		</Autocomplete.Trigger>
		<Autocomplete.Popover>
			<Autocomplete.Filter inputValue={searchQuery} onInputChange={setSearchQuery}>
				<SearchField autoFocus name="search" variant="secondary">
					<SearchField.Group>
						<SearchField.SearchIcon/>
						<SearchField.Input placeholder="Search characters..."/>
						{isLoading && <Spinner size="sm"/>}
						<SearchField.ClearButton/>
					</SearchField.Group>
				</SearchField>
				<ListBox
					items={data}
					renderEmptyState={() => <EmptyState>No results found</EmptyState>}
				>
					{(item) => (
						<ListBox.Item id={item.id} textValue={item.name}>
							{item.name}
							<ListBox.ItemIndicator/>
						</ListBox.Item>
					)}
				</ListBox>
			</Autocomplete.Filter>
		</Autocomplete.Popover>
		<FieldError>{fieldState.error?.message}</FieldError>
	</Autocomplete>
}
