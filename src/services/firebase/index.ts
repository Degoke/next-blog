// Import the functions you need from the SDKs you need
import { FetchPostsParams, Post, UncreatedPost, UpdatePostParams } from "@/library/types";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, deleteDoc, addDoc, where, getDoc, doc, updateDoc, getCountFromServer, query, orderBy, startAfter, limit } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqnJXgAFukhd7zc2Jj3qX0QLT4hnhZ7P8",
  authDomain: "next-blog-dfe94.firebaseapp.com",
  projectId: "next-blog-dfe94",
  storageBucket: "next-blog-dfe94.appspot.com",
  messagingSenderId: "964496125677",
  appId: "1:964496125677:web:de249b4ac61dadeecb26e4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const fetchBlogPosts = async (params: FetchPostsParams): Promise<Post[]> => {
    
       const  docsQuery = query(collection(db, "blogPosts"), orderBy("createdTimestamp"));
    const snapshot = await getDocs(docsQuery)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Post[];
  };

  export const countBlogPosts = async (): Promise<number> => {
    const snapshot = await getCountFromServer(collection(db, "blogPosts"));
    return snapshot.data().count
  };

  export const fetchBlogPost = async (postId: string): Promise<Post | null> => {
    const snapshot = await getDoc(doc(db, "blogPosts", postId));
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data()} as Post : null
  };

  export const createBlogPost = async (post: UncreatedPost) => {
        const docRef = await addDoc(collection(db, "blogPosts"), post);
        return { id: docRef.id }
  }

  export const updateBlogPost = async (params: UpdatePostParams) => {
    const { postId, post } = params
        await updateDoc(doc(db, "blogPosts", postId), post)
        console.log("Document written with ID: ");
  }

  export const deleteBlogPost = async (postId: string) => {
        await deleteDoc(doc(db, "blogPosts", postId))
        console.log("Document written with ID: ");
  };
