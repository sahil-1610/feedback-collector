import * as admin from "firebase-admin";

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};

// Validate required Firebase configuration
const requiredEnvVars = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_PRIVATE_KEY",
  "FIREBASE_CLIENT_EMAIL",
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required Firebase configuration: ${envVar}`);
  }
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  } catch (error: any) {
    console.error("Firebase admin initialization error:", {
      message: error.message,
      code: error.code,
      details: error.details,
    });
    throw new Error("Failed to initialize Firebase Admin");
  }
}

export const db = admin.firestore();

// Helper function to check if Firestore is accessible
export async function checkFirestoreConnection() {
  try {
    await db.collection("test").doc("test").get();
    return true;
  } catch (error: any) {
    if (error.code === 7) {
      throw new Error(
        "Firestore API is not enabled. Please enable it in the Google Cloud Console."
      );
    }
    throw error;
  }
}
