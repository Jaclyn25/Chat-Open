import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="skeleton-loader" 
      [style.width]="width()" 
      [style.height]="height()" 
      [class.skeleton-circle]="circle()">
    </div>
  `,
  styleUrl: './skeleton-loader.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonLoaderComponent {
  readonly width = input<string>('100%');
  readonly height = input<string>('1rem');
  readonly circle = input<boolean>(false);
}
