import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFeature } from '../../models/feature.model';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-card.html',
  styleUrl: './feature-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--mouse-x.px]': 'mouseX',
    '[style.--mouse-y.px]': 'mouseY'
  }
})
export class FeatureCardComponent {
  readonly feature = input.required<IFeature>();

  protected mouseX = 0;
  protected mouseY = 0;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
  }
}
