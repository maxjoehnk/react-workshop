import { type FC, useState } from 'react';
import type { ChangeHandler, RefCallBack } from 'react-hook-form';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { searchUsersOptions } from '../../../api/@tanstack/react-query.gen.ts';

export interface UserAutocompleteProps {
	label: string;
	onChange?: ChangeHandler;
	onBlur?: ChangeHandler;
	ref?: RefCallBack;
	name?: string;
	required?: boolean;
	disabled?: boolean;
	error?: boolean;
}

export const UserAutocomplete: FC<UserAutocompleteProps> = ({ label, ...props }) => {
	const [searchQuery, setSearchQuery] = useState('')

	const { isLoading, data } = useQuery({
		...searchUsersOptions({
			query: {
				q: searchQuery
			}
		}),
		enabled: searchQuery.length > 2,
	});

	return <Autocomplete
		options={data ?? []}
		onInputChange={(_, value) => setSearchQuery(value)}
		filterOptions={x => x}
		loading={isLoading}
		getOptionLabel={user => user.name}
		renderInput={params => <TextField
			{...params}
			label={label}
			slotProps={{
				input: {
					...params.InputProps,
					endAdornment: (
						<>
							{isLoading ? <CircularProgress color="inherit" size={20}/> : null}
							{params.InputProps.endAdornment}
						</>
					),
				},
			}}
		/>}
		{...props}
	/>;
}
