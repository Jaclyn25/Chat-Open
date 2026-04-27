import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  PLATFORM_ID,
  signal
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CustomButtonComponent } from '../shared/custom-button/custom-button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, CustomButtonComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  readonly navLinks = [
    { label: 'Home',     route: '/' },
    { label: 'Features', route: '/features' },
    { label: 'Pricing',  route: '/pricing'  },
    { label: 'About',    route: '/about' }
  ];

  isScrolled  = signal(false);
  mobileOpen  = signal(false);

  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.isBrowser) {
      this.isScrolled.set(window.scrollY > 12);
    }
  }

  scrollTo(id: string): void {
    if (this.isBrowser) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.mobileOpen.set(false);
  }

  toggleMenu(): void {
    this.mobileOpen.update(v => !v);
  }
}
