import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  PLATFORM_ID,
  signal
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  readonly navLinks = [
    { label: 'Features', id: 'features' },
    { label: 'Pricing',  id: 'pricing'  },
    { label: 'Contact',  id: 'contact'  }
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
