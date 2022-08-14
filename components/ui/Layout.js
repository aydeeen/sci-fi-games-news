import { Fragment } from "react";

import classes from "./Layout.module.scss";

function Layout(props) {
   return (
      <Fragment>
         <main className={classes.main}>{props.children}</main>
      </Fragment>
   );
}

export default Layout;
