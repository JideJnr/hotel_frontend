import React from 'react';
import { AuthProvider } from './auth/AuthContext';
import { DarkModeProvider } from './app/DarkModeContext';
import { RoomProvider } from './data/RoomContext';
import { RecordProvider } from './data/RecordContext';
import { CustomerProvider } from './data/CustomerContext';
import { ExpenseProvider } from './data/ExpensesContext';
import { ComputationProvider } from './data/ComputationContext';
import { ActivityProvider } from './data/ActivityContext';

export const ContextProvider:  React.FC<{ children: React.ReactNode }> = ({ children }) => {


  return (
    <AuthProvider>
      <DarkModeProvider>
        <RecordProvider>
          <RoomProvider>
            <CustomerProvider> 
              <ExpenseProvider>  
                <ActivityProvider>  
                  <ComputationProvider>   
                    {children}
                  </ComputationProvider>
                </ActivityProvider>
              </ExpenseProvider>
            </CustomerProvider>
          </RoomProvider>
        </RecordProvider>   
      </DarkModeProvider>
    </AuthProvider>
  );
};


