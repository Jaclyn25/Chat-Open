import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar';
import { HeroComponent } from '../../components/hero/hero';
import { FeaturesSectionComponent } from '../../components/features-section/features-section';
import { PricingSectionComponent } from '../../components/pricing-section/pricing-section';
import { TestimonialsComponent } from '../../components/testimonials/testimonials';
import { ContactSectionComponent } from '../../components/contact-section/contact-section';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    FeaturesSectionComponent,
    PricingSectionComponent,
    TestimonialsComponent,
    ContactSectionComponent
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent {}
