import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Developers Corner | Home Page';

  constructor(
    private auth: AuthService,
    public translate: TranslateService,
    private router: Router
  ) {
    translate.addLangs(['en', 'fr', 'es']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|fr|es/) ? browserLang : 'en');
  }

  logout() {
    this.auth.logout().subscribe(() => this.router.navigate(['/login']));
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
