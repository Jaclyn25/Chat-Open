import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomButtonComponent } from '../shared/custom-button/custom-button';
import { ChatPreviewComponent } from '../chat-preview/chat-preview';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink, CustomButtonComponent, ChatPreviewComponent],
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
