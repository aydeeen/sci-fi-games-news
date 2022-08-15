import { Fragment } from "react";
import Head from 'next/head'

import ArticlesApi from "../api/articlesApi";

import Articles from "../components/articles/Articles";

const Home = ({articles}) => {
   return (
      <Fragment>
         <Head>
            <title>Sci-Fi Games News</title>
            <meta name="description" content="Search for all latest news about sci-fi articles." />
         </Head>
         <Articles articlesData={articles} />
      </Fragment>
   );
};

export async function getServerSideProps() {
   const articles = await ArticlesApi.last100News()
   return { props: { articles } }
 }

export default Home;
