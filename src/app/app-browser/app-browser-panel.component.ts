import { AuthService } from "../api/auth.service";
import { User } from "../models/user.model";

export abstract class AppBrowserPanel {
    constructor(
        private _auth: AuthService,
    ) {}

    get auth(): AuthService {
        return this._auth;
    }

    get current_user(): User {
        return this.auth.current_user;
    }
}