import type { FC } from 'react';

import {
  StyledFormField,
  StyledInput,
  StyledLabel,
} from '@components/common/diceFormField/formField.stytes';
import type { IDiceFormFieldProps } from '@components/common/heartFormField/formField.types';

export const DiceFormField: FC<IDiceFormFieldProps> = ({
  variant = 'input',
  isEditable = false,
  value,
  onChangeValue,
  onTitleClick,
  isClickable,
  ...rest
}) => {
  return (
    <StyledFormField $variant={variant} isClickable={isClickable} onClick={onTitleClick} {...rest}>
      {isEditable ? (
        <StyledInput
          type='text'
          pattern='-?[0-9]*'
          inputMode='decimal'
          value={value ?? ''}
          onChange={(e) => {
            const val = e.target.value;
            if (val === '' || val === '-') {
              onChangeValue?.(null);
            } else {
              onChangeValue?.(parseFloat(val));
            }
          }}
        />
      ) : (
        <StyledLabel>{value}</StyledLabel>
      )}
    </StyledFormField>
  );
};
