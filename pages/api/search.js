import {createClient} from "pexels";

const client = createClient(String(process.env.API_KEY));
export default async function handler(req, res) {
  try {
    const images = await client.photos.search({
      query: req.query.search,
      page: Number(req.query.page),
      per_page: 12,
    });

    const customImages = images.photos.map((photo) => {
      return {
        id: photo.id,
        url: photo.src.medium,
        photographer: photo.photographer,
        width: photo.width,
        height: photo.height,
        photographer_url: photo.photographer_url,
      };
    });

    res.send(customImages);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
}
