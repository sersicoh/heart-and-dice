import type { HTMLAttributes } from 'react';

import type { IFieldsType } from '@views/heart/heartForm.types';

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  variant?: IFieldsType['variant'];
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
