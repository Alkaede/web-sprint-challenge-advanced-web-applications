import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from './components/BubblePage';
import "./styles.scss";
import ProtectedRoute from "./components/PrivateRoute";

function App() {

  const logout = () => {
    localStorage.removeItem('token');
  }

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <Link to ='/' onClick={logout}>Logout</Link>
        </header> 
        
        <Switch>
          <Route exact path="/" component={Login} />
          {/* the routing was so weird that I had to split protected route with the route component stuff */}
          <ProtectedRoute>
            <Route exact path='/BubblesPage' component={BubblePage} />
          </ProtectedRoute>
        </Switch>
      </div>      
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//2. Build the logout button to remove the localStorage Item.