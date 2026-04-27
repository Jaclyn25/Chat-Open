import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatPreviewComponent } from '../chat-preview/chat-preview';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ChatPreviewComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
  scrollTo(id: string): void {
    if (typeof document !== 'undefined') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
