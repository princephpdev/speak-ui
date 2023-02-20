import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 * https://platform.openai.com/docs/api-reference/images/create?lang=node.js
 * @size 256x256, 512x512, 1024x1024
 * @n between 1 to 10
 * @prompt The maximum length is 1000 characters.
 * @param _req
 * @param res
 */
const generateImageHandler = async (
  _req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { imageDescription } = _req?.body;
  console.log("api", imageDescription);
  try {
    const createImageReq = {
      prompt: imageDescription ?? "A cute baby sea otter",
      n: 2,
    };
    const response = await openai.createImage({
      ...createImageReq,
      size: "512x512",
      response_format: "b64_json",
    });
    res.status(200).send(response?.data);
  } catch (error) {
    console.log(error);
    res.status(503).json(error);
  }
};

export default generateImageHandler;
