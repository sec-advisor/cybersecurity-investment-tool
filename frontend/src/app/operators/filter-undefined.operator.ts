import { isUndefined } from 'lodash';
import { filter, Observable } from 'rxjs';

export const filterUndefined = (): (<T>(
  source: Observable<T>,
) => Observable<NonNullable<T>>) => filter(isNonUndefined);

const isNonUndefined = <T>(value: T): value is NonNullable<T> =>
  !isUndefined(value);
