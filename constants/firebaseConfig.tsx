import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDUCJrQ9R9zzmgHoI6nBkS77cUW7sIdl_k",
  authDomain: "e-laboratory-3207e.firebaseapp.com",
  projectId: "e-laboratory-3207e",
  storageBucket: "e-laboratory-3207e.appspot.com",
  messagingSenderId: "878950174896",
  appId: "1:878950174896:android:1f685d12c00b269cdfab75",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth,app };
