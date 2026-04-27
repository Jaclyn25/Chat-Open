export interface IFeatureDetail {
  readonly id: string;
  readonly name: string;
  readonly shortDescription: string;
  readonly fullDescription: string;
  readonly icon: string;
  readonly color: string;
  readonly technicalDocs: {
    readonly setup: string[];
    readonly requirements: string[];
  };
  readonly useCases: {
    readonly title: string;
    readonly description: string;
  }[];
}
