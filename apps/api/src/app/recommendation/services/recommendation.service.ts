import { RecommendationProfile } from '@app/api-interfaces';
import { HttpService, Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class RecommendationService {

  constructor(private httpService: HttpService) { }

  recommend(body: RecommendationProfile): Observable<any> {
    // TODO CH: solve
    // const url = 'http://ml_decision_server:5000';
    const url = 'http://192.168.200.130:5000'
    return this.httpService.post(`${url}/v1/recommend`, body).pipe(map(response => response.data.recommendedServices));
  }
}
