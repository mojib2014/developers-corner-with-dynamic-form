import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormInputBase } from 'src/app/shared/components/dynamic-form/model/form-input-base';
import { FormTextbox } from 'src/app/shared/components/dynamic-form/model/form-textbox';

import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormInputBase<string | boolean>[] = [
    new FormTextbox({
      key: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'john.doe@domain.com',
      icon: '📨',
    }),

    new FormTextbox({
      key: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      placeholder: 'A#21%GM',
      minlength: 6,
      icon: '🔐',
    }),
  ];
  returnUrl!: string;
  sub!: Subscription;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private notifService: NotificationService
  ) {}

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(form: FormGroup) {
    this.sub = this.auth.login(form.value).subscribe({
      next: () => this.router.navigateByUrl(this.returnUrl),
      error: (err) => this.notifService.error('Error deleting a user', err),
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
