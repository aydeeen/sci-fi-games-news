import React, { useState } from "react";
import SingleArticle from "./SingleArticle";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Navigation from "../ui/Navigation";
import Layout from "../ui/Layout";
import Input from "../input/Input";
import classes from "./Articles.module.scss";

const Articles = () => {
   const [articles, setArticles] = useState([]);

   const { data, error, isError, isLoading, refetch } = useQuery(
      ["articles"],
      async () => {
         const { data } = await axios(
            "https://www.alpha-orbital.com/last-100-news.json"
         );

         setArticles(data);

         return data;
      }
   );

   if (isLoading) {
      return <h1>Loading...</h1>;
   }

   if (isError) {
      return <h1>{error}</h1>;
   }

   const filterArticles = (event) => {
      const query = event.target.value;
      let filteredArticles;

      if (query.length > 2) {
         filteredArticles = articles.filter((article) => {
            return (
               article.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 || 
               article.excerpt.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
               article.post_category_id == articles[0].post_category_id
            );
         });

         setArticles(filteredArticles);
      } else {
         filteredArticles = data.filter((article) => {
            return article.post_category_id == articles[0].post_category_id;
         });

         setArticles(filteredArticles);
      }
   };

   const removeArticle = (slug) => {
      let updatedArticles;

      updatedArticles = articles.filter((article) => article.slug !== slug);

      setArticles(updatedArticles);
   };

   const filterCategories = (catId) => {
      let filteredCategories;
      if (catId.length) {
         filteredCategories = data.filter((article) => {
            return article.post_category_id == catId;
         });
      } else {
         filterCategories = data;
      }

      setArticles(filteredCategories);
   };

   const uniqueIds = [];

   const uniqueCategories = data.filter((item) => {
      const isDuplicate = uniqueIds.includes(item.post_category_id);

      if (!isDuplicate) {
         uniqueIds.push(item.post_category_id);

         return true;
      }

      return false;
   });

   return (
      <Layout>
         <Navigation uniqueCategories={uniqueCategories} filterCategories={filterCategories} refetch={refetch} />
         <Input filterArticles={filterArticles} />
         <h3 className={classes["count-title"]}>
            Currently showing {articles.length} articles
         </h3>
         <div className={classes.articles}>
            {articles.map((article, index) => {
               const formatedDate = new Date(article.date).toLocaleDateString();
               const excerpt = article.excerpt.replace(/<(.|\n)*?>/g, "");
               return (
                  <SingleArticle
                     key={index}
                     slug={article.slug}
                     image={article.post_image}
                     title={article.title}
                     date={article.date}
                     excerpt={excerpt}
                     removeArticle={removeArticle.bind(null, article.slug)}
                  />
               );
            })}
         </div>
         {articles.length < 100 && (
            <button type="button" className={classes["refetch-button"]} onClick={refetch}>
               Refetch
            </button>
         )}
      </Layout>
   );
};

export default Articles;
