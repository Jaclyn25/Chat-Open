import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [type]="type()" 
      [class]="'custom-btn custom-btn--' + variant() + ' ' + (fullWidth() ? 'custom-btn--full' : '')"
      [disabled]="disabled() || isLoading()"
      (click)="clicked.emit()">
      @if (isLoading()) {
        <div class="custom-btn__spinner"></div>
      } @else {
        <span class="custom-btn__content"><ng-content></ng-content></span>
      }
    </button>
  `,
  styleUrl: './custom-button.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomButtonComponent {
  readonly variant = input<'primary' | 'secondary' | 'outline' | 'ghost'>('primary');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly isLoading = input(false);
  readonly disabled = input(false);
  readonly fullWidth = input(false);

  readonly clicked = output<void>();
}
