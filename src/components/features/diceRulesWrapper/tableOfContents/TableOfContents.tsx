import { BasicButton } from '@components/common/basicButton/BasicButton';
import Container from '@components/common/container/Container';
import { Title } from '@components/common/title/Title';
import {
  ListWrapper,
  NavWrapper,
} from '@components/features/diceRulesWrapper/tableOfContents/tableOfContents.styles';

import { useMyTheme } from '@hooks/useMyTheme';

interface ITableOfContentsProps {
  items: {
    id: string;
    title: string;
    content: string[];
  }[];
}

export const TableOfContents = ({ items }: ITableOfContentsProps) => {
  const { isMobile } = useMyTheme();

  return (
    <NavWrapper>
      <Container variant='flex' flexDirection='column' width='100%' minWidth='max-content'>
        <Container variant='flex' justifyContent='center' alignItems='center'>
          <Title label='Spis treści' />
        </Container>
        <ListWrapper>
          <Container variant='flex' flexDirection='column' gap={isMobile ? '8px' : '12px'}>
            {items.map((item) => (
              <BasicButton
                key={item.id}
                onClick={() => {
                  const element = document.getElementById(item.id);
                  if (element) {
                    const yOffset = isMobile ? -104 : -130;
                    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                content={item.title}
              />
            ))}
          </Container>
        </ListWrapper>
      </Container>
    </NavWrapper>
  );
};
