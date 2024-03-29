import { RecommendationProfile, Segment } from '@libs';

export interface AppSegment extends Segment {
  recommendations?: Recommendation[];
  recommendationProfile?: RecommendationProfile;
}

export interface Recommendation {
  data: any;
  rosi?: number;
}
