import { defineComponent, ref, reactive, Ref } from 'vue';
import PropertyCreateTypeInput from '../../components/PropertyCreateTypeInput/PropertyCreateTypeInput.vue';
import { Button, Input, Radio } from '@/components';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { getPageInfoResolve } from './PropertyCreatePage.resolve';
import { PropertyInfo } from '@/core/api/graphql';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

interface PropertyCreatePageForm {
  propertyType: { type: string; subType: string };
  test: boolean;
  form: { name: string };
}

const PropertyCreatePage = defineComponent({
  components: { PropertyCreateTypeInput, Radio, Field, Form, Button, Input, ErrorMessage },
  async beforeRouteEnter(to, from, next) {
    next();
  },
  async setup() {
    const data: Ref<PropertyInfo | undefined> = ref();
    const isLoading = ref(true);

    const propertyType = reactive({ type: null, subType: null });

    const form = reactive({
      name: '',
      test: null,
      propertyType: { type: null, subType: null },
    });
    const test = ref();

    const schema = {
      name: 'required',
      test: 'required',
      propertyType: (propertyType: { type: string; subType: string }, options: any, ctx: any) => {
        if (!propertyType || !propertyType.subType) {
          return 'You must provide a Property Type';
        }
        return true;
      },
    };

    data.value = await getPageInfoResolve()
      .pipe(tap(() => (isLoading.value = false)))
      .toPromise();

    const onSubmit = (vals: PropertyCreatePageForm) => {
      console.log(JSON.stringify(form));
      console.log(JSON.stringify(vals));
    };

    const onReset = () => {
      form.name = '';
      form.propertyType.subType = null;
      form.propertyType.type = null;
      form.test = null;
    };

    return {
      schema,
      onSubmit,
      isLoading,
      onReset,
      propertyType,
      test,
      data,
      form,
    };
  },
});

export default PropertyCreatePage;
