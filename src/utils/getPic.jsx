import axios from "axios";

export const getPic = async (url) => {
  try {
    const response = await axios.get(url, { responseType: "blob" });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error("Error fetching image:", error);
    return "";
  }
};
