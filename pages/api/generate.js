import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY }));

export default async function generatorApi(req, res) {

  const image = await openai.createImage({
    prompt: req.body.description,
    n: 4,
    size: "1024x1024",
  });

  // res.status(200).json({
  //   result: [
  //     image.data.data[0].url,
  //     image.data.data[1].url,
  //     image.data.data[2].url,
  //     image.data.data[3].url
  //   ]
  // });

  res.status(200).json({
    result: [process.env.REACT_APP_OPENAI_API_KEY]
  });
}
