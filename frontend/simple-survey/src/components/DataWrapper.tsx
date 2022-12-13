import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../redux/User/user.actions";
import axios, { AxiosResponse } from "axios";

const DataWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<null | "loading" | "done">(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // axios.interceptors.response.use((res: AxiosResponse) => {

  //   // if token expired
  //   if (res.status === 403) {
  //     localStorage.removeItem('userData');
  //     navigate('/login');
  //   }

  //   return res;
  // });

  useEffect(() => {
    setLoading("loading");

    const localUserData = localStorage.getItem('userData');

    if (localUserData) {
      dispatch(setUser(JSON.parse(localUserData)));
      navigate(location.pathname, { replace: true });
    } else {
      navigate('/login');
    }

    setLoading("done");
  }, []);

  return (
    <>
      {loading === "done" && children}
    </>
  );
}

export default DataWrapper;