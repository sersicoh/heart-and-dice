import { HashRouter, Route, Routes } from 'react-router-dom';

import { DiceForm } from '@views/dice/DiceForm';
import { DiceResults } from '@views/dice/DiceResults';
import { DiceRules } from '@views/dice/DiceRules';
import { DiceSettings } from '@views/dice/DiceSettings';
import { HeartForm } from '@views/heart/HeartForm';
import { HeartResults } from '@views/heart/HeartResults';
import { HeartRules } from '@views/heart/HeartRules';
import { HeartSettings } from '@views/heart/HeartSettings';
import { Home } from '@views/home/Home';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/heart/settings' element={<HeartSettings />} />
        <Route path='/heart/form' element={<HeartForm />} />
        <Route path='/heart/results' element={<HeartResults />} />
        <Route path='/heart/rules' element={<HeartRules />} />

        <Route path='/dice/settings' element={<DiceSettings />} />
        <Route path='/dice/form' element={<DiceForm />} />
        <Route path='/dice/results' element={<DiceResults />} />
        <Route path='/dice/rules' element={<DiceRules />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
