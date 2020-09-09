import { useEffect } from "react";
import { useFormikContext, FormikContextType } from "formik";
import { throttle, debounce } from "@core/utils";
import useDebouncedCallback from "@hooks/useDebouncedCallback";

export interface FormikEffectProps<T> {
  onChange: (context: FormikContextType<T>) => void;
}

export const FormikEffect = <T extends unknown>({
  onChange,
}: FormikEffectProps<T>): any => {
  const context = useFormikContext<T>();
  const [triggerOnChange] = useDebouncedCallback(
    // function
    () => {
      onChange(context);
    },
    // delay in ms
    250
  );

  useEffect(() => {
    triggerOnChange();
  }, [context, onChange]);

  return null;
};
