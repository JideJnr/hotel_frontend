import React from 'react';
import { AuthProvider } from './AuthContext';
import { DarkModeProvider } from './DarkModeContext';
import { RoomProvider } from './RoomContext';
import { RecordProvider } from './RecordContext';
import { CustomerProvider } from './CustomerContext';
import { ExpenseProvider } from './ExpensesContext';

export const ContextProvider:  React.FC<{ children: React.ReactNode }> = ({ children }) => {


  return (
    <AuthProvider>
      <DarkModeProvider>
        <RecordProvider>
          <RoomProvider>
            <CustomerProvider> 
              <ExpenseProvider>         
                  {children}
              </ExpenseProvider>
            </CustomerProvider>
          </RoomProvider>
        </RecordProvider>   
      </DarkModeProvider>
    </AuthProvider>
  );
};


