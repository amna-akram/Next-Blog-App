import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppNav from "../AppNav";
import classes from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode,
  onThemeChangeHandler(event: React.FormEvent<HTMLInputElement>): void;
}
function Layout(props: LayoutProps) {
  return (
    <>
      <div>
        <AppNav onThemeChangeHandler={props.onThemeChangeHandler} />
      </div>
      <div>
        <ToastContainer />

        <main className={classes.main}> {props.children} </main>
      </div>
    </>
  );
}

export default Layout;
