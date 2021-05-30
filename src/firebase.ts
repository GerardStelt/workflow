/**
 * https://firebaseopensource.com/projects/firebase/firebaseui-web/
 */

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

// FirebaseUI
import * as firebaseui from 'firebaseui';

// Initialize Firebase
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB2CvdCn0Lrccv8Gm6cxv_jJ4xSJ-B0ATQ",
    authDomain: "workflow-78c21.firebaseapp.com",
    databaseURL: "https://workflow-78c21-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "workflow-78c21",
    storageBucket: "workflow-78c21.appspot.com",
    messagingSenderId: "237224009233",
    appId: "1:237224009233:web:7c29200ab48de3527c9bb0",
    measurementId: "G-0G2Y2KY619"   // For Firebase JS SDK v7.20.0 and later, this is optional
});

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
export const storage = firebaseApp.storage();
export const functions = firebaseApp.functions('europe-west1');


/**
 * https://github.com/firebase/firebaseui-web/blob/master/README.md
 */

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Specify the FirebaseUI configuration (providers supported and UI customizations as well as success callbacks, etc).
const uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return false;   // do not redirect
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // signInFlow: 'popup',
    // signInSuccessUrl: '/',
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    // Other config options...
}

export const uiStart = (finish: boolean = false) => {
    // This is only relevant for single page apps or apps where the sign-in UI is rendered conditionally (e.g. button click)
    // When redirecting back from Identity Providers like Google and Facebook or email link sign-in, start() method needs to be called to finish the sign-in flow. 
    // If it requires a user interaction to start the initial sign-in process, you need to check if there is a pending redirect operation going on on page load to check 
    // whether start() needs to be called.
    // To check if there is a pending redirect operation to complete a sign-in attempt, check isPendingRedirect() before deciding whether to render FirebaseUI via start().
    if (finish && !ui.isPendingRedirect()) return;

    ui.start('#firebaseui-auth-container', uiConfig);
}