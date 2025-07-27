import React from 'react';
import { AuthProvider } from './AuthContext';
import { DarkModeProvider } from './DarkModeContext';
import { RoomProvider } from './RoomContext';
import { RecordProvider } from './RecordContext';
import { CustomerProvider } from './CustomerContext';

export const ContextProvider:  React.FC<{ children: React.ReactNode }> = ({ children }) => {


  return (
    <AuthProvider>
        <DarkModeProvider>
            
             
                  {children}
            
            
        </DarkModeProvider>
    </AuthProvider>
  );
};


