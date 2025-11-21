'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { Auth } from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { auth, app, firestore } from './config';

interface FirebaseContextValue {
  app: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

const FirebaseContext = createContext<FirebaseContextValue>({
  app: null,
  auth: null,
  firestore: null,
});

export function FirebaseProvider({ children }: { children: ReactNode }) {
  return (
    <FirebaseContext.Provider value={{ app, auth, firestore }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebaseApp = () => useContext(FirebaseContext).