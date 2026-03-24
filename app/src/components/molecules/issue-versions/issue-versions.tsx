import type { IssueVersionsInput } from '../../../api';
import { useController } from 'react-hook-form';
import type { FC } from 'react';
import { TextInput } from '../../atoms/text-input/text-input.tsx';
import type { Lens } from '@hookform/lenses';

export interface IssueVersionsProps {
	lens: Lens<IssueVersionsInput>,
}

export const IssueVersions: FC<IssueVersionsProps> = ({ lens }) => {
	const affectedVersion = useController(lens.focus('affectedVersion').interop())
	const fixVersion = useController(lens.focus('fixVersion').interop())

	return <>
		<TextInput label="Affected Version" {...affectedVersion.field} error={affectedVersion.fieldState.error} />
		<TextInput label="Fix Version" {...fixVersion.field} error={fixVersion.fieldState.error} />
	</>
}
