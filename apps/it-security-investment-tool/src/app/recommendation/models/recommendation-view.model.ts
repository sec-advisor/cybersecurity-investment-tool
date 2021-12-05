import { Segment } from '@app/api-interfaces';

export interface RecommendationViewModel {
  segments: SegmentViewModel[];
  selectedSegment: Segment | undefined;
}

export interface SegmentViewModel extends Segment {
  isActive: boolean;
}
