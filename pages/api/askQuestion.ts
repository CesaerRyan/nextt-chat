// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { adminDb } from '@/firebaseAdmin'
import query from '@/lib/queryApi'
import { Message } from '@/typing'
import type { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'
type Data = {
    answer: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { prompt,
        chatId,
        model,
        session } = req.body

    if (!prompt || !chatId) {
        res.status(400).json({
            answer: '没有输入/没有开启一个新的聊天'
        })
        return;
    }
    // ChatGPT Query 

    const response = await query(prompt, chatId, model)
    console.log(response)
    const message: Message = {
        text: response || 'ChatGPT 无法回答',
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: 'ChatGPT',
            name: 'ChatGPT',
            avatar: 'https://links.papareact.com/89k'
        }
    }
    await adminDb.collection('users').get()

    const r = await adminDb.collection('users')
        .doc(session.user.email)
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add(message)
    console.log("🚀 ~ file: askQuestion.ts:49 ~ r", r)

    res.status(200).json({ answer: message.text })
}
