import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { FeatureCardComponent } from '../feature-card/feature-card';
import { BentoAdvancedComponent } from '../bento-advanced/bento-advanced';

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [CommonModule, FeatureCardComponent, BentoAdvancedComponent],
  templateUrl: './features-section.html',
  styleUrl: './features-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturesSectionComponent implements OnInit, OnDestroy {
  private readonly content = inject(ContentService);
  
  readonly basicFeatures = this.content.features;
  readonly advancedFeatures = this.content.bentoFeatures;

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
}
