import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useRecord } from './RecordContext';
import { toast } from 'react-toastify';
import { useRoom } from './RoomContext';
import { useCustomer } from './CustomerContext';

interface ComputationContextType {
  balance: number;
  activeRooms: number;
  totalRooms: number
  totalSales: number;
  activeUsers: number;
  totalExpenses: number;
  computeBalance: () => number;
  computeActiveRooms: () => number;
  computeTotalSales: () => number;
  computeActiveUsers: () => number;
  computeTotalExpenses: () => number;
}

const ComputationContext = createContext<ComputationContextType | undefined>(undefined);

export const ComputationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { records } = useRecord();
  const {rooms} = useRoom();
  const {customers} = useCustomer();

  const computeBalance = () => {
    try {
      return records.reduce((sum, record) => sum + (record.amount || 0), 0);
    } catch (error) {
      console.error('Balance computation error:', error);
      toast.error('Failed to compute balance');
      return 0;
    }
  };

  const computeActiveRooms = () => {
    try {
      return records.filter(r => r.type === 'room' && r.status === 'active').length;
    } catch (error) {
      console.error('Active room computation error:', error);
      toast.error('Failed to compute active rooms');
      return 0;
    }
  };

  const computeTotalSales = () => {
    try {
      return records.filter(r => r.type === 'sale' && r.status === 'completed').length;
    } catch (error) {
      console.error('Sales computation error:', error);
      toast.error('Failed to compute total sales');
      return 0;
    }
  };

  const computeActiveUsers = () => {
    try {
      const uniqueUsers = new Set(
        records
          .filter(r => r.type === 'booking' && r.status === 'active')
          .map(r => r.userId)
      );
      return uniqueUsers.size;
    } catch (error) {
      console.error('Active users computation error:', error);
      toast.error('Failed to compute active users');
      return 0;
    }
  };

  const computeTotalExpenses = () => {
    try {
      return records
        .filter(r => r.type === 'expense' && r.status === 'approved')
        .reduce((sum, r) => sum + (r.amount || 0), 0);
    } catch (error) {
      console.error('Total expenses computation error:', error);
      toast.error('Failed to compute total expenses');
      return 0;
    }
  };

  const balance = useMemo(() => computeBalance(), [records]);
  const activeRooms = useMemo(() => computeActiveRooms(), [records]);
  const totalRooms = rooms?.length || 0;
  const totalCustomers = customers?.length || 0;
  const totalSales = useMemo(() => computeTotalSales(), [records]);
  const activeUsers = useMemo(() => computeActiveUsers(), [records]);
  const totalExpenses = useMemo(() => computeTotalExpenses(), [records]);

  const contextValue: ComputationContextType = useMemo(() => ({
    balance,
    activeRooms,
    totalCustomers,
    totalRooms,
    totalSales,
    activeUsers,
    totalExpenses,
    computeBalance,
    computeActiveRooms,
    computeTotalSales,
    computeActiveUsers,
    computeTotalExpenses
  }), [balance, activeRooms, totalSales, activeUsers, totalExpenses, records]);

  return (
    <ComputationContext.Provider value={contextValue}>
      {children}
    </ComputationContext.Provider>
  );
};

export const useComputation = () => {
  const context = useContext(ComputationContext);
  if (!context) throw new Error('useComputation must be used within a ComputationProvider');
  return context;
};
