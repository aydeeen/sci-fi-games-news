import axios from "../config/axios"

class ArticlesApi {
    static async last100News() {
        const data = await axios.get("/last-100-news.json");
       return data.data;
    }
}

export default ArticlesApi