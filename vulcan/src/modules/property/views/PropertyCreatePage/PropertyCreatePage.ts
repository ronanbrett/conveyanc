import { defineComponent, ref, reactive, Ref } from 'vue';
import PropertyCreateTypeInput from '../../components/PropertyCreateTypeInput/PropertyCreateTypeInput.vue';
import Radio from '@/components/Radio/Radio.vue';
import { Field, Form } from 'vee-validate';
import { onBeforeRouteUpdate } from 'vue-router';
import { getPageInfoResolve } from './PropertyCreatePage.resolve';
import { PropertyInfo } from '@/core/api/graphql';

interface PropertyCreatePageForm {
  propertyType: { type: string; subType: string };
  test: boolean;
}

const PropertyCreatePage = defineComponent({
  components: { PropertyCreateTypeInput, Radio, Field, Form },
  async beforeRouteEnter(to, from, next) {
    console.log('this in beforeRouteEnter', this);
    next();
  },
  async setup() {
    const data: Ref<PropertyInfo | undefined> = ref();

    const propertyType = reactive({ type: null, subType: null });
    const test = ref(false);

    onBeforeRouteUpdate(async (to, from, next) => {
      data.value = await getPageInfoResolve().toPromise();
      console.log(data);
      next();
    });

    data.value = await getPageInfoResolve().toPromise();

    const onSubmit = (vals: PropertyCreatePageForm) => {
      console.log(JSON.stringify(vals));
      // console.log(propertyType?.subType, propertyType?.type);
      // console.log(test);
    };

    return {
      onSubmit,
      propertyType,
      test,
      data,
    };
  },
});

export default PropertyCreatePage;
