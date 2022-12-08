import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../redux/User/user.actions";

const DataWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<null | "loading" | "done">(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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