
import { HomePage } from 'View/Pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
