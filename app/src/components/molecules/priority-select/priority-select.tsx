import type { FC } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { zIssuePriority } from '../../../api/zod.gen.ts';
import type { ChangeHandler, RefCallBack } from 'react-hook-form';

export interface PrioritySelectProps {
	label: string;
	helperText?: string;
	onChange?: ChangeHandler;
	onBlur?: ChangeHandler;
	ref?: RefCallBack;
	name?: string;
	required?: boolean;
	disabled?: boolean;
	error?: boolean;
}

export const PrioritySelect: FC<PrioritySelectProps> = ({ label, helperText, ...props }) => {
	return <FormControl>
		<InputLabel id="priority-label">{label}</InputLabel>
		<Select labelId="priority-label" label={label} aria-describedby="priority-input-message" {...props}>
			{zIssuePriority.options.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
		</Select>
		{helperText && <FormHelperText error={props.error} id="priority-input-message">{helperText}</FormHelperText>}
	</FormControl>
}
