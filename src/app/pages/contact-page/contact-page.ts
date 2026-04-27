import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar';
import { FaqComponent } from '../../components/faq/faq';
import { CustomButtonComponent } from '../../components/shared/custom-button/custom-button';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FaqComponent, CustomButtonComponent],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPageComponent {
  private fb = new FormBuilder();

  contactForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  isSubmitting = signal(false);
  submitSuccess = signal(false);

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitSuccess.set(true);
      this.contactForm.reset();
      
      setTimeout(() => this.submitSuccess.set(false), 5000);
    }, 1500);
  }
}
