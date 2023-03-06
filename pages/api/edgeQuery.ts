
import { NextRequest, NextResponse } from "next/server";
import { CreateChatCompletionRequest } from "openai/dist/api";
export const config = {
  runtime: "edge", // this is a pre-requisite
};

type ChatCompletionParams = CreateChatCompletionRequest & {
  model: "gpt-3.5-turbo" | "gpt-3.5-turbo-0301";
};
export default async function handler(
  req: NextRequest,
) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
           "Content-Type": "application/json",
          "Authorization": "Bearer " + process.env.OPEN_API_KEY,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "你假装elon musk, 接收用户的采访",
            },
            {
              role: "user",
              content: "你的终极目标是什么？ 你觉得什么时候能实现",
              name: "haodong",
            },
          ],
          stream: true,
        } as ChatCompletionParams),
      })

  return new Response(res.body)
}
