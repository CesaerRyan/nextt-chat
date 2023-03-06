import openai from "./chatgpt";


const query = async (prompt: string, chatId: string, model: string) => {

    if (model.includes('gpt-3.5') ){
        return openai.createChatCompletion({
            messages:[
                {
                    content: prompt,
                    role:'user',
                    name:'you'

                }
            ],model,
            temperature: 0.9,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        }).then(res => {
            
            return res.data.choices[0].message?.content
        }).catch(err => {
            console.error(err);
           console.log(`ChatGPT 无法继续chat，错误信息${err}`)
        
        })
    }
    else{
        return openai.createCompletion({
            model,
            prompt,
            temperature: 0.9,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        
        }).then(res => {
            return res.data.choices[0].text
        }).catch(err => {
            console.error(err);
           console.log(`ChatGPT 无法获得答案，错误信息${err}`)
        
        })
    }


   
   
}

const stream =  async (prompt: string, chatId: string, model: string) =>{
    console.log('strem')
    if (model.includes('gpt-3.5') ){
        return openai.createChatCompletion({
            messages:[
                {
                    content: prompt,
                    role:'user',
                    name:'you'

                }
            ],model,
            temperature: 0.9,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        }).then(res => {

            
            return res.data.choices[0].message?.content
        }).catch(err => {
            console.error(err);
           console.log(`ChatGPT 无法继续chat，错误信息${err}`)
        
        })
    }
}

export  {query,stream};