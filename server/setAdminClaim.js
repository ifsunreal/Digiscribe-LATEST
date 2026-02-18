import 'dotenv/config';
import { adminAuth } from './firebaseAdmin.js';

const ADMIN_EMAIL = 'admin@dtc.com';

async function setAdminClaim() {
  if (!adminAuth) {
    console.error('Firebase Admin SDK not initialized. Check your serviceAccountKey.json.');
    process.exit(1);
  }

  try {
    const user = await adminAuth.getUserByEmail(ADMIN_EMAIL);
    await adminAuth.setCustomUserClaims(user.uid, { admin: true });
    console.log(`Admin claim set for ${ADMIN_EMAIL} (uid: ${user.uid})`);
    console.log('The user must log out and log back in for the claim to take effect.');
  } catch (err) {
    console.error('Failed to set admin claim:', err.message);
    process.exit(1);
  }
}

setAdminClaim();
