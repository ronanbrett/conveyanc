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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  GeoJSONPointScalar: any;
  GeoJSONPolygonScalar: any;
};

export enum IsoCountry {
  Af = 'AF',
  Ax = 'AX',
  Al = 'AL',
  Dz = 'DZ',
  Ad = 'AD',
  Ao = 'AO',
  Ag = 'AG',
  Ar = 'AR',
  Am = 'AM',
  Au = 'AU',
  At = 'AT',
  Az = 'AZ',
  Bs = 'BS',
  Bh = 'BH',
  Bd = 'BD',
  Bb = 'BB',
  By = 'BY',
  Be = 'BE',
  Bz = 'BZ',
  Bj = 'BJ',
  Bt = 'BT',
  Bo = 'BO',
  Ba = 'BA',
  Bw = 'BW',
  Br = 'BR',
  Bn = 'BN',
  Bg = 'BG',
  Bf = 'BF',
  Bi = 'BI',
  Kh = 'KH',
  Cm = 'CM',
  Ca = 'CA',
  Cv = 'CV',
  Cf = 'CF',
  Td = 'TD',
  Cl = 'CL',
  Cn = 'CN',
  Co = 'CO',
  Km = 'KM',
  Cg = 'CG',
  Cd = 'CD',
  Cr = 'CR',
  Ci = 'CI',
  Hr = 'HR',
  Cu = 'CU',
  Cy = 'CY',
  Cz = 'CZ',
  Dk = 'DK',
  Dj = 'DJ',
  Dm = 'DM',
  Do = 'DO',
  Tl = 'TL',
  Ec = 'EC',
  Eg = 'EG',
  Sv = 'SV',
  Gq = 'GQ',
  Er = 'ER',
  Ee = 'EE',
  Et = 'ET',
  Fj = 'FJ',
  Fi = 'FI',
  Fr = 'FR',
  Ga = 'GA',
  Gm = 'GM',
  Ge = 'GE',
  De = 'DE',
  Gh = 'GH',
  Gr = 'GR',
  Gd = 'GD',
  Gt = 'GT',
  Gg = 'GG',
  Gn = 'GN',
  Gw = 'GW',
  Gy = 'GY',
  Ht = 'HT',
  Va = 'VA',
  Hn = 'HN',
  Hu = 'HU',
  Is = 'IS',
  In = 'IN',
  Id = 'ID',
  Ir = 'IR',
  Iq = 'IQ',
  Ie = 'IE',
  Im = 'IM',
  Il = 'IL',
  It = 'IT',
  Jm = 'JM',
  Jp = 'JP',
  Je = 'JE',
  Jo = 'JO',
  Kz = 'KZ',
  Ke = 'KE',
  Ki = 'KI',
  Kp = 'KP',
  Kr = 'KR',
  Kw = 'KW',
  Kg = 'KG',
  La = 'LA',
  Lv = 'LV',
  Lb = 'LB',
  Ls = 'LS',
  Lr = 'LR',
  Ly = 'LY',
  Li = 'LI',
  Lt = 'LT',
  Lu = 'LU',
  Mg = 'MG',
  Mw = 'MW',
  My = 'MY',
  Mv = 'MV',
  Ml = 'ML',
  Mt = 'MT',
  Mh = 'MH',
  Mr = 'MR',
  Mu = 'MU',
  Mx = 'MX',
  Fm = 'FM',
  Md = 'MD',
  Mc = 'MC',
  Mn = 'MN',
  Me = 'ME',
  Ma = 'MA',
  Mz = 'MZ',
  Mm = 'MM',
  Na = 'NA',
  Nr = 'NR',
  Np = 'NP',
  Nl = 'NL',
  Nz = 'NZ',
  Ni = 'NI',
  Ne = 'NE',
  Ng = 'NG',
  No = 'NO',
  Om = 'OM',
  Pk = 'PK',
  Pw = 'PW',
  Pa = 'PA',
  Pg = 'PG',
  Py = 'PY',
  Pe = 'PE',
  Ph = 'PH',
  Pl = 'PL',
  Pt = 'PT',
  Qa = 'QA',
  Ro = 'RO',
  Ru = 'RU',
  Rw = 'RW',
  Kn = 'KN',
  Lc = 'LC',
  Vc = 'VC',
  Ws = 'WS',
  Sm = 'SM',
  St = 'ST',
  Sa = 'SA',
  Sn = 'SN',
  Rs = 'RS',
  Sc = 'SC',
  Sl = 'SL',
  Sg = 'SG',
  Sk = 'SK',
  Si = 'SI',
  Sb = 'SB',
  So = 'SO',
  Za = 'ZA',
  Es = 'ES',
  Lk = 'LK',
  Sd = 'SD',
  Sr = 'SR',
  Sz = 'SZ',
  Se = 'SE',
  Ch = 'CH',
  Sy = 'SY',
  Tj = 'TJ',
  Tz = 'TZ',
  Th = 'TH',
  Mk = 'MK',
  Tg = 'TG',
  To = 'TO',
  Tt = 'TT',
  Tn = 'TN',
  Tr = 'TR',
  Tm = 'TM',
  Tv = 'TV',
  Ug = 'UG',
  Ua = 'UA',
  Ae = 'AE',
  Gb = 'GB',
  Us = 'US',
  Uy = 'UY',
  Uz = 'UZ',
  Vu = 'VU',
  Ve = 'VE',
  Vn = 'VN',
  Ye = 'YE',
  Zm = 'ZM',
  Zw = 'ZW',
  As = 'AS',
  Ai = 'AI',
  Aq = 'AQ',
  Aw = 'AW',
  Bm = 'BM',
  Bv = 'BV',
  Io = 'IO',
  Ky = 'KY',
  Cx = 'CX',
  Cc = 'CC',
  Ck = 'CK',
  Fk = 'FK',
  Fo = 'FO',
  Gf = 'GF',
  Pf = 'PF',
  Tf = 'TF',
  Gi = 'GI',
  Gl = 'GL',
  Gp = 'GP',
  Gu = 'GU',
  Hm = 'HM',
  Hk = 'HK',
  Mo = 'MO',
  Mq = 'MQ',
  Yt = 'YT',
  Ms = 'MS',
  An = 'AN',
  Nc = 'NC',
  Nu = 'NU',
  Nf = 'NF',
  Mp = 'MP',
  Ps = 'PS',
  Pn = 'PN',
  Pr = 'PR',
  Re = 'RE',
  Bl = 'BL',
  Sh = 'SH',
  Mf = 'MF',
  Pm = 'PM',
  Gs = 'GS',
  Sj = 'SJ',
  Tw = 'TW',
  Tk = 'TK',
  Tc = 'TC',
  Um = 'UM',
  Vg = 'VG',
  Vi = 'VI',
  Wf = 'WF',
  Eh = 'EH'
}

