import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Createpost from './pages/Createpost';
import Viewpost from './pages/Viewpost';

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/createpost" element={<Createpost/>} />
          <Route path="/viewpost/:id" element={<Viewpost/>} />
        </Routes>
    </Router>
  );
}

export default App;