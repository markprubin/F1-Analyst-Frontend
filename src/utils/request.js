import axios from "axios";
import { writeToCache, readFromCache } from "./cache";

const getFreshData = async (url, cacheResponse = false) => {
  const { data } = await axios.get(url);
  cacheResponse && writeToCache(url, data);
  return data;
};

const getCachedData = (url) => readFromCache(url);

export { getCachedData, getFreshData };
