import { Injectable, signal } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _currentUser = signal<IUser | null>(null);

  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = signal<boolean>(false);

  login(email: string, pass: string): boolean {
    // Mock authentication for the graduation project
    if (email && pass) {
      this._currentUser.set({
        id: 'usr_123',
        name: 'Alex Developer',
        email: email,
        role: 'admin',
        plan: 'Growth',
        stats: { totalChats: 142, apiCallsThisMonth: 12400, dateJoined: new Date() }
      });
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this._currentUser.set(null);
    this.isAuthenticated.set(false);
  }
}
