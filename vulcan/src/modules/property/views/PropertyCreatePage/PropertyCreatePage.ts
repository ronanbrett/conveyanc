import { defineComponent, defineAsyncComponent, ref } from 'vue';
import PropertyCreateTypeInput from '../../components/PropertyCreateTypeInput/PropertyCreateTypeInput.vue';

const PropertyCreatePage = defineComponent({
  components: { PropertyCreateTypeInput },
  setup() {
    const type = ref(null);

    return {
      type,
    };
  },
});

export default PropertyCreatePage;
