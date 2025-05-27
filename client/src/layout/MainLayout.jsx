import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {Navbar} from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../store/auth/authSlice";
import { Footer } from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigate } from "react-router-dom";

export const MainLayout = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) return <LoadingScreen />;

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
