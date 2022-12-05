import axios from "axios";
export const getImage = async (url: string) => {
  const image = await axios.get(url, {
    responseType: "arraybuffer",
  });
  const returnedB64 = Buffer.from(image.data).toString("base64");
  return returnedB64;
};
