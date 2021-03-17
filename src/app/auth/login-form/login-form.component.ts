import {Component, Optional} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../auth.service';
import {LoggerService} from '../../core/logging/logger.service';
import {Logger} from '../../core/logging/logger';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  public hidePassword = true;
  public form = this._fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]]
  });
  private _logger: Logger;

  constructor(private _fb: FormBuilder,
              private _userService: AuthService,
              loggerService: LoggerService,
              @Optional() public dialogRef?: MatDialogRef<LoginFormComponent>) {
    this._logger = loggerService.getLogger('Login');
  }

  public login(): void {
    if (this.form.valid) {
      this._userService.login(this.form.value.email, this.form.value.password).subscribe(result => {
        this.dialogRef?.close?.(result);
      }, (error: unknown) => this._logger.error('Login error', error as Error));
    }
  }

  public close(): void {
    this.dialogRef?.close?.(false);
  }
}
