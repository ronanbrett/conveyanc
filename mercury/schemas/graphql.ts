
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum DimensionType {
    IMPERIAL = "IMPERIAL",
    METRIC = "METRIC"
}

export enum PropertyType {
    APPARTMENT = "APPARTMENT",
    COOPERATIVE = "COOPERATIVE",
    HOUSE = "HOUSE",
    MOBILE = "MOBILE",
    SITE = "SITE"
}

export enum Facility {
    ALARM = "ALARM",
    HEATING = "HEATING",
    INTERNET = "INTERNET",
    TV = "TV",
    WHEELCHAIR_ACCESS = "WHEELCHAIR_ACCESS"
}

export enum FacilitySubtype {
    GAS_FIRED_HEATING_SYSTEM = "GAS_FIRED_HEATING_SYSTEM",
    INTERNET_CABLE_WIRED = "INTERNET_CABLE_WIRED",
    INTERNET_FIBRE_WIRED = "INTERNET_FIBRE_WIRED",
    INTERNET_SAT_WIRED = "INTERNET_SAT_WIRED",
    OIL_FIRED_HEATING_SYSTEM = "OIL_FIRED_HEATING_SYSTEM",
    TV_CABLE_WIRED = "TV_CABLE_WIRED",
    TV_SAT_WIRED = "TV_SAT_WIRED"
}

export enum PropertyQualificationType {
    BER_RATING_IE = "BER_RATING_IE",
    TAX_DESIGNATION_IE = "TAX_DESIGNATION_IE"
}

export class DimensionsInput {
    height: number;
    length: number;
    type: DimensionType;
    width: number;
}

export class PropertyInputArgs {
    propertyId?: string;
    createdBy?: string;
    createdDate?: DateTime;
    description?: JSONObject;
    lastUpdatedBy?: string;
    lastUpdatedDate?: DateTime;
    type: PropertyType;
    dimensions?: DimensionsInput;
}

export class Option {
    label: string;
    value: string;
    group?: string;
    index?: number;
}

export class PageInfo {
    endCursor?: string;
}

export class AddressComponentOutput {
    types: string[];
}

export class AddressOutput {
    addressComponents: AddressComponentOutput;
    formattedAddress: string;
    id: string;
}

export class Dimensions {
    height: number;
    length: number;
    type: DimensionType;
    width: number;
}

export class ListingDTO {
    _id: string;
    property?: PropertyDTO[];
    description?: JSONObject;
    createdBy?: string;
    createdDate?: DateTime;
    lastUpdatedBy?: string;
    lastUpdatedDate?: DateTime;
}

export class PropertyDTO {
    propertyId: string;
    _id: string;
    address?: AddressOutput;
    createdBy?: string;
    createdDate?: DateTime;
    description?: JSONObject;
    dimensions?: Dimensions;
    facilities?: PropertyFacility[];
    lastUpdatedBy?: string;
    lastUpdatedDate?: DateTime;
    qualifications?: PropertyQualification[];
    type: PropertyType;
}

export class PropertyEdge {
    node?: PropertyDTO;
    cursor?: string;
}

export class PropertyPaged {
    totalCount?: number;
    edges?: PropertyEdge[];
    properties?: PropertyDTO[];
    pageInfo?: PageInfo;
}

export class PropertyInfo {
    propertyType?: Option[];
}

export abstract class IQuery {
    abstract property(id: string): PropertyDTO | Promise<PropertyDTO>;

    abstract properties(): PropertyDTO[] | Promise<PropertyDTO[]>;

    abstract propertiesPaged(first?: number, after?: string): PropertyPaged | Promise<PropertyPaged>;

    abstract propertyInfo(): PropertyInfo | Promise<PropertyInfo>;
}

export abstract class IMutation {
    abstract createProperty(property?: PropertyInputArgs): PropertyDTO | Promise<PropertyDTO>;
}

export class PropertyFacility {
    description?: JSONObject;
    subType: FacilitySubtype;
    type: Facility;
}

export class PropertyQualification {
    description?: JSONObject;
    type: PropertyQualificationType;
    value: string;
}

export type DateTime = any;
export type JSONObject = any;
