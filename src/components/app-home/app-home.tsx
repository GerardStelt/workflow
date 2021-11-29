import { Component, h, Prop } from '@stencil/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

import { firestore } from '../../firebase';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {

  @Prop() user: User;

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="primary">
            {this.user && <ion-button onClick={() => AuthService.signout()}>
              Signout
              <ion-icon slot="end" name="log-out-outline"></ion-icon>
            </ion-button>}
            {!this.user && <ion-button onClick={() => AuthService.signInAnonymously().then(data => console.log('data', data))}>
              Signin
              <ion-icon slot="end" name="log-in-outline"></ion-icon>
            </ion-button>}
          </ion-buttons>
          {this.user &&
            <ion-avatar slot="primary"><ion-img src={this.user.photoURL}></ion-img></ion-avatar>
          }
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <p>
          Welcome to the PWA Toolkit. You can use this starter to build entire apps with web components using Stencil and ionic/core! Check out the README for everything that comes
          in this starter out of the box and check out our docs on <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>

        <ion-button href="/profile/ionic" expand="block">
          Profile page
        </ion-button>

        <ion-button onClick={async () => {
          await firestore.collection('tickets').add({
            description: 'Hello again',
            labels: ['buggy', 'features']
          });
        }}>
          Store ticket
        </ion-button>
      </ion-content>
    ];
  }
}
