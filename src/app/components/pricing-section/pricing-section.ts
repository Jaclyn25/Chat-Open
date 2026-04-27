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
import { ContentService } from '../../services/content.service';
import { PricingCardComponent } from '../pricing-card/pricing-card';

@Component({
  selector: 'app-pricing-section',
  standalone: true,
  imports: [CommonModule, PricingCardComponent],
  templateUrl: './pricing-section.html',
  styleUrl: './pricing-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingSectionComponent implements OnInit, OnDestroy {
  private readonly content = inject(ContentService);
  
  readonly plans = this.content.plans;
  readonly billingCycle = signal<'monthly' | 'yearly'>('monthly');

  @ViewChildren('revealBlock') revealBlocks!: QueryList<ElementRef<HTMLElement>>;
  private observer?: IntersectionObserver;

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

  setBillingCycle(cycle: 'monthly' | 'yearly'): void {
    this.billingCycle.set(cycle);
  }

  handleCtaClick(planName: string): void {
    if (typeof document !== 'undefined') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
