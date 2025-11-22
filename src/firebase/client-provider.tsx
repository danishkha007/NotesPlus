'use client';

import React, { ReactNode } from 'react';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  // The actual initialization is handled by the config file.
  // This provider simply ensures the context is available on the client.
  return <FirebaseProvider>{children}</FirebaseProvider>;
}
