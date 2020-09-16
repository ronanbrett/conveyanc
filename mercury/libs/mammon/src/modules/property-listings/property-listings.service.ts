import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '@utils/base/classes/base-respository.class';
import { Model } from 'mongoose';
import { PropertyListingDocument } from './property-listings.model';
import { from, Observable, of } from 'rxjs';
import fetch from 'node-fetch';

import { mergeMap, tap, map, switchMap, timeout, delay } from 'rxjs/operators';

import { get as configGet } from 'config';

const config: any = configGet('Google');

// const LOCATION_IQ = (token: string, address: string) =>
//   `https://us1.locationiq.com/v1/search.php?key=${token}&q=${encodeURI(
//     address,
//   )}&countrycodes=IE&format=json`;

export interface GeocodeResult {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export const getGeoCoding = (address: string): Observable<GeocodeResult[]> => {
  return from(
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${
        config.GEOCODING_API_KEY
      }&address=${encodeURIComponent(
        address,
      )}&components=country:IE&sensor=false`,
    ),
  ).pipe(
    delay(100),
    tap(x => console.log(x)),
    switchMap((x: any) => from(x.json())),
    tap(x => console.log(x)),
    map((x: any) => x.results),
  );
};

@Injectable()
export class PropertyListingsService extends BaseRepository<
  PropertyListingDocument,
  PropertyListingDocument
> {
  constructor(
    @InjectModel(PropertyListingDocument.name)
    public model: Model<PropertyListingDocument>,
  ) {
    super(model, 'propertyListingId');
  }

  async getPropertiesBetweenDates(
    fromDate: Date,
    toDate: Date,
  ): Promise<PropertyListingDocument[]> {
    const results = await this.model
      .find({
        dateOfSale: {
          $gte: new Date(fromDate),
          $lte: new Date(toDate),
        },
      })
      .limit(10);

    return results;
  }

  async updateProperties(limit = 20, skip = 0, year = 2020): Promise<boolean> {
    const results = await this.model
      .find({
        dateOfSale: {
          $gte: new Date(`${year}-01-01T00:00:00.000+00:00`),
          $lte: new Date(`${year}-12-31T00:00:00.000+00:00`),
        },
      })
      .sort({ dateOfSale: -1 })
      .limit(limit)
      .skip(skip);

    from(results)
      .pipe(
        // split up array
        mergeMap(x => of(x)),
        // deal with batches of 10
        mergeMap(async x => {
          const address = `${x.address} ${x.postCode} ${x.county} Ireland`;

          const geoCode = await getGeoCoding(address).toPromise();

          if (geoCode.length) {
            x.location = geoCode[0].geometry.location;
            x.formattedAddress = geoCode[0].formatted_address;
            x.addressComponents = geoCode[0].address_components;

            return await x.save();
          }

          return of(x);
        }, 20),
      )
      .subscribe(item => {
        console.log(item);
      });

    return true;
  }
}
