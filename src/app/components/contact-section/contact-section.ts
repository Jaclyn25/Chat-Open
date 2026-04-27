import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  QueryList,
  signal,
  ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSectionComponent implements OnInit, OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  
  readonly contactForm: FormGroup;
  readonly formSubmitted = signal(false);

  @ViewChildren('revealBlock') revealBlocks!: QueryList<ElementRef<HTMLElement>>;
  private observer?: IntersectionObserver;

  constructor() {
    this.contactForm = this.formBuilder.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', [Validators.required, Validators.minLength(2)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            this.observer?.unobserve(entry.target);
          }
        }
      }, { threshold: 0.1 });
    }
  }

  ngAfterViewInit(): void {
    this.revealBlocks.forEach(b => this.observer?.observe(b.nativeElement));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  submitLead(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.formSubmitted.set(true);
    // In a real app, send data to an API here
    this.contactForm.reset();
  }
}
