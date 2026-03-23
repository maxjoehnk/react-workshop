import { Link as HeroLink } from '@heroui/react'
import { Link as RouterLink } from '@tanstack/react-router'
import { linkVariants } from '@heroui/styles';
import type { FC, ReactNode } from 'react';

export interface LinkProps {
	children: ReactNode;
	to: string;
	external?: boolean;
}

export const Link: FC<LinkProps> = ({ children, to, external }) => {
	const slots = linkVariants();

	return <RouterLink to={to} className={slots.base()}>
		{children}
		{external && <HeroLink.Icon className={slots.icon()}/>}
	</RouterLink>
}
