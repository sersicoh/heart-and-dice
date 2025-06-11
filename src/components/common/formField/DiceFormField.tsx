import type { ChangeEvent, FC } from 'react';

import {
  StyledFormField,
  StyledInput,
  StyledLabel,
} from '@components/common/formField/formField.stytes';
import type { IDiceFormFieldProps } from '@components/common/formField/formField.types';

export const DiceFormField: FC<IDiceFormFieldProps> = ({
  variant = 'input',
  isEditable = false,
  value,
  onChangeValue,
  label,
  onTitleClick,
  isClickable,
  ...rest
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChangeValue) {
      onChangeValue(e.target.value ? parseFloat(e.target.value) : null);
    }
  };

  return (
    <StyledFormField $variant={variant} isClickable={isClickable} onClick={onTitleClick} {...rest}>
      {isEditable ? (
        <StyledInput inputMode='numeric' value={value ?? ''} onChange={handleChange} />
      ) : (
        <StyledLabel>{label}</StyledLabel>
      )}
    </StyledFormField>
  );
};
