import { Fragment } from "react";
import Head from 'next/head'
import Articles from "../components/articles/Articles";

const Home = () => {
   return (
      <Fragment>
         <Head>
            <title>Sci-Fi Games News</title>
            <meta name="description" content="Search for all latest news about sci-fi articles." />
         </Head>
         <Articles />
      </Fragment>
   );
};

export default Home;
