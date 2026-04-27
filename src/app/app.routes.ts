import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  // 1. Landing Page
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing-page/landing-page').then((m) => m.LandingPageComponent),
    data: { animation: 'LandingPage' }
  },
  // 2. Auth System
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth-page/auth-page').then((m) => m.AuthPageComponent),
    data: { animation: 'AuthPage' }
  },
  // 3. Features Explorer
  {
    path: 'features',
    loadComponent: () =>
      import('./pages/features-explorer-page/features-explorer-page').then((m) => m.FeaturesExplorerPageComponent),
    data: { animation: 'FeaturesPage' }
  },
  // 4. Feature Detail Page (Dynamic Routing)
  {
    path: 'features/:id',
    loadComponent: () =>
      import('./pages/feature-detail-page/feature-detail-page').then((m) => m.FeatureDetailPageComponent),
    data: { animation: 'FeatureDetailPage' }
  },
  // 5. User Dashboard (Protected)
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard-page/dashboard-page').then((m) => m.DashboardPageComponent),
    data: { animation: 'DashboardPage' }
  },
  // 6. AI Playground (Protected)
  {
    path: 'playground',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/playground-page/playground-page').then((m) => m.PlaygroundPageComponent),
    data: { animation: 'PlaygroundPage' }
  },
  // 7. Pricing & Subscription
  {
    path: 'pricing',
    loadComponent: () =>
      import('./pages/pricing-page/pricing-page').then((m) => m.PricingPageComponent),
    data: { animation: 'PricingPage' }
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about-page/about-page').then((m) => m.AboutPageComponent),
    data: { animation: 'AboutPage' }
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact-page/contact-page').then((m) => m.ContactPageComponent),
    data: { animation: 'ContactPage' }
  },
  // 8. Settings / Profile (Protected)
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/profile-page/profile-page').then((m) => m.ProfilePageComponent),
    data: { animation: 'ProfilePage' }
  },
  // Fallback
  {
    path: '**',
    redirectTo: ''
  }
];
