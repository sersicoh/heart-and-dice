import { HashRouter, Route, Routes } from 'react-router-dom';

import { DiceForm } from '@views/dice/DiceForm';
import { HeartForm } from '@views/heart/HeartForm';
import { Results } from '@views/heart/HeartResults';
import { Rules } from '@views/heart/Rules';
import { Home } from '@views/home/Home';
import { SettingsView } from '@views/settings/SettingsView';

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
