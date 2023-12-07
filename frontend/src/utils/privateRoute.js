import { Navigate } from "react-router-dom";
import React from "react";

export function PrivateRoute({children})
{
    const user = localStorage.getItem('token');

    return user ? children : <Navigate to="/login"/>
}