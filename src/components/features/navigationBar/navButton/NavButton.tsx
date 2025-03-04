import Container from '@components/common/container/Container';
import { StyledNavButton } from '@components/features/navigationBar/navButton/navButton.styles';

export const NavButton = ({ title }: { title: string }) => {
  return (
    <Container variant='flex' justifyContent='center' width='100%'>
      <StyledNavButton>{title}</StyledNavButton>
    </Container>
  );
};
