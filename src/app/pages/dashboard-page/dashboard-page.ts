import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';
import { CustomButtonComponent } from '../../components/shared/custom-button/custom-button';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent, CustomButtonComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {
  private readonly authService = inject(AuthService);
  
  readonly user = this.authService.currentUser;

  // Mock sessions for UI display
  readonly recentSessions = [
    { id: 'sess_991', title: 'Data Migration Strategy', date: new Date(Date.now() - 3600000), messageCount: 42 },
    { id: 'sess_992', title: 'Refactoring AuthGuard', date: new Date(Date.now() - 86400000), messageCount: 14 },
    { id: 'sess_993', title: 'Generating SQL Queries', date: new Date(Date.now() - 172800000), messageCount: 8 }
  ];

  logout(): void {
    this.authService.logout();
  }
}
