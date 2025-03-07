import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NavigationBar } from '@components/features/navigationBar/NavigationBar';
import { HeartForm } from '@views/heart/HeartForm';
// import { DiceSettings } from '@views/dice/Settings'; // Plik do utworzenia
import { HeartSettings } from '@views/heart/HeartSettings'; // Plik do utworzenia
import { Home } from '@views/home/Home';

function App() {
  const navigationItems = [
    { path: '/heart/form', title: 'formularz' },
    { path: '/heart/results', title: 'wyniki' },
    { path: '/heart/rules', title: 'zasady' },
  ];

  return (
    <BrowserRouter>
      <NavigationBar routes={navigationItems} />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/heart/settings' element={<HeartSettings />} />
        <Route path='/heart/form' element={<HeartForm />} />

        {/* <Route path='/dice/settings' element={<DiceSettings />} />
        <Route path='/dice/form' element={<DiceForm />} /> */}

        {/* Możesz też dodać route na /wyniki i /zasady, jeśli chcesz je zachować */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
