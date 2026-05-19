import axios from "axios";

const API_KEY = "1a50d810c9554c82ada1cdcf5aa4a0b9";

export const getNews = async () => {
  try {
    const res = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=6&apiKey=${API_KEY}`
    );

    return res.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};