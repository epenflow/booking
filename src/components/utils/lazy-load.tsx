/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ReactNode } from "@tanstack/react-router";
import {
  lazy,
  Suspense,
  useMemo,
  type ComponentProps,
  type ComponentType,
} from "react";

type LazyLoadProps<T extends ComponentType<any>> = ComponentProps<T> & {
  loader: () => Promise<{ default: T }>;
  fallback?: ReactNode;
};

export default function LazyLoad<T extends ComponentType<any>>({
  loader,
  fallback,
  ...props
}: LazyLoadProps<T>) {
  const LazyComponent = useMemo(() => lazy(loader), [loader]);

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}
