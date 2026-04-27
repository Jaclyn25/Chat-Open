import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FeatureService } from '../../services/feature.service';
import { NavbarComponent } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-features-explorer-page',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './features-explorer-page.html',
  styleUrl: './features-explorer-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturesExplorerPageComponent {
  private readonly featureService = inject(FeatureService);
  
  readonly allFeatures = this.featureService.features;
}
