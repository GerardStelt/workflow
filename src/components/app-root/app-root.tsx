import { Component, h, State } from '@stencil/core';
import { AuthService } from '../../services/auth.service';
import firebase from 'firebase/app';

@Component({
	tag: 'app-root',
	styleUrl: 'app-root.css',
})
export class AppRoot {

	@State() user: firebase.User;

	connectedCallback() {
		AuthService.user$.subscribe({
			next: (user: firebase.User) => this.user = user
		});
		AuthService.finishLogin();
	}

	render() {
		return (
			<ion-app>
				<ion-router useHash={false}>
					<ion-route url="/" component="app-home" componentProps={{ user: this.user }} />
					<ion-route url="/profile/:name" component="app-profile" componentProps={{ user: this.user }} beforeEnter={() => !!this.user} />

					{/* redirects / guards */}
					{/* {!this.user && <ion-route-redirect from="/profile/*" to="/" />} */}
					{/* <ion-route url="/profile/:name" component="app-profile" componentProps={{user: this.user}}/> */}
				</ion-router>
				<ion-nav />
			</ion-app>
		);
	}

}