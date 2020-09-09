import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";
import { from, Observable } from "rxjs";

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
  return ajax(
    `https://maps.googleapis.com/maps/api/geocode/json?key=${
      CONFIG.Google.GEOCODING_API_KEY
    }&address=${encodeURIComponent(address)}&components=country:IE&sensor=false`
  ).pipe(
    map((x) => x.response),
    map((x) => x.results)
  );
};

export const getPlaces = (address: string) => {
  return ajax(
    `maps.googleapis.com/maps/api/place/autocomplete/json?key=${
      CONFIG.Google.GEOCODING_API_KEY
    }&input=${encodeURIComponent(address + " Ireland")}`
  ).pipe(
    map((x) => x.response),
    map((x) => x.results)
  );
};
