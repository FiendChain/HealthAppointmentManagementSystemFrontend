import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { fadeAnimation, slideAnimation } from '../router-animations/animations';
import { AuthService } from '../api/auth.service';
import { AppBrowserPanel } from './app-browser-panel.component';

@Component({
  selector: 'app-browser',
  templateUrl: './app-browser.component.html',
  styleUrls: ['./app-browser.component.css'],
  animations: [fadeAnimation, slideAnimation],
})
export class AppBrowserComponent extends AppBrowserPanel implements OnInit {
	constructor(
		private router: Router,
		auth: AuthService,
	) { 
		super(auth);
	}

	get default_route(): string {
		return this.auth.default_route;
	}

	get navbar_background(): string {
		if (!this.current_user) {
			return 'bg-blue-gradient';
		}
		switch (this.current_user.type) {
		case 'admin':
			return 'bg-red-gradient';
		case 'patient':
			return 'bg-blue-gradient';
		case 'provider':
			return 'bg-green-gradient';
		default:
			return 'bg-blue-gradient';
		}
	}

	ngOnInit(): void {
		this.auth.attempt_login();
	}

	getAnimationName(outlet: RouterOutlet): any {
		return outlet.isActivated ? outlet.activatedRouteData.state : '';
	}

	logout(): void {
		this.auth.logout().then(() => {
			this.router.navigateByUrl('/login');
		});
	}


}
