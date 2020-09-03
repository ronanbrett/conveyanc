export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type Option = {
  __typename?: 'Option';
  label: Scalars['String'];
  value: Scalars['String'];
  group?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['ID']>;
};

export type AddressComponentOutput = {
  __typename?: 'AddressComponentOutput';
  types: Array<Scalars['String']>;
};

export type AddressOutput = {
  __typename?: 'AddressOutput';
  addressComponents: AddressComponentOutput;
  /** Readable string of the address */
  formattedAddress: Scalars['String'];
  /** Id of the address */
  id: Scalars['ID'];
};

export type DimensionsInput = {
  height: Scalars['Float'];
  length: Scalars['Float'];
  type: DimensionType;
  width: Scalars['Float'];
};

export type Dimensions = {
  __typename?: 'Dimensions';
  height: Scalars['Float'];
  length: Scalars['Float'];
  type: DimensionType;
  width: Scalars['Float'];
};

export enum DimensionType {
  Imperial = 'IMPERIAL',
  Metric = 'METRIC'
}

export type ListingDto = {
  __typename?: 'ListingDTO';
  _id: Scalars['ID'];
  property?: Maybe<Array<Maybe<PropertyDto>>>;
  description?: Maybe<Scalars['JSONObject']>;
  createdBy?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['DateTime']>;
  lastUpdatedBy?: Maybe<Scalars['String']>;
  lastUpdatedDate?: Maybe<Scalars['DateTime']>;
};

export type PropertyInputArgs = {
  propertyId?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['DateTime']>;
  /** Rich text JSON of the Property description */
  description?: Maybe<Scalars['JSONObject']>;
  lastUpdatedBy?: Maybe<Scalars['String']>;
  lastUpdatedDate?: Maybe<Scalars['DateTime']>;
  type: PropertyType;
  dimensions?: Maybe<DimensionsInput>;
};

export type PropertyDto = {
  __typename?: 'PropertyDTO';
  propertyId: Scalars['ID'];
  _id: Scalars['ID'];
  address?: Maybe<AddressOutput>;
  createdBy?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['DateTime']>;
  /** Rich text JSON of the Property description */
  description?: Maybe<Scalars['JSONObject']>;
  dimensions?: Maybe<Dimensions>;
  facilities?: Maybe<Array<Maybe<PropertyFacility>>>;
  lastUpdatedBy?: Maybe<Scalars['String']>;
  lastUpdatedDate?: Maybe<Scalars['DateTime']>;
  qualifications?: Maybe<Array<Maybe<PropertyQualification>>>;
  /** Type of Property */
  type: PropertyType;
};

export enum PropertyType {
  Appartment = 'APPARTMENT',
  Cooperative = 'COOPERATIVE',
  House = 'HOUSE',
  Mobile = 'MOBILE',
  Site = 'SITE'
}

export type PropertyEdge = {
  __typename?: 'PropertyEdge';
  node?: Maybe<PropertyDto>;
  cursor?: Maybe<Scalars['ID']>;
};

export type PropertyPaged = {
  __typename?: 'PropertyPaged';
  totalCount?: Maybe<Scalars['Int']>;
  edges?: Maybe<Array<Maybe<PropertyEdge>>>;
  properties?: Maybe<Array<Maybe<PropertyDto>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type PropertyInfo = {
  __typename?: 'PropertyInfo';
  propertyType?: Maybe<Array<Maybe<Option>>>;
};

export type Query = {
  __typename?: 'Query';
  property: PropertyDto;
  properties?: Maybe<Array<Maybe<PropertyDto>>>;
  propertiesPaged?: Maybe<PropertyPaged>;
  propertyInfo?: Maybe<PropertyInfo>;
};


export type QueryPropertyArgs = {
  id: Scalars['ID'];
};


export type QueryPropertiesPagedArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProperty?: Maybe<PropertyDto>;
};


export type MutationCreatePropertyArgs = {
  property?: Maybe<PropertyInputArgs>;
};

export enum Facility {
  Alarm = 'ALARM',
  Heating = 'HEATING',
  Internet = 'INTERNET',
  Tv = 'TV',
  WheelchairAccess = 'WHEELCHAIR_ACCESS'
}

export enum FacilitySubtype {
  GasFiredHeatingSystem = 'GAS_FIRED_HEATING_SYSTEM',
  InternetCableWired = 'INTERNET_CABLE_WIRED',
  InternetFibreWired = 'INTERNET_FIBRE_WIRED',
  InternetSatWired = 'INTERNET_SAT_WIRED',
  OilFiredHeatingSystem = 'OIL_FIRED_HEATING_SYSTEM',
  TvCableWired = 'TV_CABLE_WIRED',
  TvSatWired = 'TV_SAT_WIRED'
}

export type PropertyFacility = {
  __typename?: 'PropertyFacility';
  /** Rich text JSON of the Property Qualification */
  description?: Maybe<Scalars['JSONObject']>;
  subType: FacilitySubtype;
  type: Facility;
};

export type PropertyQualification = {
  __typename?: 'PropertyQualification';
  /** Rich text JSON of the Property Qualification */
  description?: Maybe<Scalars['JSONObject']>;
  type: PropertyQualificationType;
  value: Scalars['String'];
};

export enum PropertyQualificationType {
  BerRatingIe = 'BER_RATING_IE',
  TaxDesignationIe = 'TAX_DESIGNATION_IE'
}


