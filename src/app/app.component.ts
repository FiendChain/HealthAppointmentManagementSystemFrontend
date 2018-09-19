import { Component, OnInit } from '@angular/core';
import { ApiService } from './api/api.service';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { fadeAnimation, slideAnimation } from './router-animations/animations';
import { AuthService } from './api/auth.service';
import { CookieService } from 'angular2-cookie';
import { User } from './models/user.model';
import { AppBrowserPanel } from './app-browser/app-browser-panel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation, slideAnimation],
})
export class AppComponent extends AppBrowserPanel implements OnInit {
  	title = 'Health Appointment Management System';

  	constructor(
		private api: ApiService,
		private router: Router,
		private cookies: CookieService,
		private activatedRoute: ActivatedRoute,
		auth: AuthService,
	) { 
		super(auth);
  	}

  	ngOnInit(): void {
		// check if cookies exist first and set if not
		this.load_default_cookies();
		// check if logged in already
		this.auth.attempt_login();
  	}

  	private load_default_cookies(): void {
   		this.load_default_cookie('remember_me', String(false));
    	this.load_default_cookie('auto_login', String(false));
  	}

  	private load_default_cookie(key: string, value: string): void {
    	let current_value = this.cookies.get(key);
    	if (!current_value) {
      		this.cookies.put(key, value);
    	}
  	}

  	getAnimationName(outlet: RouterOutlet): any {
    	return outlet.isActivated ? outlet.activatedRouteData.state : '';
  	}


}
