import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser, unsetUser } from "../redux/User/user.actions";
import axios, { AxiosError, AxiosResponse } from "axios";

const DataWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<null | "loading" | "done">(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  axios.interceptors.response.use((res: AxiosResponse) => {
    return res;
  }, (error: AxiosError) => {
    console.log(error);
    
    // if token expired
    if (error.response?.status === 403) {
      localStorage.removeItem('userData');
      dispatch(unsetUser());
      navigate('/login');
    }

    return Promise.reject(error);
  });

  useEffect(() => {
    setLoading("loading");

    const localUserData = localStorage.getItem('userData');

    if (localUserData) {
      dispatch(setUser(JSON.parse(localUserData)));
      navigate(location.pathname, { replace: true });
    } else {
      if (!location.pathname.includes("/surveys/")) {
        navigate('/login');
      }
    }

    setLoading("done");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading === "done" && children}
    </>
  );
}

export default DataWrapper;