export interface IUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly avatarUrl?: string;
  readonly role: 'admin' | 'user';
  readonly plan: 'Starter' | 'Growth' | 'Enterprise';
  readonly stats: {
    readonly totalChats: number;
    readonly apiCallsThisMonth: number;
    readonly dateJoined: Date;
  };
}
