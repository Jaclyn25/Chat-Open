import { Injectable, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IChatMessage } from '../models/chat-message.model';

const SCRIPT: Array<{ sender: IChatMessage['sender']; text: string }> = [
  { sender: 'bot',  text: "Hi! I'm ChatOPni. How can I help your team today?" },
  { sender: 'user', text: 'Can you summarize our Q4 support tickets?' },
  { sender: 'bot',  text: "Of course! I found 1,247 tickets. Top themes: billing (34%), onboarding (28%), and API errors (19%). Want a full breakdown?" },
  { sender: 'user', text: 'Yes — and flag any critical ones.' },
  { sender: 'bot',  text: "Done. 3 critical tickets flagged and assigned to your team. I've also drafted replies for the top 20 billing issues. Review them?" }
];

const CHAR_DELAY   = 28;   // ms per character
const MSG_PAUSE    = 900;  // ms between messages
const TYPING_PAUSE = 800;  // ms to show typing indicator

@Injectable({ providedIn: 'root' })
export class ChatPreviewService {
  private readonly _messages = signal<IChatMessage[]>([]);
  private readonly _isTyping = signal(false);
  private readonly isBrowser: boolean;
  private nextId = 1;

  readonly messages = this._messages.asReadonly();
  readonly isTyping = this._isTyping.asReadonly();

  readonly hasMessages = computed(() => this._messages().length > 0);

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  startConversation(): void {
    if (!this.isBrowser) return;
    this._messages.set([]);
    this._isTyping.set(false);
    this.nextId = 1;
    this.playScript(0);
  }

  private playScript(index: number): void {
    if (index >= SCRIPT.length) return;

    const entry = SCRIPT[index];
    const delay = index === 0 ? 600 : MSG_PAUSE;

    setTimeout(() => {
      if (entry.sender === 'bot') {
        this._isTyping.set(true);
        setTimeout(() => {
          this._isTyping.set(false);
          this.typeMessage(entry.sender, entry.text, () => this.playScript(index + 1));
        }, TYPING_PAUSE);
      } else {
        this.typeMessage(entry.sender, entry.text, () => this.playScript(index + 1));
      }
    }, delay);
  }

  private typeMessage(
    sender: IChatMessage['sender'],
    fullText: string,
    onComplete: () => void
  ): void {
    const msg: IChatMessage = { id: this.nextId++, sender, text: '', isTyping: true };
    this._messages.update(msgs => [...msgs, msg]);

    let charIndex = 0;
    const interval = setInterval(() => {
      charIndex++;
      this._messages.update(msgs =>
        msgs.map(m =>
          m.id === msg.id
            ? { ...m, text: fullText.slice(0, charIndex), isTyping: charIndex < fullText.length }
            : m
        )
      );
      if (charIndex >= fullText.length) {
        clearInterval(interval);
        onComplete();
      }
    }, CHAR_DELAY);
  }
}
