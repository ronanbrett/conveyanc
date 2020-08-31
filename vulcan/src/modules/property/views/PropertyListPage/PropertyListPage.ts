import { defineComponent } from 'vue';
import { useQuery } from '@vue/apollo-composable';

import ProperyListCard from '../../components/PropertyListCard/PropertyListCard.vue';
import {
  RETRIEVE_PROPERTIES,
  RETRIEVE_PROPERTIES_PAGED,
} from '../../consts/property-queries.const';

const PropertyListPage = defineComponent({
  setup: () => {
    const { result } = useQuery(RETRIEVE_PROPERTIES_PAGED(10, null));
    return {
      result,
    };
  },
  components: {
    ProperyListCard,
  },
});

export default PropertyListPage;
