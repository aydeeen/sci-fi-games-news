import { useState } from 'react'

import classes from "./Navigation.module.scss";

const Navigation = (props) => {
   const [isActive, setActive] = useState(true)

   const toggleActiveClass = () => {
      setActive((prev) => !prev)
    }

   return (
      <header className={classes.header}>
         <nav>
            <ul>
               {props.uniqueCategories.map((category) => (
                  <li key={category.post_category_id}>
                     <a onClick={props.filterCategories.bind(null,category.post_category_id)}>
                        {category.post_category_id == 1 && "X Universe"}
                        {category.post_category_id == 2 && "Elite: Dangerous"}
                        {category.post_category_id == 3 && "Starpoint Gemini"}
                        {category.post_category_id == 4 && "EVE Online"}
                     </a>
                  </li>
               ))}
               <li className={isActive ? classes.active : ''} onClick={toggleActiveClass}>
                  <a onClick={props.refetch}>Show All</a>
               </li>
            </ul>
         </nav>
      </header>
   );
};

export default Navigation;
