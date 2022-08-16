import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, set } from "date-fns";

import ArticlesApi from "../../api/articlesApi";

import Navigation from "../ui/Navigation";
import Layout from "../ui/Layout";
import Toggle from "../ui/Toggle";
import Input from "../input/Input";
import SingleArticle from "./SingleArticle";

import classes from "./Articles.module.scss";

const Articles = ({ articlesData }) => {
   const [articles, setArticles] = useState([]);
   const [categoryId, setCategoryId] = useState(undefined);
   const [categories, setCategories] = useState([]);
   const [toggle, setToggle] = useState(false);
   const [deletedArticles, setDeletedArticles] = useState([])

   const { data, error, isError, isLoading, refetch } = useQuery(
      ["articles"],
      () => ArticlesApi.last100News(),
      {
         onSuccess: (data) => {
            setArticles(data);
         },
         initialData: articlesData,
      }
   );

   const filterArticles = (event) => {
      const query = event.target.value;
      let filteredArticles;

      if (query.length > 2 && categoryId != undefined) {
         filteredArticles = data.filter((article) => {
            if (article.post_category_id == categoryId) {
               return (
                  article.title.toLowerCase().indexOf(query.toLowerCase()) !==-1 ||
                  article.excerpt.toLowerCase().indexOf(query.toLowerCase()) !== -1 && !deletedArticles.includes(article)
               );
            }
         });
         setArticles(filteredArticles);
      } else if (query.length > 2 && categoryId == undefined) {
         filteredArticles = data.filter((article) => {
            return (
               article.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
               article.excerpt.toLowerCase().indexOf(query.toLowerCase()) !== -1 && !deletedArticles.includes(article)
            );
         });

         setArticles(filteredArticles);
      } else if (categoryId != undefined) {
         filteredArticles = data.filter((article) => {
            return article.post_category_id == categoryId && !deletedArticles.includes(article);
         });

         setArticles(filteredArticles);
      } else {
         filteredArticles = data.filter((article) => {
            return !deletedArticles.includes(article);
         });

         setArticles(filteredArticles);
      }
   };

   const removeArticle = (slug) => {
      let updatedArticles;
      let deletedArticle;

      updatedArticles = articles.filter((article) => article.slug !== slug);
      deletedArticle = data.filter((article) => article.slug == slug);

      setDeletedArticles(prevState => [...prevState, ...deletedArticle]);
      console.log(deletedArticles)
      setArticles(updatedArticles);
   };

   const filterCategories = (catId) => {
      let filteredCategories;
      if (catId != undefined) {
         setCategoryId(catId);
         filteredCategories = data.filter((article) => {
            return article.post_category_id == catId;
         });
      } else {
         filterCategories = data;
      }
      setArticles(filteredCategories);
   };

   const handleRefetch = () => {
      refetch();
      setCategoryId(undefined);
   };

   const uniqueIds = [];

   const uniqueCategories = () => {
      if (categories.length === 0) {
         data.filter((item) => {
            const isDuplicate = uniqueIds.includes(item.post_category_id);

            if (!isDuplicate) {
               uniqueIds.push(item.post_category_id);

               return true;
            }

            return false;
         });

         setCategories(uniqueIds);
      }

      setToggle((prevState) => !prevState);
   };

   const removeArticlesFromCategory = (id) => {
      let updatedCategories;
      let filterCategory;

      updatedCategories = articles.filter(
         (article) => article.post_category_id !== id
      );
      
      filterCategory = categories.filter((categoryId) => categoryId !== id);

      setArticles(updatedCategories);
      setCategories(filterCategory);
   };

   const showRefetch = articles?.length < 100;

   if (isLoading) {
      return <h1>Loading...</h1>;
   }

   if (isError) {
      return <h1>{error}</h1>;
   }

   return (
      <Layout>
         <Navigation
            categoryId={categoryId}
            filterCategories={filterCategories}
            refetch={handleRefetch}
         />
         <Input filterArticles={filterArticles} />

         {!categoryId && (
            <Toggle
               categories={categories}
               uniqueCategories={uniqueCategories}
               removeArticlesFromCategory={removeArticlesFromCategory}
               toggle={toggle}
            />
         )}

         <h3 className={classes["count-title"]}>
            Currently showing {articles.length} articles
         </h3>
         <div className={classes.articles}>
            {articles.map((article) => {
               const formatedDate = format(new Date(article.date), "P");
               const excerpt = article.excerpt.replace(/<(.|\n)*?>/g, "");
               return (
                  <SingleArticle
                     key={article.slug}
                     slug={article.slug}
                     image={article.post_image}
                     title={article.title}
                     date={formatedDate}
                     excerpt={excerpt}
                     removeArticle={() => removeArticle(article.slug)}
                  />
               );
            })}
         </div>
         {showRefetch && (
            <button
               type="button"
               className={classes["refetch-button"]}
               onClick={handleRefetch}
            >
               Refetch
            </button>
         )}
      </Layout>
   );
};

export default Articles;
