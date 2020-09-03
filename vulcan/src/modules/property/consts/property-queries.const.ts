import gql from 'graphql-tag';

export const RETRIEVE_PROPERTY_INFO = gql`
  query {
    propertyInfo {
      propertyType {
        label
        value
        group
      }
    }
  }
`;

export const RETRIEVE_PROPERTIES = gql`
  query {
    properties {
      _id
      propertyId
      type
      description
      address {
        formattedAddress
      }
    }
  }
`;

export const RETRIEVE_PROPERTIES_PAGED = gql`
  query GET_PROPERTIES_PAGED($first: Int, $after: String) {
    propertiesPaged(first: $first, after: $after) {
      totalCount
      properties {
        createdDate
        _id
        propertyId
        description
        address {
          formattedAddress
        }
      }
    }
  }
`;

export const RETRIEVE_PROPERTIES_PAGED_QUERY = (first: number, after?: string | null) => `
  query {
    propertiesPaged(first: ${first}, after: ${after}) {
      totalCount
      properties {
        createdDate
        _id
        propertyId
        description
        address {
          formattedAddress
        }
      }
    }
  }
`;
