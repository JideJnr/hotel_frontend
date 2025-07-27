import { createContext, useContext, ReactNode } from 'react';
import { useRecordStore } from '../stores/recordStore';

interface RecordContextType {

}

const RecordContext = createContext<RecordContextType | undefined>(undefined);

const { records, record ,createRecord,fetchRecords, loading, error } = useRecordStore();

export const RecordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
 
  return (
    <RecordContext.Provider value={{
      record,
      records,
      createRecord,
      fetchRecords,
      loading,
      error
    }}>
      {children}
    </RecordContext.Provider>
  );
};

export const useRecord = () => {
  const context = useContext(RecordContext);
  if (!context) throw new Error('useRecord must be used within an RecordProvider');
  return context;
};
