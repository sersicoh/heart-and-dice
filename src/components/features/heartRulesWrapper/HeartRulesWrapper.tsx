import Container from '@components/common/container/Container';
import { ScrollToTopButton } from '@components/common/scrollToTopButton/ScrollToTopButton';
import { Title } from '@components/common/title/Title';
import { RuleTile } from '@components/features/heartRulesWrapper/ruleTile/RuleTile';
import { TableOfContents } from '@components/features/heartRulesWrapper/tableOfContents/TableOfContents';

import { useMyTheme } from '@hooks/useMyTheme';
import HeartRules from '@docs/HeartRule.json';

export const HeartRulesWrapper = () => {
  const { isMobile } = useMyTheme();
  return (
    <>
      <Container
        variant='flex'
        justifyContent='center'
        alignItems='center'
        padding={isMobile ? '16px' : '24px'}
        margin={isMobile ? '112px auto 0' : '145px auto 0'}
      >
        <Title label='Zasady rozgrywek' />
      </Container>
      <Container
        variant='grid'
        gridTemplateColumns='1fr auto'
        gap='8px'
        padding={isMobile ? '4px' : '8px'}
      >
        <TableOfContents items={HeartRules} />
        <Container margin='0 0 48px 0'>
          {HeartRules.map(({ id, title, content, image }) => {
            return <RuleTile key={id} id={id} title={title} content={content} image={image} />;
          })}
        </Container>
      </Container>
      <ScrollToTopButton />
    </>
  );
};
