import { Component, input, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="input-group" [class.has-error]="error() && touched">
      <label class="input-label" [for]="id()">
        <span class="label-text">{{ label() }}</span>
        @if (required()) {
          <span class="req-star">*</span>
        }
      </label>
      
      <div class="input-wrapper">
        <ng-content select="[left-icon]"></ng-content>
        <input 
          [id]="id()"
          [type]="type()"
          [placeholder]="placeholder()"
          [disabled]="disabled"
          [value]="value"
          (input)="onInput($event)"
          (blur)="onBlur()"
          class="custom-input" />
        <ng-content select="[right-icon]"></ng-content>
      </div>

      @if (error() && touched) {
        <div class="error-msg">{{ errorMessage() }}</div>
      }
    </div>
  `,
  styleUrl: './input-group.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputGroupComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputGroupComponent implements ControlValueAccessor {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly type = input<'text' | 'email' | 'password' | 'number'>('text');
  readonly placeholder = input<string>('');
  readonly required = input<boolean>(false);
  
  readonly error = input<boolean>(false);
  readonly errorMessage = input<string>('Invalid field');

  value: string = '';
  disabled: boolean = false;
  touched: boolean = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.touched = true;
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
