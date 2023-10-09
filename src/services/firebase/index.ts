// Import the functions you need from the SDKs you need
import {
  Post,
  UncreatedPost,
  UpdatePostParams,
} from "@/library/types";
import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  deleteDoc,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const fetchBlogPosts = async (): Promise<Post[]> => {
  const docsQuery = query(
    collection(db, "blogPosts"),
    orderBy("createdTimestamp", "desc")
  );
  const snapshot = await getDocs(docsQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Post[];
};

export const fetchBlogPost = async (postId: string): Promise<Post | null> => {
  const snapshot = await getDoc(doc(db, "blogPosts", postId));
  return snapshot.exists()
    ? ({ id: snapshot.id, ...snapshot.data() } as Post)
    : null;
};

export const createBlogPost = async (post: UncreatedPost) => {
  const docRef = await addDoc(collection(db, "blogPosts"), post);
  return { id: docRef.id };
};

export const updateBlogPost = async (params: UpdatePostParams) => {
  const { postId, post } = params;
  await updateDoc(doc(db, "blogPosts", postId), post);
  console.log("Document written with ID: ");
};

export const deleteBlogPost = async (postId: string) => {
  await deleteDoc(doc(db, "blogPosts", postId));
  console.log("Document written with ID: ");
};
