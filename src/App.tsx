import { HashRouter, Route, Routes } from 'react-router-dom';

import { DiceSettings } from '@views/dice/DiceSettings';
import { HeartForm } from '@views/heart/HeartForm';
import { HeartSettings } from '@views/heart/HeartSettings';
import { Results } from '@views/heart/Results';
import { Rules } from '@views/heart/Rules';
import { Home } from '@views/home/Home';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/heart/settings' element={<HeartSettings />} />
        <Route path='/heart/form' element={<HeartForm />} />
        <Route path='/heart/results' element={<Results />} />
        <Route path='/heart/rules' element={<Rules />} />

        <Route path='/dice/settings' element={<DiceSettings />} />
        <Route path='/heart/form' element={<HeartForm />} />
        <Route path='/heart/results' element={<Results />} />
        <Route path='/heart/rules' element={<Rules />} />

        {/* Możesz też dodać route na /wyniki i /zasady, jeśli chcesz je zachować */}
      </Routes>
    </HashRouter>
  );
}

export default App;
