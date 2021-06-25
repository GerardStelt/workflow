import { Component, Prop, State, h } from '@stencil/core';
import { sayHello } from '../../helpers/utils';
import { AuthService } from '../../services/auth.service';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
})
export class AppProfile {
  @State() state = false;
  @Prop() name: string;
  @Prop() user: any;

  formattedName(): string {
    if (this.name) {
      return this.name.substr(0, 1).toUpperCase() + this.name.substr(1).toLowerCase();
    }
    return '';
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
            <ion-button onClick={() => AuthService.signin()}>
              <ion-icon slot="icon-only" name="log-in-outline"></ion-icon>
            </ion-button>
          </ion-buttons>
          {this.user &&
            <ion-avatar slot="primary"><ion-img src={this.user.photoURL}></ion-img></ion-avatar>
          }
          <ion-title>Profile: {this.name}</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <p>
          {sayHello()}! My name is {this.formattedName()}. My name was passed in through a route param!
        </p>

        <ion-item>
          <ion-label>Setting ({this.state.toString()})</ion-label>
          <ion-toggle checked={this.state} onIonChange={ev => (this.state = ev.detail.checked)} />
        </ion-item>
      </ion-content>,
    ];
  }
}
