import Container from '@components/common/container/Container';
import { ScrollToTopButton } from '@components/common/scrollToTopButton/ScrollToTopButton';
import { Title } from '@components/common/title/Title';
import { RuleTile } from '@components/features/rulesWrapper/ruleTile/RuleTile';
import { TableOfContents } from '@components/features/rulesWrapper/tableOfContents/TableOfContents';

import { useMyTheme } from '@hooks/useMyTheme';
import HeartRules from '@docs/HeartRule.json';

export const RulesWrapper = () => {
  const { isMobile } = useMyTheme();
  return (
    <>
      <Container
        variant='flex'
        justifyContent='center'
        alignItems='center'
        padding={isMobile ? '16px' : '24px'}
      >
        <Title label='Zasady rozgrywek' />
      </Container>
      <Container
        variant='grid'
        gridTemplateColumns='1fr auto'
        gap='8px'
        padding={isMobile ? '8px' : '8px'}
      >
        <TableOfContents items={HeartRules} />
        <Container>
          {HeartRules.map(({ id, title, content }) => {
            return <RuleTile key={id} id={id} title={title} content={content} />;
          })}
        </Container>
      </Container>
      <ScrollToTopButton />
    </>
  );
};
