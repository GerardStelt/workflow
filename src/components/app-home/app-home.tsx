import { Component, h, Prop } from '@stencil/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

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
            <ion-button onClick={() => AuthService.logout()}>
              <ion-icon name="log-out-outline"></ion-icon>
            </ion-button>
            <ion-button onClick={() => AuthService.login()}>
              <ion-icon slot="icon-only" name="log-in-outline"></ion-icon>
            </ion-button>
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
      </ion-content>
    ];
  }
}
