import 'bootstrap/dist/css/bootstrap.min.css';
import Login from 'components/menu/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={< Login />}/>
        </Routes>
      </Router>
  );
}

export default App;
