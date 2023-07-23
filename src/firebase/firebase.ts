import { initializeApp, FirebaseApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'


// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAVz9Eyg5A78V8suGc4EsJhJKjKk7GW1eA',
  authDomain: 'materio-authentication.firebaseapp.com',
  projectId: 'materio-authentication',
  storageBucket: 'materio-authentication.appspot.com',
  messagingSenderId: '904667559579',
  appId: '1:904667559579:web:bd6031a49cbde5f533f83e',
  measurementId: 'G-KEECYCY60L'
}

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app
