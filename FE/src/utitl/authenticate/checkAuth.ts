import { useNavigate } from "react-router-dom";

export const checkAuth = () => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth") || "{}")?.user;
  // console.log("auth", auth?.role);
  if (!auth) {
    return navigate("/auth/signin");
  }
};
