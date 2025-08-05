import { createContext, useContext, ReactNode, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useRecordStore } from '../services/stores/recordStore';

const RecordContext = createContext<RecordContextType | undefined>(undefined);

export const RecordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const store = useRecordStore();
  const { records, record, loading, error } = store;

  const wrappedCreateRecord = async (payload: any) => {
    try {
      const response = await store.createRecord(payload);
      if (response.success) {
        toast.success('Record created successfully');
      } else {
        toast.error(`Creation failed: ${response.message}`);
      }
    } catch (error) {
      toast.error('Record creation error');
      console.error('Creation error:', error);
    }
  };

  const wrappedUpdateRecord = async (id: string, payload: any) => {
    try {
      const response = await store.updateRecord(id, payload);
      if (response.success) {
        toast.success('Record updated successfully');
      } else {
        toast.error(`Update failed: ${response.message}`);
      }
    } catch (error) {
      toast.error('Record update error');
      console.error('Update error:', error);
    }
  };

  const wrappedFetchRecords = async () => {
    try {
      await store.fetchRecords();
    } catch (error) {
      toast.error('Failed to fetch records');
      console.error('Fetch error:', error);
    }
  };

  const wrappedFetchRecord = async (id: string) => {
    try {
      await store.fetchRecord(id);
    } catch (error) {
      toast.error(`Failed to fetch record ${id}`);
      console.error('Fetch error:', error);
    }
  };

  const contextValue = useMemo(() => ({
    records,
    record,
    loading,
    error,
    createRecord: wrappedCreateRecord,
    updateRecord: wrappedUpdateRecord,
    fetchRecords: wrappedFetchRecords,
    fetchRecord: wrappedFetchRecord,
  }), [records, record, loading, error]);

  return (
    <RecordContext.Provider value={contextValue}>
      {children}
    </RecordContext.Provider>
  );
};

export const useRecord = () => {
  const context = useContext(RecordContext);
  if (!context) throw new Error('useRecord must be used within a RecordProvider');
  return context;
};