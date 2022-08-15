import { Fragment } from "react";

import classes from "./Toggle.module.scss";

function Layout({ categories, uniqueCategories, removeArticlesFromCategory, toggle }) {
   return (
      <Fragment>
         <button className={classes.button} onClick={uniqueCategories}>Toggle</button>
         <div className={classes.categories}>
            {toggle && <h2>Categories</h2>}
            {toggle && categories.map(id => {
               return (
                  <h6 key={id}>
                     {id == 1 && "X Universe"}
                     {id == 2 && "Elite: Dangerous"}
                     {id == 3 && "Starpoint Gemini"}
                     {id == 4 && "EVE Online"}
                     
                     <button type="button" onClick={() => removeArticlesFromCategory(id)}>
                        Remove Articles
                     </button>
                  </h6>
               )
            })}
         </div>
      </Fragment>
   );
}

export default Layout;
