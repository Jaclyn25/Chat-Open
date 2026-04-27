export interface IPricingPlan {
  readonly name: string;
  readonly monthlyPrice: number;
  readonly yearlyPrice: number;
  readonly description: string;
  readonly cta: string;
  readonly highlight: boolean;
  readonly features: readonly string[];
}
