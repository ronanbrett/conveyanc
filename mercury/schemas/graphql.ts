
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

export interface DimensionsInput {
    height: number;
    length: number;
    type: DimensionType;
    width: number;
}

export interface PropertyInputArgs {
    _id?: string;
    createdBy?: string;
    createdDate?: DateTime;
    description?: JSONObject;
    lastUpdatedBy?: string;
    lastUpdatedDate?: DateTime;
    type: PropertyType;
    dimensions?: DimensionsInput;
}

export interface AddressComponentOutput {
    types: string[];
}

export interface AddressOutput {
    addressComponents: AddressComponentOutput;
    formattedAddress: string;
    id: string;
}

export interface Dimensions {
    height: number;
    length: number;
    type: DimensionType;
    width: number;
}

export interface PropertyOutput {
    _id: string;
    address: AddressOutput;
    createdBy?: string;
    createdDate?: DateTime;
    description?: JSONObject;
    dimensions?: Dimensions;
    facilities?: PropertyFacility;
    lastUpdatedBy?: string;
    lastUpdatedDate?: DateTime;
    qualifications?: PropertyQualification;
    type: PropertyType;
}

export interface IQuery {
    property(id: number): PropertyOutput | Promise<PropertyOutput>;
}

export interface IMutation {
    createProperty(property?: PropertyInputArgs): PropertyOutput | Promise<PropertyOutput>;
}

export interface PropertyFacility {
    description?: JSONObject;
    subType: FacilitySubtype;
    type: Facility;
}

export interface PropertyQualification {
    description?: JSONObject;
    type: PropertyQualificationType;
    value: string;
}

export type DateTime = any;
export type JSONObject = any;
