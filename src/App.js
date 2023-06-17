import { Routes, Route } from 'react-router-dom';

import './App.css';

import Header from './components/Header/Header';
import Main from './components/Main/Main';

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <>
            <Header />
            <Main />
          </>
        }
      />
    </Routes>
  );
}

export default App;
