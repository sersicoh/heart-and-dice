import type { HTMLAttributes } from 'react';

import type { DiceFieldVariant } from '@views/dice/diceForm.types';
import type { IHeartFieldsType } from '@views/heart/heartForm.types';

export interface IHeartFormFieldProps extends HTMLAttributes<HTMLDivElement> {
  variant?: IHeartFieldsType['variant'];
  isEditable?: boolean;
  value?: string | number | null;
  onChangeValue?: (value: number | null) => void;
  label?: string;
  type?: 'text' | 'number';
  disabled?: boolean;
  placeholder?: string;
  onTitleClick?: () => void;
  isClickable?: boolean;
}
export interface IDiceFormFieldProps extends HTMLAttributes<HTMLDivElement> {
  variant?: DiceFieldVariant;
  isEditable?: boolean;
  value?: string | number | null;
  onChangeValue?: (value: number | null) => void;
  label?: string;
  type?: 'text' | 'number';
  disabled?: boolean;
  placeholder?: string;
  onTitleClick?: () => void;
  isClickable?: boolean;
}
