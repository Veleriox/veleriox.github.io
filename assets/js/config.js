/* ================================================
   FIREBASE CONFIGURATION (Compat Version)
   
   Replace the following values with your Firebase project credentials.
   
   Instructions:
   1. Go to Firebase Console (https://console.firebase.google.com/)
   2. Create a new project for your agency
   3. Enable Firestore Database
   4. Copy your config values below
   5. Set security rules as specified in deployment guide
   ================================================ */

const firebaseConfig = {
    apiKey: "AIzaSyBcPN1fzpqbLkIDjwW8UELoNt8akGhl_w8",
    authDomain: "veleriox-productions.firebaseapp.com",
    projectId: "veleriox-productions",
    storageBucket: "veleriox-productions.firebasestorage.app",
    messagingSenderId: "1032776814312",
    appId: "1:1032776814312:web:4c9a00defbc1afbc34c35d"
};

// Initialize Firebase (with error handling)
try {
    firebase.initializeApp(firebaseConfig);
    window.db = firebase.firestore();
    console.log('✓ Firebase & Firestore initialized');
    
    // Enable persistence
    firebase.firestore().enablePersistence()
        .then(() => console.log('✓ Offline persistence enabled'))
        .catch((err) => {
            if (err.code == 'failed-precondition') {
                console.log('⚠ Multiple tabs: Persistence limited');
            } else if (err.code == 'unimplemented') {
                console.log('⚠ Persistence not supported');
            }
        });
} catch (error) {
    console.error('❌ Firebase initialization failed:', error.message);
}
