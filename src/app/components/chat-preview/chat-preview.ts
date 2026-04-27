import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPreviewService } from '../../services/chat-preview.service';

@Component({
  selector: 'app-chat-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-preview.html',
  styleUrl: './chat-preview.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatPreviewComponent implements OnInit {
  private readonly chatService = inject(ChatPreviewService);

  readonly messages = this.chatService.messages;
  readonly isTyping = this.chatService.isTyping;
  readonly hasMessages = this.chatService.hasMessages;

  ngOnInit(): void {
    this.chatService.startConversation();
  }
}
