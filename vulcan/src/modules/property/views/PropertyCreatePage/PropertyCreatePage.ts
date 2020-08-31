import { defineComponent, defineAsyncComponent, ref } from 'vue';
import PropertyCreateTypeInput from '../../components/PropertyCreateTypeInput/PropertyCreateTypeInput.vue';

const PropertyCreatePage = defineComponent({
  components: { PropertyCreateTypeInput },
  setup() {
    const type = ref(null);
    const group = ref(null);

    return {
      type,
      group,
    };
  },
});

export default PropertyCreatePage;
