import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

/**
 * Firebase Client Configuration
 * Hỗ trợ cả Next.js (process.env.NEXT_PUBLIC_*) và Vite (import.meta.env.VITE_*)
 */
const firebaseConfig = {
  apiKey:
    (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_FIREBASE_API_KEY) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_API_KEY) ||
    'AIzaSyDemoKeyMockForDevEnv12345',
  authDomain:
    (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN) ||
    'mona-beauty-blendz.firebaseapp.com',
  projectId:
    (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_PROJECT_ID) ||
    'mona-beauty-blendz',
  storageBucket:
    (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET) ||
    'mona-beauty-blendz.appspot.com',
  messagingSenderId:
    (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID) ||
    '767746387500',
  appId:
    (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_FIREBASE_APP_ID) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_APP_ID) ||
    '1:767746387500:web:8899aabbccddeeff',
};

// Khởi tạo Firebase App (Singletone Pattern tránh re-initialize)
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Kiểm tra xem cấu hình Firebase thực tế đã được cung cấp chưa
export const isFirebaseConfigured = (): boolean => {
  const key =
    (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_FIREBASE_API_KEY) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_API_KEY);
  return Boolean(key && key !== 'AIzaSyDemoKeyMockForDevEnv12345');
};

/**
 * Phân loại các loại thao tác Firestore
 */
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  };
}

/**
 * Standard Firestore Error Handler chuẩn hóa
 */
export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
    },
    operationType,
    path,
  };

  console.error('[Firebase Error Handler]:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
