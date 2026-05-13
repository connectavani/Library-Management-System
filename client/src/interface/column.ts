import React from 'react';

type AlignType = 'left' | 'right' | 'center';

export interface Column<T, K extends keyof T = keyof T> {
  key: K | string;
  label: string;
  align?: AlignType;
  render?: (value: K extends keyof T ? T[K] : any, row: T) => React.ReactNode;
}
