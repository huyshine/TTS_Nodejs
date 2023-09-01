import { useNavigate } from "react-router-dom";

export const checkAuth = () => {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("auth") || "{}")?.authen?.role;
  // console.log("auth", auth?.role);
  if (admin !== 1) {
    return navigate("/auth/signin");
  }
};
