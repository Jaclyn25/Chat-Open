import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../../components/navbar/navbar';

import { InputGroupComponent } from '../../components/shared/input-group/input-group';
import { CustomButtonComponent } from '../../components/shared/custom-button/custom-button';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, InputGroupComponent, CustomButtonComponent],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  readonly user = this.authService.currentUser;
  
  readonly profileForm: FormGroup;

  constructor() {
    const u = this.user();
    this.profileForm = this.fb.group({
      name: [u?.name || ''],
      email: [{ value: u?.email || '', disabled: true }]
    });
  }

  saveProfile(): void {
    // Mock save
    console.log('Saved profile', this.profileForm.value);
  }

  logout(): void {
    this.authService.logout();
  }
}
