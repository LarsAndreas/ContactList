import { UserManager, User, UserManagerSettings } from 'oidc-client';

const config = useRuntimeConfig();

const settings: UserManagerSettings = {
    authority: config.authority,
    client_id: config.client_id,
    redirect_uri: config.redirect_uri,
    post_logout_redirect_uri: config.post_logout_redirect_uri,
    response_type: config.response_type,
    scope: config.scope,
    filterProtocolClaims: config.filterProtocolClaims,
    loadUserInfo: config.loadUserInfo,
    automaticSilentRenew: true,
    silent_redirect_uri: config.silent_redirect_uri,
};

export class AuthService {

    userManager: UserManager;
  
    constructor() {
      this.userManager = new UserManager(settings);
    }
  
    public getUser(): Promise<User | null> {
      return this.userManager.getUser();
    }
  
    public login(): Promise<void> {
      return this.userManager.signinRedirect();
    }
  
    public renewToken(): Promise<User> {
      return this.userManager.signinSilent();
    }
  
    public logout(): Promise<void> {
      return this.userManager.signoutRedirect();
    }
  }
   