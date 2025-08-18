import { createContext, useContext, ReactNode, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecordStore } from '../../services/stores/recordStore';
import { useIonRouter } from '@ionic/react';
import { getHotelBusinessDate } from '../../utils/utilities';


interface Record {
  id: string;
  [key: string]: any;
}

interface RecordContextType {
  records: Record[];
  record: Record | null;
  loading: boolean;
  error: string | null;
  createRecord: (payload: any) => Promise<Response>;
  updateRecord: (id: string, payload: any) => Promise<Response>;
  fetchRecords: () => Promise<Response>;
  fetchRecord: (id: string) => Promise<Response>;
  checkOutRecord: (id: string) => Promise<Response>;
}

const RecordContext = createContext<RecordContextType | undefined>(undefined);

export const RecordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useIonRouter();
  const [records, setRecords] = useState<Record[]>([]);
  const [record, setRecord] = useState<Record | null>(null);
  const store = useRecordStore();
  const { loading, error } = store;

  const wrappedCreateRecord = async (payload: any) => {
    try {
      const response = await store.createRecord(payload);
      if (response.success && response.data) {
        toast.success('Record created successfully');
        router.push(`/record/${response.data.recordId}`, 'forward');
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
      
        toast.success('Record updated successfully');
      } else {
        toast.error(`Update failed: ${response.message}`);
      }
    } catch (error) {
      toast.error('Record update error');
      console.error('Update error:', error);
     
    }
  };

  const wrappedFetchRecords = async (date:string) => {
    try {
     const response = await store.fetchRecordsOnDate(date);
      if (response?.data?.records) {
        setRecords(response.data?.records as Record[]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

const wrappedFetchTodayRecords = async () => {
  const businessDate = getHotelBusinessDate();
  const formattedDate = businessDate.toISOString().split('T')[0];

  
  try {
    const response = await store.fetchRecordsOnDate(formattedDate);

  
    
    if (response?.success && response?.data?.records) {
      setRecords(response.data.records);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

  const wrappedFetchRecord = async (id: string) => {
    try {
      const response = await store.fetchRecordById(id);
     
      if (response?.success && response?.data) {
        setRecord(response.data);
      }
    } catch (error) {
      toast.error(`Failed to fetch record ${id}`);
      console.error('Fetch error:', error);
     
    }
  };

  const wrappedCheckoutRecord = async (id: string) => {
    try {
      const response = await store.checkoutRecord(id);
      if (response?.success) {
        setRecord(response.data);
      }
      return response;
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
    fetchTodayRecords: wrappedFetchTodayRecords,
    checkOutRecord: wrappedCheckoutRecord
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