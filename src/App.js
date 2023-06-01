import { Route, Routes } from 'react-router-dom';
import './assets/App.css';
import './assets/_null.css'
import Darshboard from './components/Dashboard/Darshboard';
import DinamicTable from './components/DinamicTable/DinamicTable';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Darshboard /> } />
        <Route path='/:slug' element={ <DinamicTable /> } />
      </Routes>
    </div>
  );
}

export default App;
