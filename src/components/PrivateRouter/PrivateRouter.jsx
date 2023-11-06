import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRouter = ({ children }) => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');

        if(!token){
            navigate('/');
        }
    }, [navigate])


  return (
    <>{children}</>
  )
}

export default PrivateRouter
