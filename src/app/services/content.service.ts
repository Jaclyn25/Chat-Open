import { Injectable, signal } from '@angular/core';
import { IFeature, IBentoFeature } from '../models/feature.model';
import { IPricingPlan } from '../models/pricing-plan.model';
import { ITestimonial } from '../models/testimonial.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  readonly features = signal<IFeature[]>([
    {
      title: 'Contextual Memory',
      description: 'Conversations retain intent and constraints, enabling high-quality follow-ups at enterprise depth.',
      icon: 'brain'
    },
    {
      title: 'Team Workspaces',
      description: 'Collaborative AI spaces with role controls, shared prompts, and usage visibility for every team.',
      icon: 'teams'
    },
    {
      title: 'API + Automation',
      description: 'Trigger copilots from your product workflows, docs, and internal APIs in minutes.',
      icon: 'bolt'
    },
    {
      title: 'Compliance-Ready',
      description: 'Data boundaries, audit logs, and governance controls built for regulated industries.',
      icon: 'shield'
    },
    {
      title: 'Omnichannel Assistant',
      description: 'Web, in-app, and support channels share one AI brain with a consistent brand voice.',
      icon: 'spark'
    }
  ]);

  readonly bentoFeatures = signal<IBentoFeature[]>([
    { type: 'analytics',     title: 'Real-Time Analytics',   subtitle: 'Live conversation insights' },
    { type: 'multilang',     title: 'Multi-Language',        subtitle: '50+ languages supported'    },
    { type: 'integrations',  title: 'Integrations',          subtitle: 'Plug into your stack'       },
    { type: 'chat',          title: 'AI Chat Preview',       subtitle: 'See the bot in action'      }
  ]);

  readonly plans = signal<IPricingPlan[]>([
    {
      name: 'Starter',
      monthlyPrice: 29,
      yearlyPrice: 24,
      description: 'For early teams validating AI-assisted workflows.',
      cta: 'Start Free',
      highlight: false,
      features: ['5,000 AI replies/month', 'Basic integrations', 'Email support']
    },
    {
      name: 'Growth',
      monthlyPrice: 99,
      yearlyPrice: 79,
      description: 'For scaling startups shipping AI across products.',
      cta: 'Get Growth',
      highlight: true,
      features: ['50,000 AI replies/month', 'Advanced analytics', 'Priority support', 'Custom domain']
    },
    {
      name: 'Enterprise',
      monthlyPrice: 249,
      yearlyPrice: 199,
      description: 'For large organizations with strict reliability and controls.',
      cta: 'Talk to Sales',
      highlight: false,
      features: ['Unlimited seats', 'Custom integrations', 'Dedicated success manager', 'SLA guarantee']
    }
  ]);

  readonly testimonials = signal<ITestimonial[]>([
    {
      name: 'Sarah Chen',
      role: 'Head of Product',
      company: 'NovaTech',
      initials: 'SC',
      quote: 'ChatOPni reduced our support load by 62% in the first month. The contextual memory is genuinely impressive — it remembers context across sessions.',
      rating: 5,
      accentColor: '#00d1ff'
    },
    {
      name: 'Marcus Webb',
      role: 'CTO',
      company: 'Flowbase',
      initials: 'MW',
      quote: 'The API integration took under 30 minutes. Our devs loved the documentation and the webhook reliability has been flawless.',
      rating: 5,
      accentColor: '#8b5cf6'
    },
    {
      name: 'Priya Mehta',
      role: 'VP Engineering',
      company: 'Stride AI',
      initials: 'PM',
      quote: 'Enterprise compliance was the blocker for us. ChatOPni had audit logs and data boundaries on day one. Best decision we made this year.',
      rating: 5,
      accentColor: '#06d6a0'
    }
  ]);
}
