import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyCdxNSVj_fhY5Irej7pGgBmbiLzwqLVSUk",
//   authDomain: "registration-form-694e2.firebaseapp.com",
//   databaseURL: "https://registration-form-694e2-default-rtdb.firebaseio.com",
//   projectId: "registration-form-694e2",
//   storageBucket: "registration-form-694e2.appspot.com",
//   messagingSenderId: "521258671770",
//   appId: "1:521258671770:web:8ce8a68ec814e839c50923",
//   measurementId: "G-K1BV1144XJ"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDv0ncO0PB-JR3MmbkdFxgM6lmHb-RMqwQ",
  authDomain: "test-bb96e.firebaseapp.com",
  databaseURL: "https://test-bb96e-default-rtdb.firebaseio.com",
  projectId: "test-bb96e",
  storageBucket: "test-bb96e.appspot.com",
  messagingSenderId: "556092554094",
  appId: "1:556092554094:web:a1940251c88895e0909f7f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;