import { StyledNavTitle } from '@components/features/navigationBar/navTitle/navTitle.styles';

export interface INavigationTitle {
  label: string;
  fontSize?: {
    tablet: string;
    mobile?: string;
  };
}

export const NavTitle = ({ label, fontSize }: INavigationTitle) => {
  return <StyledNavTitle fontSize={fontSize}>{label}</StyledNavTitle>;
};
