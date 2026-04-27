import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="spinner-container" [style.width]="size()" [style.height]="size()">
      <div class="spinner"></div>
    </div>
  `,
  styleUrl: './loading-spinner.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSpinnerComponent {
  readonly size = input<string>('2rem');
}
