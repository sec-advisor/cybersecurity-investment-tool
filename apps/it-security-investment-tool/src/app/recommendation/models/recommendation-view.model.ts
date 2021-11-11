import { Segment } from '@app/api-interfaces';

export interface RecommendationViewModel {
  segments: SegmentViewModel[];
}

export interface SegmentViewModel extends Segment {
  isActive: boolean;
}
