import { Modal } from '@heroui/react';
import type { FC, ReactNode } from 'react';

export interface DialogProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	title: ReactNode;
	children: ReactNode;
	footer?: ReactNode;
}

export const Dialog: FC<DialogProps> = ({ isOpen, setIsOpen, title, children, footer }) => {
	return <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
		<Modal.Container>
			<Modal.Dialog>
				<Modal.CloseTrigger />
				<Modal.Header>
					<Modal.Heading>{title}</Modal.Heading>
				</Modal.Header>
				<Modal.Body>
					{children}
				</Modal.Body>
				<Modal.Footer>
					{footer}
				</Modal.Footer>
			</Modal.Dialog>
		</Modal.Container>
	</Modal.Backdrop>
}
