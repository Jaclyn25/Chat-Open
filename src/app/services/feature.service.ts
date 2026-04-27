import { Injectable, signal, computed } from '@angular/core';
import { IFeatureDetail } from '../models/feature-detail.model';

@Injectable({ providedIn: 'root' })
export class FeatureService {
  private readonly _features = signal<IFeatureDetail[]>([
    {
      id: 'contextual-memory',
      name: 'Contextual Memory',
      shortDescription: 'Retains intent enabling high-quality follow-ups.',
      fullDescription: 'Our neural core continuously analyzes conversation intent over time, allowing the copilot to maintain long-term context across multiple sessions and user inputs without losing track of constraints.',
      icon: 'brain',
      color: '#00d1ff',
      technicalDocs: {
        setup: ['npm install @chatopni/memory-core', 'import { MemoryModule } from "@chatopni/memory-core"'],
        requirements: ['Node 18+', 'Requires active Redis instance for low-latency retrieval']
      },
      useCases: [
        { title: 'Support Context', description: 'Agent remembers previous tickets a user submitted.' },
        { title: 'Code Refactoring', description: 'Bot remembers architectural constraints stated 10 prompts ago.' }
      ]
    },
    {
      id: 'api-automation',
      name: 'API + Automation',
      shortDescription: 'Trigger copilots from your product workflows.',
      fullDescription: 'Connect directly to your internal REST and GraphQL endpoints. The copilot can execute actions on behalf of the user using strictly typed payload generation.',
      icon: 'bolt',
      color: '#8b5cf6',
      technicalDocs: {
        setup: ['Set webhook URL in Dashboard', 'Provide Bearer token or OAuth credentials'],
        requirements: ['Endpoints must respond within 5s', 'OpenAPI v3 spec recommended']
      },
      useCases: [
        { title: 'SaaS Billing', description: 'Users can type "upgrade my plan" and the bot triggers the Stripe API.' },
        { title: 'CI/CD Triggers', description: 'Trigger Jenkins/GitHub actions via conversational commands.' }
      ]
    }
  ]);

  readonly features = this._features.asReadonly();

  // Pure signal that gets the details of a specific feature by iterating
  getFeatureById(id: string) {
    return computed(() => this._features().find(f => f.id === id) || null);
  }
}
