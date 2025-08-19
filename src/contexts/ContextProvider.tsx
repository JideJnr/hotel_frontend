import React from 'react';
import { AuthProvider } from './auth/AuthContext';
import { DarkModeProvider } from './app/DarkModeContext';
import { RoomProvider } from './data/RoomContext';
import { RecordProvider } from './data/RecordContext';
import { CustomerProvider } from './data/CustomerContext';
import { ExpenseProvider } from './data/ExpensesContext';
import { ComputationProvider } from './data/ComputationContext';
import { ActivityProvider } from './data/ActivityContext';
import { BookingProvider } from './data/BookingContext';
import { AnalyticsProvider } from './data/AnalyticsContext';
import { StaffProvider } from './data/StaffContext';

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
                    <BookingProvider>
                      <AnalyticsProvider>
                        <StaffProvider>
                          {children}
                        </StaffProvider>
                      </AnalyticsProvider>
                    </BookingProvider>
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


