import Image from "next/image";

import classes from "./Article.module.scss";

const SingleArticle = ({ slug, image, title, date, excerpt, removeArticle }) => {
   return (
      <div className={classes.article}>
         <div className={classes["image-wrapper"]}>
            <a href={`https://www.alpha-orbital.com/news/${slug}`}>
               <Image
                  src={`https://www.alpha-orbital.com/assets/images/post_img/${image}`}
                  alt={title}
                  width={600}
                  height={300}
               />
            </a>
         </div>
         <div className={classes["content-wrapper"]}>
            <div className={classes["link-wrapper"]}>
               <button onClick={removeArticle}>Delete article</button>
            </div>
            <h3>
               <a href={`https://www.alpha-orbital.com/news/${slug}`}>
                  {title}
               </a>
            </h3>
            <p className={classes.date}>{date}</p>
            <p>{excerpt}</p>
            <div className={classes["link-wrapper"]}>
               <a href={`https://www.alpha-orbital.com/news/${slug}`}>
                  Full Article
               </a>
            </div>
         </div>
      </div>
   );
};
export default SingleArticle;


