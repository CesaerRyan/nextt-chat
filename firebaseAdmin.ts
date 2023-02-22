import admin from 'firebase-admin'
import { getApps } from 'firebase-admin/app'
import { HttpsProxyAgent } from 'https-proxy-agent';
const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
)
const agent = new HttpsProxyAgent('http://127.0.0.1:10809');
if (!getApps().length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        httpAgent: agent
    })
}

const adminDb = admin.firestore();

export { adminDb }