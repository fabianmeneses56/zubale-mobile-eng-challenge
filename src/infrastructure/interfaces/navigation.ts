import { ComponentProps } from 'react';
import Icon from '@react-native-vector-icons/material-design-icons';

export type IconName = ComponentProps<typeof Icon>['name'];

export type TabName = 'Home' | 'Search' | 'Profile' | 'Add' | 'Reels';
