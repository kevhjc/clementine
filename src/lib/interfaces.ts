import { ReactNode } from 'react';
import type { LinkProps } from 'react-router-dom';

import { Item, Feature } from './types';

export interface ICommandPaletteProps {
  children: ReactNode;
}

export interface IButtonProps {
  text: string;
}

export interface IFeatureProps {
  feature: Feature;
}

export interface ICategoryLinkProps extends Omit<LinkProps, 'to'> {
  category: string;
}

export interface IEntryProps {
  items: Item[];
  updateEntryById: (
    id: string,
    title: string | undefined,
    content?: string | undefined
  ) => void;
  deleteEntryById: (id: string) => void;
}

export interface IAddEntryProps {
  userEntries: string[];
  setUserEntries: any;
}
