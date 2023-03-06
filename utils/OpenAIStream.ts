import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
  } from "eventsource-parser"
import { CreateChatCompletionRequest } from "openai/dist/api";
  
// import fetch from 'node-fetch'


  type ChatCompletionParams = CreateChatCompletionRequest & {
    model: "gpt-3.5-turbo" | "gpt-3.5-turbo-0301";
  };


  
  export async function OpenAIStream() {
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()
    let counter = 0
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
              content: "你的终极目标是什么？",
              name: "haodong",
            },
          ],
          stream: true,
        } as ChatCompletionParams),
      })
    
  
    const stream = new ReadableStream({
       start: async (controller)=> {
        // callback
        function onParse(event: ParsedEvent | ReconnectInterval) {
          
          if (event.type === "event") {
          
            const data = event.data
            // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
            if (data === "[DONE]") {
              controller.close()
              return
            }
            try {
              const json = JSON.parse(data)
              const text = json.choices[0].delta?.content || "";
              if (counter < 2 && (text.match(/\n/) || []).length) {
                // this is a prefix character (i.e., "\n\n"), do nothing
                return
              }
              const queue = encoder.encode(text)
              controller.enqueue(queue)
              counter++
            } catch (e) {
              // maybe parse error
              controller.error(e)
            }
          }
        }
  
        // stream response (SSE) from OpenAI may be fragmented into multiple chunks
        // this ensures we properly read chunks and invoke an event for each SSE event stream
        const parser = createParser(onParse)
        // https://web.dev/streams/#asynchronous-iteration
        for await (const chunk of res.body as any) {
          parser.feed(decoder.decode(chunk))
        }
      },
    })



   
  
    return res.body
  }