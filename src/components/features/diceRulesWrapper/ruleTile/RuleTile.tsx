import ReactMarkdown from 'react-markdown';

import Container from '@components/common/container/Container';
import {
  RuleDescription,
  RuleDescriptionWrapper,
  RuleImage,
  RuleImageBackground,
  RuleImageWrapper,
  RuleTitle,
} from '@components/features/heartRulesWrapper/ruleTile/ruleTile.styles';

interface IRuleProps {
  id: string;
  title: string;
  content: string[];
  image?: string;
}

export const RuleTile = ({ id, title, content, image }: IRuleProps) => {
  return (
    <Container id={id}>
      <RuleTitle>{title}</RuleTitle>
      {image && (
        <RuleImageWrapper>
          <RuleImage src={`img/${image}`} alt={title} />
          <RuleDescriptionWrapper>
            <RuleDescription>Kier</RuleDescription>
            <RuleDescription>Caro</RuleDescription>
            <RuleDescription>Trefl</RuleDescription>
            <RuleDescription>Pik</RuleDescription>
          </RuleDescriptionWrapper>
          <RuleImageBackground />
        </RuleImageWrapper>
      )}
      {content && <ReactMarkdown>{content.join('\n\n')}</ReactMarkdown>}
    </Container>
  );
};
