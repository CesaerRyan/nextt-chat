import openai from "./chatgpt";


const query = async (prompt: string, chatId: string, model: string) => {
    const res = openai.createCompletion({
        model,
        prompt,
        temperature: 0.9,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    }).then(res => {
        console.log(res.data.choices)
        res.data.choices[0].text
    }).catch(err => `ChatGPT 无法获得答案，错误信息(${err.message})`)
    return res
}

export default query;