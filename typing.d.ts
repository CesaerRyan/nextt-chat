
import firestore from 'firebase/firestore'

type Message = {
    text: string,
    createdAt: firestore.FieldValue
    user: {
        _id: string;
        name: string;
        avatar: string
    }
}