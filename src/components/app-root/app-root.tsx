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
		AuthService.signin(true);	// check for pending redirect
	}

	componentWillRender() {
		// delay render until AuthService finished to prevent route guards from redirecting
		return new Promise(resolve => {
			AuthService.user$.subscribe({
				next: (user: firebase.User) => resolve(this.user = user)
			});
		});
	}

	render() {
		return (
			<ion-app>
				<ion-router useHash={false}>
					<ion-route url="/" component="app-home" componentProps={{ user: this.user }} />
					{!this.user && <ion-route-redirect from="/profile/*" to="/" />}
					<ion-route url="/profile/:name" component="app-profile" componentProps={{ user: this.user }} />
				</ion-router>
				<ion-nav />
			</ion-app>
		);
	}

}