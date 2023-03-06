import openai from "@/lib/chatgpt";
import { NextApiRequest, NextApiResponse } from "next";

type Options = {
  value: string;
  label: string;
};

type Data = {
  modelOptions: Options[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const models = await openai.listModels().then((res) => res.data.data);
  const modelOptions = models.map((model) => ({
    value: model.id,
    label: model.id,
  }));

  res.status(200).json({
    modelOptions,
  });
}
