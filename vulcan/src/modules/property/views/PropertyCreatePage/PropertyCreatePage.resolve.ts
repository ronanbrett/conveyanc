import { getQueryRXJS, getEnumQueryRXJS } from '@/core/utils/rxjs.utils';
import { map, tap } from 'rxjs/operators';
import { RETRIEVE_PROPERTY_INFO } from '../../consts/property-queries.const';
import { PropertyInfo } from '@/core/api/graphql';

export const getPageInfoResolve = () => {
  return getQueryRXJS(RETRIEVE_PROPERTY_INFO).pipe(
    map((x: { propertyInfo: PropertyInfo }) => x.propertyInfo)
  );
};
