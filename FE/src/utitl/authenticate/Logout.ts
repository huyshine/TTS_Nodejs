import { useNavigate } from "react-router-dom";



export const logout = () => {
    localStorage.removeItem("auth");
    const navigate = useNavigate()
    setTimeout(() => {
        () => navigate("/auth/signin")
    },500)
    ;
    //  = "/auth/signin";
}

export const admin = () => {
    const admin = JSON.parse(localStorage.getItem("auth") || "{}")?.user?.role === "admin";
    // window.location.href = "/auth/signin";
    // return admin;
    if(admin){
        return "admin";
    }else{
        return "";
    }
}