import { HashRouter, Route, Routes } from 'react-router-dom';

import { DiceForm } from '@views/dice/DiceForm';
import { HeartForm } from '@views/heart/HeartForm';
import { Home } from '@views/Home';
import { Results } from '@views/Results';
import { Rules } from '@views/Rules';
import { SettingsView } from '@views/SettingsView';

//TODO: asd
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/:game/settings' element={<SettingsView />} />
        <Route path='/:game/results' element={<Results />} />
        <Route path='/:game/rules' element={<Rules />} />

        <Route path='/heart/form' element={<HeartForm />} />
        <Route path='/dice/form' element={<DiceForm />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
