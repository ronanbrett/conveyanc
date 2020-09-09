import React, { useMemo, useState } from "react";
import { Observable, Subject } from "rxjs";
import { debounceTime, switchMap } from "rxjs/operators";
import { useRx } from "./useRx";

export const DEBOUNCE = 500;

export const useRxDebounce = <In, Out>(
  func$: (input: In) => Observable<Out>,
  next?: (val: Out) => void,
  debounce: number = DEBOUNCE
): [Out | undefined, (input: In) => void] => {
  const input$ = useMemo(() => new Subject<In>(), [func$]);
  const output$ = useMemo(
    () =>
      input$.pipe(
        debounceTime(debounce),
        switchMap((input) => func$(input))
      ),
    [input$]
  );
  const [output, setOutput] = useState<Out | undefined>();
  useRx(output$, {
    next(val) {
      setOutput(val);
      // Optionally invoke a callback with a given value.
      if (next) {
        next(val);
      }
    },
  });
  return [output, input$.next.bind(input$)];
};
