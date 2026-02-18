import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
  || path.join(__dirname, 'serviceAccountKey.json');

let adminAuth;
let adminDb;

try {
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  adminAuth = admin.auth();
  adminDb = admin.firestore();
} catch (err) {
  console.warn('Firebase Admin SDK not initialized:', err.message);
  console.warn('Admin features (user management, Firestore writes) will be unavailable.');
  console.warn('Place your serviceAccountKey.json in the server/ directory.');
  adminAuth = null;
  adminDb = null;
}

export { adminAuth, adminDb };
export default admin;
