import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPricingPlan } from '../../models/pricing-plan.model';

@Component({
  selector: 'app-pricing-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing-card.html',
  styleUrl: './pricing-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingCardComponent {
  readonly plan = input.required<IPricingPlan>();
  readonly billingCycle = input.required<'monthly' | 'yearly'>();

  readonly ctaClicked = output<string>();

  readonly currentPrice = computed(() =>
    this.billingCycle() === 'monthly' ? this.plan().monthlyPrice : this.plan().yearlyPrice
  );

  onCtaClick(): void {
    this.ctaClicked.emit(this.plan().name);
  }
}
