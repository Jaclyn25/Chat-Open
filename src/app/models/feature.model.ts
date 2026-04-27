export type FeatureIcon = 'brain' | 'teams' | 'bolt' | 'shield' | 'spark';

export interface IFeature {
  title: string;
  description: string;
  icon: FeatureIcon;
}

export type BentoType = 'analytics' | 'multilang' | 'integrations' | 'chat';

export interface IBentoFeature {
  type: BentoType;
  title: string;
  subtitle: string;
}
