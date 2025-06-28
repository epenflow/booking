import { useMemo, type ReactNode } from "react";

type ForProps<T> = {
  each?: Array<T>;
  children?: (value: T, index: number) => ReactNode;
};
export default function For<T>({ each, children }: ForProps<T>) {
  return useMemo(() => {
    return each?.map((value, index) => children?.(value, index));
  }, [each, children]);
}
