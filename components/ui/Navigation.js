import { NAVIGATION_ITEMS } from "../../config/constants";

import classes from "./Navigation.module.scss";

const Navigation = ({ filterCategories, refetch, categoryId }) => {
   const handleFilterCategories = (categoryId) => {
      filterCategories(categoryId);
   };

   return (
      <header className={classes.header}>
         <nav>
            <ul>
               {NAVIGATION_ITEMS.map((category) => (
                  <li key={category.id} className={categoryId === category.id ? classes.active : ""}>
                     <a onClick={() => handleFilterCategories(category.id)}>
                        {category.title}
                     </a>
                  </li>
               ))}
               <li className={!categoryId ? classes.active : ""}>
                  <a onClick={refetch}>Show All</a>
               </li>
            </ul>
         </nav>
      </header>
   );
};

export default Navigation;
