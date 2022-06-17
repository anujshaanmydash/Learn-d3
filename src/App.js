import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import PageRender from './PageRender';
import Footer from './components/global/Footer'
import Header from './components/global/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/:page' element={<PageRender/>} />
          <Route exact path='/:page/:slug' element={<PageRender/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
