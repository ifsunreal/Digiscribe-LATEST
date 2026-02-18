// One-time migration script to convert legacy { admin: true } claims
// to the new { role, lgu } format.
//
// Usage: node server/scripts/migrateRoles.js

import 'dotenv/config';
import { adminAuth } from '../firebaseAdmin.js';

async function migrate() {
  console.log('Starting role migration...');

  const listResult = await adminAuth.listUsers(1000);
  let migrated = 0;

  for (const user of listResult.users) {
    const claims = user.customClaims || {};

    // Skip users already migrated
    if (claims.role) {
      console.log(`  [skip] ${user.email} — already has role: ${claims.role}`);
      continue;
    }

    const newRole = claims.admin ? 'superAdmin' : 'user';
    await adminAuth.setCustomUserClaims(user.uid, { role: newRole, lgu: null });
    console.log(`  [migrated] ${user.email} — ${claims.admin ? 'admin' : 'user'} → ${newRole}`);
    migrated++;
  }

  console.log(`\nMigration complete. ${migrated} user(s) updated out of ${listResult.users.length} total.`);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
