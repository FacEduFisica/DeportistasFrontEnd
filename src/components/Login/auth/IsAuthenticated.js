import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Route, Redirect } from "react-router-dom";
import Layout from '../../Layout/Layout';
import authService from "../../../services/authService";
const IsAuthenticated = ({ component: Component, ...props }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userToken"));
  useEffect( () => {
    if(!validateToken()){
      authService.logout();
      setUserId(null);
    }
  }, [Component]);

  const validateToken = async () => {
    let isValidToken = await authService.isValidToken();
    return isValidToken
  }
  return (
    <Route
      {...props}
      render={(props) =>
        !userId ? <Redirect to="/" /> : (
          <Layout>
            <Component {...props} />
          </Layout>)
      }
    />
  );
};

export default IsAuthenticated;
