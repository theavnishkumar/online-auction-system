import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../store/auth/authSlice";
import LoadingScreen from "../components/LoadingScreen";

const InitAuth = ({ children }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const didRun = useRef(false);

  useEffect(() => {
    if (!didRun.current) {
      dispatch(checkAuth());
      didRun.current = true;
    }
  }, [dispatch]);

  if (loading && !didRun.current) return <LoadingScreen />;

  return children;
};

export default InitAuth;
