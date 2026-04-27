import { ChangeDetectionStrategy, Component, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';

interface ITeamMember {
  name: string;
  role: string;
  photoUrl: string;
  isFounder?: boolean;
}

interface ICoreValue {
  title: string;
  description: string;
  icon: string;
}

interface ITechBadge {
  name: string;
  bgColor: string;
  svg: string;
}

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './about-page.html',
  styleUrl: './about-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('fadeEl') fadeElements!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  readonly team: ITeamMember[] = [
    {
      name: 'Mena Lawandy',
      role: 'Founder & AI Architect',
      photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      isFounder: true
    },
    {
      name: 'Sarah Chen',
      role: 'Head of Data Science',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Marcus Thorne',
      role: 'Lead Infrastructure',
      photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
    }
  ];

  readonly values: ICoreValue[] = [
    { title: 'Innovation', description: 'Pushing the boundary of LLM capabilities within enterprise constraints.', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
    { title: 'Privacy', description: 'Zero-retention architecture. Your corporate data never trains our models.', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { title: 'User-Centricity', description: 'Designing interfaces that humans naturally want to interact with.', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' }
  ];

  readonly techStack: ITechBadge[] = [
    { name: 'Angular 18', bgColor: 'bg-red-500/10 text-red-400 border-red-500/20', svg: 'M12 2L2 5.5l1 14.5L12 22l9-2 1-14.5z' },
    { name: '.NET 8', bgColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', svg: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z' },
    { name: 'SignalR', bgColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20', svg: 'M12 3v18m9-9H3' },
    { name: 'Docker', bgColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20', svg: 'M4 10h16v10H4z' }
  ];

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      this.fadeElements.forEach(el => this.observer?.observe(el.nativeElement));
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
