import { useModelWrapper } from '@/core/utils/forms.utils';
import { defineComponent, onMounted, ref } from 'vue';

const Input = defineComponent({
  props: {
    iconAfter: String,
    loading: Boolean,
    color: String,
    modelValue: String,
    autocomplete: {
      type: String,
      default: 'off',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const val = useModelWrapper(props, emit);
    const innerValue = `${val.value}`;

    const onBlur = () => {
      console.log('blur!');
      emit('blur');
    };

    return {
      val,
      innerValue,
      onBlur,
    };
  },
});

export default Input;
