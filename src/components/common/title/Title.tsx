import { StyledTitle } from '@components/common/title/titile.styles';

export const Title = ({ label, lineHeight }: { label: string; lineHeight?: number }) => {
  return <StyledTitle lineHeight={lineHeight}>{label}</StyledTitle>;
};
