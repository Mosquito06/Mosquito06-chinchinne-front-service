import React from 'react'; 
import { Navigate } from 'react-router-dom'; 

const PrivateRoute = ({component : RouteComponent}) => 
{
    const token = JSON.parse(localStorage.getItem('ref-token'));

    if( !token ) 
    {
        return <Navigate replace to="/login"/> ;
    }
    else
    {
        return <RouteComponent /> ;
    }
}; 

export default PrivateRoute;