import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar';
import { CustomButtonComponent } from '../../components/shared/custom-button/custom-button';
import { ChatPreviewService } from '../../services/chat-preview.service';
import { IChatMessage } from '../../models/chat-message.model';

@Component({
  selector: 'app-playground-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './playground-page.html',
  styleUrl: './playground-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatPreviewService] // Local instance of the service for this specific chat
})
export class PlaygroundPageComponent implements AfterViewChecked {
  private readonly chatService = inject(ChatPreviewService);
  
  readonly messages = this.chatService.messages;
  readonly isTyping = this.chatService.isTyping;
  
  userInput = signal('');

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      try {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      } catch(err) { }
    }
  }

  sendMessage(): void {
    const text = this.userInput().trim();
    if (!text) return;

    this.chatService.addUserMessage(text);
    this.userInput.set('');
    
    // Simulate AI response stream
    this.chatService.simulateResponseStream("Here is the simulated AI response based on our neural core contextual memory. Notice how the typewriter effect mimics real token streams and how the formatting remains perfect.");
  }
}
