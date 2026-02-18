import 'dotenv/config';
import { adminDb } from '../firebaseAdmin.js';

const INITIAL_LGUS = ['Batangas', 'Laguna', 'Cavite', 'Quezon'];

async function seedLgus() {
  if (!adminDb) {
    console.error('Firestore not initialized. Check serviceAccountKey.json.');
    process.exit(1);
  }

  const existing = await adminDb.collection('lgus').get();
  if (!existing.empty) {
    console.log(`lgus collection already has ${existing.size} docs. Skipping seed.`);
    console.log('Existing LGUs:', existing.docs.map((d) => d.data().name).join(', '));
    process.exit(0);
  }

  const batch = adminDb.batch();
  for (const name of INITIAL_LGUS) {
    const ref = adminDb.collection('lgus').doc();
    batch.set(ref, {
      name,
      createdAt: new Date(),
      createdBy: 'seed-script',
    });
  }

  await batch.commit();
  console.log(`Seeded ${INITIAL_LGUS.length} LGUs:`, INITIAL_LGUS.join(', '));
  process.exit(0);
}

seedLgus().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
