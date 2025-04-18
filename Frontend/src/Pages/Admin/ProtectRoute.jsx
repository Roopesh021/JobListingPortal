import { UserContext } from "@/Store/user-store";
import { Children } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectRoute = ({ Children }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user.role !== "recruiter") {
      navigate("/");
    }
  }, []);

  return <>{Children}</>;
};

export default ProtectRoute;
