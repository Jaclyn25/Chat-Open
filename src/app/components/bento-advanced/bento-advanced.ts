import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import { IBentoFeature } from '../../models/feature.model';
import { CommonModule } from '@angular/common';
import { ChatPreviewComponent } from '../chat-preview/chat-preview';

@Component({
  selector: 'app-bento-advanced',
  standalone: true,
  imports: [CommonModule, ChatPreviewComponent],
  templateUrl: './bento-advanced.html',
  styleUrl: './bento-advanced.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BentoAdvancedComponent {
  readonly feature = input.required<IBentoFeature>();
}
