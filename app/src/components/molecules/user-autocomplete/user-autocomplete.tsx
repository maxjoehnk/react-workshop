import { type FC, useState } from 'react';
import { useSearchUsersQuery } from '../../../api/@tanstack/react-query.gen.ts';
import { Autocomplete, EmptyState, FieldError, Label, ListBox, SearchField, Spinner } from '@heroui/react';
import {
	isLens,
	type UseOptionalLensProps,
	type WithLens,
	type WithoutLens
} from '../../../platform/forms/lens-form-control.tsx';
import { useController } from 'react-hook-form';

export interface UserAutocompleteProps {
	label: string;
}

export const UserAutocomplete: FC<UserAutocompleteProps & UseOptionalLensProps<string | undefined>> = ({ label, ...props }) => {
	if (isLens(props)) {
		return <LensUserAutocomplete lens={props.lens} label={label}/>
	}

	return <InternalUserAutocomplete label={label} {...props} />
};

const LensUserAutocomplete: FC<UserAutocompleteProps & WithLens<string | undefined>> = ({ lens, label }) => {
	const { field, fieldState } = useController(lens.interop());

	return <InternalUserAutocomplete label={label} {...field} error={fieldState.error}/>
}

const InternalUserAutocomplete: FC<UserAutocompleteProps & WithoutLens<string | undefined>> = ({
																																																 label,
																																																 error,
																																																 ...field
																																															 }) => {
	const [searchQuery, setSearchQuery] = useState('')

	// TODO: debounce
	// TODO: only enable for query length > 2
	const { isLoading, data } = useSearchUsersQuery({
		query: {
			q: searchQuery
		}
		// enabled: searchQuery.length > 2,
	});

	return <Autocomplete selectionMode="single" {...field} isInvalid={!!error}>
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
		<FieldError>{error?.message}</FieldError>
	</Autocomplete>
}
