import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeatureService } from '../../services/feature.service';
import { NavbarComponent } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';
import { CustomButtonComponent } from '../../components/shared/custom-button/custom-button';

@Component({
  selector: 'app-feature-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent, CustomButtonComponent],
  templateUrl: './feature-detail-page.html',
  styleUrl: './feature-detail-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly featureService = inject(FeatureService);

  // Convert Route ParamMap Observable to a Signal
  private readonly params = toSignal(this.route.paramMap);
  
  // Computed Signal that derives the specific feature based on the current Route ID
  readonly feature = computed(() => {
    const pm = this.params();
    if (!pm) return null;
    const id = pm.get('id');
    if (!id) return null;
    return this.featureService.getFeatureById(id)();
  });
}
