// useCustomSnackbar.ts
import { useSnackbar } from 'notistack';
import type { SnackbarOrigin } from 'notistack';
import type { DefaultTheme } from 'styled-components';

import { useMyTheme } from '@hooks/useMyTheme';
import CloseSvg from '@assets/svg/close.svg?react';

interface ICustomSnackbarOptions {
  message: string;
  variant?: 'default' | 'error' | 'success' | 'warning' | 'info';
  anchorOrigin?: SnackbarOrigin;
  autoHideDuration?: number;
  transitionDuration?: {
    enter: number;
    exit: number;
  };
  disableWindowBlurListener?: boolean;
  hideIconVariant?: boolean;
  closeButton?: boolean;
  style?: React.CSSProperties;
}

function getVariantStyle(variant: string, theme: DefaultTheme) {
  switch (variant) {
    case 'success':
      return {
        backgroundColor: theme.colors.successMessageBackground,
        color: theme.colors.successMessageText,
      };
    case 'error':
      return {
        backgroundColor: theme.colors.errorMessageBackground,
        color: theme.colors.errorMessageText,
      };
    case 'info':
      return {
        backgroundColor: theme.colors.infoMessageBackground,
        color: theme.colors.infoMessageText,
      };
    case 'warning':
      return {
        backgroundColor: theme.colors.warningMessageBackground,
        color: theme.colors.warningMessageText,
      };

    default:
      return {
        backgroundColor: theme.colors.defaultMessageBackground,
        color: theme.colors.defaultMessageText,
      };
  }
}

export function useCustomSnackbar() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { theme, isMobile } = useMyTheme();

  function showSnackbar({
    message,
    variant = 'info',
    anchorOrigin = { horizontal: 'left', vertical: 'top' },
    autoHideDuration = 5000,
    transitionDuration = { enter: 500, exit: 300 },
    disableWindowBlurListener = true,
    hideIconVariant = true,
    closeButton = false,
    style,
  }: ICustomSnackbarOptions) {
    const variantStyle = getVariantStyle(variant, theme);

    enqueueSnackbar(message, {
      variant,
      anchorOrigin,
      autoHideDuration,
      transitionDuration,
      disableWindowBlurListener,
      hideIconVariant,
      style: {
        ...style,
        ...variantStyle,
        fontSize: isMobile ? '12px' : '24px',
      },
      action:
        closeButton &&
        (() => (
          <button
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '12px',
            }}
            onClick={() => closeSnackbar()}
          >
            <CloseSvg width={'24px'} height={'24px'} color={theme.colors.textWhite} />
          </button>
        )),
    });
  }

  return { showSnackbar };
}
