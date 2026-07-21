import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const serviceAccountPath = join(__dirname, 'serviceAccountKey.json');

let serviceAccount;
try {
  serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));
  console.log('[Firebase] Service account key loaded successfully');
} catch (error) {
  console.error('[Firebase] Failed to load service account key:', error.message);
  process.exit(1);
}

try {
  if (getApps().length === 0) {
    initializeApp({ credential: cert(serviceAccount) });
    console.log('[Firebase] Firebase Admin SDK initialized successfully');
  }
} catch (error) {
  console.error('[Firebase] Failed to initialize Firebase:', error.message);
  process.exit(1);
}

export const db = getFirestore();