import React, { useContext } from "react";
import { useRouter } from "next/router";

import {
  Toolbar,
  AppBar,
  Typography
} from "@mui/material";
import Link from "next/link";
import Switch from "@mui/material/Switch";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ReactTooltip from "react-tooltip";

import classes from "./AppNav.module.css";
import ModalContext from "../store/modal-context";

interface NavProps {
  onThemeChangeHandler(event: React.FormEvent<HTMLInputElement>): void;
}
const AppNav = (props: NavProps) => {
  const modalContext = useContext(ModalContext);
  const router = useRouter();
  function newFormClickHandler() {
    modalContext.modalOpenHandler();
  }

  return (
    <div>
      <AppBar position="static" className={classes.AppNav}>
        <Toolbar>
          <Typography
            variant="h4"
            style={{
              flexGrow: 1,
            }}
            className={classes.name}
          >
            Next Blogs
          </Typography>
          <Link href="/"> All Blogs </Link>
          {router.pathname == "/" && (
            <div className={classes.actions}>
              <button onClick={newFormClickHandler}> New Blog </button>
            </div>
          )}
          <ReactTooltip backgroundColor="black" place="bottom" />
          <Switch
            size="medium"
            sx={{
              m: 1,
            }}
            onChange={props.onThemeChangeHandler}
            defaultChecked
            checkedIcon={<LightModeIcon sx={{ color: "yellow" }} />}
            icon={<DarkModeIcon sx={{ color: "black" }} />}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppNav;
