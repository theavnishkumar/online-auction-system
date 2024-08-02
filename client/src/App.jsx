import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default App;
