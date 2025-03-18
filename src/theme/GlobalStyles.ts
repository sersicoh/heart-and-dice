import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Resetuj lub normalizuj marginesy/paddingi */
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 0;
  }

  body {
    /* Tło i kolor tekstu bazujące na theme */
    background-color: ${({ theme }) => theme.colors.backgroundBase};
    color: ${({ theme }) => theme.colors.textWhite};
    font-family: 'Gemunu Libre', sans-serif;
    line-height: 1.5;
    max-width: 1280px;
    height: auto;
    margin: 0 auto;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* Przykładowe style linków */
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.textLight};
  }
  a:hover {
    opacity: 0.8;
  }

  p {
    font-size: 1.25rem;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: 1rem;
      }
  }

  /* Przykładowe style dla przycisków */
  button {
    cursor: pointer;
    font-family: 'Gemunu Libre', sans-serif;
  }

  h2 {
  padding-top: 0.375rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 500;

  @media ${({ theme }) => theme.devices.mobile} {
      padding-top: 0.125rem;
      font-size: 1.125rem;
      }
    }

  h3 {
    font-size: 32px;
    font-weight: 500;
    padding: 12px 0;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: 1.25rem;
      padding: 6px 0;
      }
    }

  h4 {
    font-size: 28px;
    font-weight: 500;
    padding: 16px 0 4px 0;

    @media ${({ theme }) => theme.devices.mobile} {
      padding: 8px 0 4px 0;
      font-size: 1rem;
      }
    }

    th {
    font-weight: 400;
    font-size: 1.5rem;
    text-align: left;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: 0.875rem;
      }
    }

  td {
    font-weight: 400;
    font-size: 1.25rem;
    text-align: left;
    padding: 2px 24px 2px 0px;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: 0.875rem;
      }

    }
`;
