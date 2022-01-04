import React from "react";
import AuthForm from "../components/Auth/AuthForm";
import Modal from "../components/UI/Modal";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useSelector } from "react-redux";

const Login = () => {
  const loading = useSelector((state) => state.loading.isLoading);
  const isToken = useSelector((state) => state.auth.token);

  return (
    <Modal>
      {loading && <LoadingSpinner />}
      {!isToken && <AuthForm />}
    </Modal>
  );
};

export default Login;
