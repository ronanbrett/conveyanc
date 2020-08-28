import { defineComponent } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

import ProperyListCard from '../../components/PropertyListCard/PropertyListCard.vue';

const PropertyListPage = defineComponent({
  setup: () => {
    const { result } = useQuery(gql`
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
    `);
    return {
      result,
    };
  },
  components: {
    ProperyListCard,
  },
});

export default PropertyListPage;
