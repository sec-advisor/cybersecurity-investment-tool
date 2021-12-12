import { AppSegment } from '../../models/app-segment.model';

export interface RecommendationViewModel {
  segments: SegmentViewModel[];
  selectedSegment: AppSegment | undefined;
}

export interface SegmentViewModel extends AppSegment {
  isActive: boolean;
}