export enum IsoCurrency {
  Aed = 'AED',
  Afn = 'AFN',
  All = 'ALL',
  Amd = 'AMD',
  Ang = 'ANG',
  Aoa = 'AOA',
  Ars = 'ARS',
  Aud = 'AUD',
  Awg = 'AWG',
  Azn = 'AZN',
  Bam = 'BAM',
  Bbd = 'BBD',
  Bdt = 'BDT',
  Bgn = 'BGN',
  Bhd = 'BHD',
  Bif = 'BIF',
  Bmd = 'BMD',
  Bnd = 'BND',
  Bob = 'BOB',
  Bov = 'BOV',
  Brl = 'BRL',
  Bsd = 'BSD',
  Btn = 'BTN',
  Bwp = 'BWP',
  Byn = 'BYN',
  Bzd = 'BZD',
  Cad = 'CAD',
  Cdf = 'CDF',
  Che = 'CHE',
  Chf = 'CHF',
  Chw = 'CHW',
  Clf = 'CLF',
  Clp = 'CLP',
  Cny = 'CNY',
  Cop = 'COP',
  Cou = 'COU',
  Crc = 'CRC',
  Cuc = 'CUC',
  Cup = 'CUP',
  Cve = 'CVE',
  Czk = 'CZK',
  Djf = 'DJF',
  Dkk = 'DKK',
  Dop = 'DOP',
  Dzd = 'DZD',
  Egp = 'EGP',
  Ern = 'ERN',
  Etb = 'ETB',
  Eur = 'EUR',
  Fjd = 'FJD',
  Fkp = 'FKP',
  Gbp = 'GBP',
  Gel = 'GEL',
  Ghs = 'GHS',
  Gip = 'GIP',
  Gmd = 'GMD',
  Gnf = 'GNF',
  Gtq = 'GTQ',
  Gyd = 'GYD',
  Hkd = 'HKD',
  Hnl = 'HNL',
  Hrk = 'HRK',
  Htg = 'HTG',
  Huf = 'HUF',
  Idr = 'IDR',
  Ils = 'ILS',
  Inr = 'INR',
  Iqd = 'IQD',
  Irr = 'IRR',
  Isk = 'ISK',
  Jmd = 'JMD',
  Jod = 'JOD',
  Jpy = 'JPY',
  Kes = 'KES',
  Kgs = 'KGS',
  Khr = 'KHR',
  Kmf = 'KMF',
  Kpw = 'KPW',
  Krw = 'KRW',
  Kwd = 'KWD',
  Kyd = 'KYD',
  Kzt = 'KZT',
  Lak = 'LAK',
  Lbp = 'LBP',
  Lkr = 'LKR',
  Lrd = 'LRD',
  Lsl = 'LSL',
  Lyd = 'LYD',
  Mad = 'MAD',
  Mdl = 'MDL',
  Mga = 'MGA',
  Mkd = 'MKD',
  Mmk = 'MMK',
  Mnt = 'MNT',
  Mop = 'MOP',
  Mro = 'MRO',
  Mur = 'MUR',
  Mvr = 'MVR',
  Mwk = 'MWK',
  Mxn = 'MXN',
  Mxv = 'MXV',
  Myr = 'MYR',
  Mzn = 'MZN',
  Nad = 'NAD',
  Ngn = 'NGN',
  Nio = 'NIO',
  Nok = 'NOK',
  Npr = 'NPR',
  Nzd = 'NZD',
  Omr = 'OMR',
  Pab = 'PAB',
  Pen = 'PEN',
  Pgk = 'PGK',
  Php = 'PHP',
  Pkr = 'PKR',
  Pln = 'PLN',
  Pyg = 'PYG',
  Qar = 'QAR',
  Ron = 'RON',
  Rsd = 'RSD',
  Rub = 'RUB',
  Rwf = 'RWF',
  Sar = 'SAR',
  Sbd = 'SBD',
  Scr = 'SCR',
  Sdg = 'SDG',
  Sek = 'SEK',
  Sgd = 'SGD',
  Shp = 'SHP',
  Sll = 'SLL',
  Sos = 'SOS',
  Srd = 'SRD',
  Ssp = 'SSP',
  Std = 'STD',
  Svc = 'SVC',
  Syp = 'SYP',
  Szl = 'SZL',
  Thb = 'THB',
  Tjs = 'TJS',
  Tmt = 'TMT',
  Tnd = 'TND',
  Top = 'TOP',
  Try = 'TRY',
  Ttd = 'TTD',
  Twd = 'TWD',
  Tzs = 'TZS',
  Uah = 'UAH',
  Ugx = 'UGX',
  Usd = 'USD',
  Usn = 'USN',
  Uyi = 'UYI',
  Uyu = 'UYU',
  Uzs = 'UZS',
  Vef = 'VEF',
  Vnd = 'VND',
  Vuv = 'VUV',
  Wst = 'WST',
  Xaf = 'XAF',
  Xag = 'XAG',
  Xau = 'XAU',
  Xba = 'XBA',
  Xbb = 'XBB',
  Xbc = 'XBC',
  Xbd = 'XBD',
  Xcd = 'XCD',
  Xdr = 'XDR',
  Xof = 'XOF',
  Xpd = 'XPD',
  Xpf = 'XPF',
  Xpt = 'XPT',
  Xsu = 'XSU',
  Xts = 'XTS',
  Xua = 'XUA',
  Xxx = 'XXX',
  Yer = 'YER',
  Zar = 'ZAR',
  Zmw = 'ZMW',
  Zwl = 'ZWL'
}

