import { Route, Routes } from 'react-router-dom';
import './assets/App.css';
import './assets/_null.css'
import Darshboard from './components/Dashboard/Darshboard';
import DinamicTable from './components/DinamicTable/DinamicTable';
import FormsController from './components/FormsController/FormsController';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Darshboard /> } />
        <Route path='/:slug' element={ <DinamicTable /> } />
        <Route path='/form/:slug' element={ <FormsController /> } />
        <Route path='/edit/:slug/:id' element={ <FormsController /> } />
      </Routes>
    </div>
  );
}

export default App;
