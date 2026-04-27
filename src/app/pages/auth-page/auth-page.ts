import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InputGroupComponent } from '../../components/shared/input-group/input-group';
import { CustomButtonComponent } from '../../components/shared/custom-button/custom-button';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputGroupComponent, CustomButtonComponent],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isLogin = signal<boolean>(true);
  readonly isLoading = signal<boolean>(false);
  readonly showPassword = signal<boolean>(false);

  readonly authForm: FormGroup;

  constructor() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  toggleMode(): void {
    this.isLogin.update(v => !v);
    this.authForm.reset();
  }

  toggleShowPassword(): void {
    this.showPassword.update(v => !v);
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    // Simulate API delay
    setTimeout(() => {
      const { email, password } = this.authForm.value;
      if (this.isLogin()) {
        const success = this.authService.login(email, password);
        if (success) {
          this.router.navigate(['/dashboard']);
        }
      } else {
        // Mock registration -> then login
        this.authService.login(email, password);
        this.router.navigate(['/dashboard']);
      }
      this.isLoading.set(false);
    }, 1500);
  }
}
