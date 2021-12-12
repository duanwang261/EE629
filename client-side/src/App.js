
import './App.css';
import Home from './Pages/Home';
import SchoolDetail from './Pages/SchoolDetail'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
            <h1>
              SCHOOLS HOMEPAGE
            </h1>
          <Link className="showlink" to="/">
              Home
          </Link>
        </header>
        <br />
        <br />
        <div className="App-body">
        <Route exact path="/" component={Home} />
        <Route exact path="/school/:id/" component={SchoolDetail} />
        </div>
      </div>
    </Router>
  );
}

export default App;
