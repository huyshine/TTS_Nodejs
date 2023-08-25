import { useNavigate } from "react-router-dom";

export const checkAuth = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("auth");
  if (!auth) {
    return navigate("/auth/signin");
  }
};
