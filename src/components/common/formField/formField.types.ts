import type { HTMLAttributes } from 'react';

import type { IHeartFieldsType } from '@views/heart/heartForm.types';

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
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
