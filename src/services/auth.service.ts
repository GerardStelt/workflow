import firebase from 'firebase/app';
import { auth, uiStart, firestore } from '../firebase';
import { Observable } from '../helpers/utils';

export class AuthController {
    public user$: Observable<firebase.User>;

    constructor() {
        this.user$ = new Observable(observer => {
            auth.onAuthStateChanged(user => {
                console.log('User', user);

                observer.next(user);
                if (!user) return;

                const userRef = firestore.doc(`users/${user.uid}`);
                userRef.set({
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    photoURL: user.photoURL,
                    role: ['admin'],
                    lastLoginAt: user.metadata.lastSignInTime,
                    createdAt: user.metadata.creationTime,
                }, { merge: true });
            })
        });
    }

    public async signin(isRedirect?: boolean) {
        uiStart(isRedirect);
    }

    public async signout() {
        return auth.signOut();
    }

    public async signInAnonymously() {
        return await auth.signInAnonymously();
    }

}

export const AuthService = new AuthController();