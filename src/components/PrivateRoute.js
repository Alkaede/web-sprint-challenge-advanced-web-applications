import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...theRest}) =>{
  return <Route {...theRest} render={()=>{
    if(localStorage.getItem('token') === null){
      return <Redirect to='/' />
    }
    return Component
  }} />
}



export default ProtectedRoute;




//Task List:
//1. Build a PrivateRoute component that redirects if user is not logged in