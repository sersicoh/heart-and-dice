import styled, { css } from 'styled-components';

import type { ContainerProps } from '@components/common/container/container.types';

const handleVariantStyles = ({
  variant,
  justifyContent,
  alignItems,
  flexDirection,
  gridTemplateColumns,
  gridTemplateRows,
  gap,
}: ContainerProps) => {
  switch (variant) {
    case 'flex':
      return css`
        display: flex;
        ${justifyContent && `justify-content: ${justifyContent};`}
        ${alignItems && `align-items: ${alignItems};`}
        ${flexDirection && `flex-direction: ${flexDirection};`}
        ${gap && `gap: ${gap};`}
      `;
    case 'grid':
      return css`
        display: grid;
        ${gridTemplateColumns && `grid-template-columns: ${gridTemplateColumns};`}
        ${gridTemplateRows && `grid-template-rows: ${gridTemplateRows};`}
        ${gap && `gap: ${gap};`}
      `;
    default:
      // base
      return css`
        display: block;
      `;
  }
};

const handleBaseStyles = (props: ContainerProps) => css`
  ${props.backgroundColor && `background-color: ${props.backgroundColor};`}
  ${props.padding && `padding: ${props.padding};`}
  ${props.margin && `margin: ${props.margin};`}
  ${props.width && `width: ${props.width};`}
  ${props.height && `height: ${props.height};`}
  ${props.maxWidth && `max-width: ${props.maxWidth};`}
  ${props.minHeight && `min-height: ${props.minHeight};`}
  ${props.borderRadius && `border-radius: ${props.borderRadius};`}

  ${handleVariantStyles(props)}
`;

export const StyledContainer = styled.div<ContainerProps>`
  ${(props) => handleBaseStyles(props)}

  @media ${({ theme }) => theme.devices.tablet} {
    ${({ responsive }) =>
      responsive?.tablet &&
      css`
        ${handleBaseStyles({ ...responsive.tablet })}
      `}
  }

  /* Mobile (np. max-width: 768px) */
  @media ${({ theme }) => theme.devices.mobile} {
    ${({ responsive }) =>
      responsive?.mobile &&
      css`
        ${handleBaseStyles({ ...responsive.mobile })}
      `}
  }
`;