export type Neighborhood = {
  __typename?: 'Neighborhood';
  geometry?: Maybe<Scalars['GeoJSONPolygonScalar']>;
  countryCode?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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

export enum S3Level {
  Public = 'PUBLIC',
  Protected = 'PROTECTED',
  Private = 'PRIVATE'
}

export type S3Object = {
  __typename?: 'S3Object';
  key: Scalars['String'];
  bucket: Scalars['String'];
  directory?: Maybe<Scalars['String']>;
  level: S3Level;
  region: Scalars['String'];
  userId?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type S3ObjectArgs = {
  key: Scalars['String'];
  bucket: Scalars['String'];
  directory?: Maybe<Scalars['String']>;
  level: S3Level;
  region: Scalars['String'];
  userId?: Maybe<Scalars['String']>;
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
  description?: Maybe<Scalars['JSON']>;
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
  description?: Maybe<Scalars['JSON']>;
  lastUpdatedBy?: Maybe<Scalars['String']>;
  lastUpdatedDate?: Maybe<Scalars['DateTime']>;
  type: PropertyType;
  dimensions?: Maybe<DimensionsInput>;
  location?: Maybe<Scalars['GeoJSONPointScalar']>;
  images?: Maybe<Array<Maybe<S3ObjectArgs>>>;
};

export type PropertyDto = {
  __typename?: 'PropertyDTO';
  propertyId: Scalars['ID'];
  _id: Scalars['ID'];
  address?: Maybe<AddressOutput>;
  createdBy?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['DateTime']>;
  /** Rich text JSON of the Property description */
  description?: Maybe<Scalars['JSON']>;
  dimensions?: Maybe<Dimensions>;
  facilities?: Maybe<Array<Maybe<PropertyFacility>>>;
  lastUpdatedBy?: Maybe<Scalars['String']>;
  lastUpdatedDate?: Maybe<Scalars['DateTime']>;
  qualifications?: Maybe<Array<Maybe<PropertyQualification>>>;
  location?: Maybe<Scalars['GeoJSONPointScalar']>;
  /** Type of Property */
  type: PropertyType;
  images?: Maybe<Array<Maybe<S3Object>>>;
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
  uploadUrl?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  property: PropertyDto;
  properties?: Maybe<Array<Maybe<PropertyDto>>>;
  propertiesPaged?: Maybe<PropertyPaged>;
  propertyInfo?: Maybe<PropertyInfo>;
  getPropertiesForMonth?: Maybe<Array<Maybe<PropertyListingDto>>>;
  updateProperties?: Maybe<Scalars['Boolean']>;
};


export type QueryPropertyArgs = {
  id: Scalars['ID'];
};


export type QueryPropertiesPagedArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type QueryGetPropertiesForMonthArgs = {
  fromDate?: Maybe<Scalars['DateTime']>;
  toDate?: Maybe<Scalars['DateTime']>;
};


export type QueryUpdatePropertiesArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
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
  description?: Maybe<Scalars['JSON']>;
  subType: FacilitySubtype;
  type: Facility;
};

export type PropertyListingDto = {
  __typename?: 'PropertyListingDTO';
  dateOfSale?: Maybe<Scalars['DateTime']>;
  address?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  notFullMarketPrice?: Maybe<Scalars['Boolean']>;
  VATExclusive?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  propertySize?: Maybe<Scalars['String']>;
  formattedAddress?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['GeoJSONPointScalar']>;
  addressComponents?: Maybe<Array<Maybe<AddressComponentOutput>>>;
};

export type PropertyQualification = {
  __typename?: 'PropertyQualification';
  /** Rich text JSON of the Property Qualification */
  description?: Maybe<Scalars['JSON']>;
  type: PropertyQualificationType;
  value: Scalars['String'];
};

export enum PropertyQualificationType {
  BerRatingIe = 'BER_RATING_IE',
  TaxDesignationIe = 'TAX_DESIGNATION_IE'
}




