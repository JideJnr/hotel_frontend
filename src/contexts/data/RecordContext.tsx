import { createContext, useContext, ReactNode, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecordStore } from '../../services/stores/recordStore';

// Define types for your Record data
interface Record {
  id: string;
  // Add other record properties here
  [key: string]: any;
}

interface RecordResponse {
  success: boolean;
  message?: string;
  data?: Record | Record[];
}

interface RecordContextType {
  records: Record[];
  record: Record | null;
  loading: boolean;
  error: string | null;
  createRecord: (payload: any) => Promise<void>;
  updateRecord: (id: string, payload: any) => Promise<void>;
  fetchRecords: () => Promise<void>;
  fetchRecord: (id: string) => Promise<void>;
}

const RecordContext = createContext<RecordContextType | undefined>(undefined);

export const RecordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [records, setRecords] = useState<Record[]>([]);
  const [record, setRecord] = useState<Record | null>(null);
  const store = useRecordStore();
  const { loading, error } = store;

  const wrappedCreateRecord = async (payload: any) => {
    try {
      const response = await store.createRecord(payload);
      if (response.success && response.data) {
        const newRecord = response.data as Record;
        setRecords(prev => [...prev, newRecord]);
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
      if (response.success && response.data) {
        const updatedRecord = response.data as Record;
        setRecords(prev => prev.map(r => r.id === id ? updatedRecord : r));
        setRecord(prev => prev?.id === id ? updatedRecord : prev);
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
      const response = await store.fetchTodayRecords();
      if (response?.data?.records) {
        setRecords(response.data?.records as Record[]);
      }
    } catch (error) {
      toast.error('Failed to fetch records');
      console.error('Fetch error:', error);
    
    }
  };

  const wrappedFetchRecord = async (id: string) => {
    try {
      const response = await store.fetchRecordById(id);
      if (response?.data) {
        setRecord(response.data as Record);
      }
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