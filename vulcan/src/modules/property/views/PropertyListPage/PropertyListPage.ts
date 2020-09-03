import { getQueryRXJS } from '@/core/utils/rxjs.utils';
import { defineComponent, ref } from 'vue';
import ProperyListCard from '../../components/PropertyListCard/PropertyListCard.vue';
import { RETRIEVE_PROPERTIES_PAGED } from '../../consts/property-queries.const';

const PropertyListPage = defineComponent({
  setup: async () => {
    const result = ref(null);
    getQueryRXJS(RETRIEVE_PROPERTIES_PAGED, { first: 10, after: null }).subscribe(
      ({ propertiesPaged }) => {
        result.value = propertiesPaged;
      }
    );
    return {
      result,
    };
  },
  components: {
    ProperyListCard,
  },
});

export default PropertyListPage;
