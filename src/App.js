/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import VerificationEmail from "./pages/VerificationEmail";
import UserList from "./pages/UserList";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function App() {
  const dispatch = useDispatch();
  const storage = useSelector((state) => state.auth);
  const classes = useStyles();

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("user_data");
    if (userLocalStorage) {
      console.log(JSON.parse(userLocalStorage));
      dispatch({
        type: "LOGIN_USER",
        payload: JSON.parse(userLocalStorage),
      });
    } else {
      dispatch({
        type: "CHECK_STORAGE",
      });
    }
  }, []);

  if (storage.storageIsChecked) {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route component={Auth} path="/auth" />
          <Route
            component={VerificationEmail}
            path="/verification-email/:token"
          />
          <Route component={UserList} path="/user-list" />
          <Route component={Home} path="/" />
        </Switch>
      </BrowserRouter>
    );
  }
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}

export default App;
