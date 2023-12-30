import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import { Route , Routes } from 'react-router-dom';
import AdminNav from './components/adminNavBar';
import Formation from './components/formationInfo';
import Formations from './components/formations';
import FormationsPart from './components/formParticipant';
import ParticipantnNav from './components/participNAv';

function App() {

  

  return (
    
    <div className="App">
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/formateur" element={<AdminNav />} >
            <Route path='formations' element={<Formations />} />
            <Route path='formations/:id' element={<Formation />} />
          </Route>
          <Route path="/participant" element={<ParticipantnNav />} >
            <Route path='formations' element={<FormationsPart />} />
            {/* <Route path='formations/:id' element={<Formation />} /> */}
          </Route>
      </Routes>
    </div>
  );
}

export default App;
