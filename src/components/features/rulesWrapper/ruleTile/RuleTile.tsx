import Container from '@components/common/container/Container';

interface IRuleProps {
  id: string;
  title: string;
  content: string;
}

export const RuleTile = ({ id, title, content }: IRuleProps) => {
  return (
    <Container id={id}>
      <h3>{title}</h3>
      <p>{content}</p>
    </Container>
  );
};
