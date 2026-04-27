export type MessageSender = 'bot' | 'user';

export interface IChatMessage {
  readonly id: number;
  readonly sender: MessageSender;
  text: string;           // mutable: typewriter appends characters
  isTyping: boolean;      // true while characters are being added
}
