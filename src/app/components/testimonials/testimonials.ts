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

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  private readonly content = inject(ContentService);
  readonly testimonials = this.content.testimonials;

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
