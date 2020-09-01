// Firebase App (the core Firebase SDK) is always required and must be listed first
import app from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import { createContext } from 'react';

const config = {
	apiKey: "AIzaSyD8o_rkenSl31hh7l6WhbkhvG6eow9tf34",
	authDomain: "wishes-7bcb8.firebaseapp.com",
	databaseURL: "https://wishes-7bcb8.firebaseio.com",
	projectId: "wishes-7bcb8",
	storageBucket: "wishes-7bcb8.appspot.com",
	messagingSenderId: "742930506221",
	appId: "1:742930506221:web:81b17e869bf2ee5a21c7e4",
	// apiKey: process.env.API_KEY,
	// authDomain: process.env.AUTH_DOMAIN,
	// databaseURL: process.env.DATA_DATABASE_URL,
	// projectId: process.env.PROJECT_ID,
	// storageBucket: process.env.STORAGE_BUCKET,
	// messagingSenderId: process.env.MESSAGING_SENDER_ID,
	// appId: process.env.APP_ID,
};

export const FirebaseContext = createContext<any>(null);

const firebaseApp = app.initializeApp(config);

export const auth = firebaseApp.auth();
