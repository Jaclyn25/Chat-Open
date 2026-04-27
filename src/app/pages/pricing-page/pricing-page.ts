import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar';

import { InputGroupComponent } from '../../components/shared/input-group/input-group';
import { CustomButtonComponent } from '../../components/shared/custom-button/custom-button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, InputGroupComponent, CustomButtonComponent],
  templateUrl: './pricing-page.html',
  styleUrl: './pricing-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingPageComponent {
  private readonly fb = inject(FormBuilder);
  
  readonly isProcessing = signal<boolean>(false);
  readonly isSuccess = signal<boolean>(false);
  
  readonly checkoutForm: FormGroup;

  constructor() {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      card: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(19)]],
      exp: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]],
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]]
    });
  }

  processPayment(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.isProcessing.set(true);

    // Mock API call to Stripe
    setTimeout(() => {
      this.isProcessing.set(false);
      this.isSuccess.set(true);
    }, 2000);
  }
}
