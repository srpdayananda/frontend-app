import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, colors, Typography } from "@mui/material";

import { useAppSelector } from "../../core/context/hooks";
import { RootState } from "../../core/context/store";
import { EUserRole } from "../../shared/enums/user-role.enum";
import "./index.scss";

const Home = () => {
  const authState = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const goToLoginClickedHandler = () => navigate("auth");

  const goToRegisterClickedHandler = () => navigate("auth/register");

  useEffect(() => {
    if (authState.authUser) {
      const roles = authState.authUser.roles;
      if (roles.includes(EUserRole.CompanyAdmin)) {
        navigate("user");
        return;
      }
      navigate("user");
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  return (
    <div className="home-container">
      <div
        className="grid-item"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              sx={{ color: colors.common.black, fontWeight: "bold" }}
            >
              Welcome
            </Typography>
          </div>
          <div style={{ marginTop: '4rem'}}>
            <Button
              type="button"
              variant="contained"
              onClick={goToLoginClickedHandler}
              className="login-btn-home"
            >
              Log in
            </Button>
          </div>
          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <Typography
              className="link-navigation-home"
              onClick={goToRegisterClickedHandler}
            >
              Don't have an account? Sign Up
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
