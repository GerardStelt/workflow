import firebase from 'firebase/app';
import { auth, uiStart } from '../firebase';
import { Observable } from '../helpers/utils';


export class AuthServiceController {
    public user$: Observable<firebase.User>;

    constructor() {
        this.user$ = new Observable(observer => {
            firebase.auth().onAuthStateChanged(user => observer.next(user))
        });
    }

    public async login() {
        uiStart();
    }

    public async finishLogin() {
        uiStart(true);
    }

    public async logout() {
        return auth.signOut();
    }

}

export const AuthService = new AuthServiceController();