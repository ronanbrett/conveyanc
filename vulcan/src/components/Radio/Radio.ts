import { useModelWrapper } from '@/core/utils/forms.utils';
import { defineComponent, onMounted, ref } from 'vue';

let radioId = 0;

const Radio = defineComponent({
  props: {
    modelValue: String,
    value: String,
    name: String,
    label: [String, Number],
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const checked = ref(true);
    const focused = ref(false);
    const val = useModelWrapper(props, emit);

    if (!props.hasOwnProperty('modelValue')) {
      throw new Error(`Radio must include a value prop on it 

      <Radio v-bind="field" v-model="test" value="testB">Radio Label</Radio>
      `);
    }

    if (!props.hasOwnProperty('value')) {
      throw new Error(`Radio must include a value prop on it 

      <Radio v-bind="field" v-model="test" value="testB">Radio Label</Radio>
      `);
    }

    const id = ref(radioId++);

    const onChange = () => {
      val.value = props.value;
    };

    const isChecked = () => {
      return props.modelValue === props.value;
    };

    const onBlur = (evt: any) => {
      focused.value = false;
      emit('blur', evt);
    };

    return { id, val, checked, isChecked, focused, onChange, onBlur };
  },
});

export default Radio;
