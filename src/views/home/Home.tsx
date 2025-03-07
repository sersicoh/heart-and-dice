import { useNavigate } from 'react-router-dom';

import Container from '@components/common/container/Container';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Wybierz grę</h1>
      <button onClick={() => navigate('/heart/settings')}>Kierki</button>
      <button onClick={() => navigate('/dice/settings')}>Kości</button>
    </Container>
  );
};
