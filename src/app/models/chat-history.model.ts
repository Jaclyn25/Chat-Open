export interface IChatSession {
  readonly id: string;
  readonly title: string;
  readonly date: Date;
  readonly messageCount: number;
}
