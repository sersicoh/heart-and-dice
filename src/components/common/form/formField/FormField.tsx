import type { ChangeEvent, FC } from 'react';

import {
  StyledFormField,
  StyledInput,
  StyledLabel,
} from '@components/common/form/formField/formField.stytes';
import type { FormFieldProps } from '@components/common/form/formField/formField.types';

export const FormField: FC<FormFieldProps> = ({
  variant = 'input',
  isEditable = false,
  value,
  onChangeValue,
  label,
  ...rest
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChangeValue) {
      onChangeValue(e.target.value ? parseFloat(e.target.value) : null);
    }
  };

  return (
    <StyledFormField $variant={variant} {...rest}>
      {isEditable ? (
        <StyledInput inputMode='numeric' value={value ?? ''} onChange={handleChange} />
      ) : (
        <StyledLabel>{label}</StyledLabel>
      )}
    </StyledFormField>
  );
};
