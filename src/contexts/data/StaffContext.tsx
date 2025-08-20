import { createContext, useContext, ReactNode, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useIonRouter } from '@ionic/react';
import { useStaffStore } from '../../services/stores/staffStore';

interface Staff {
  id: string;
  [key: string]: any;
}

interface StaffContextType {
  totalStaffCount: number;
  staffs: Staff[];
  staff: Staff | null;
  loading: boolean;
  error: string | null;
  createStaff: (payload: any) => Promise<void>;
  updateStaff: (id: string, payload: any) => Promise<void>;
  fetchStaffs: () => Promise<void>;
  fetchStaff: (id: string) => Promise<void>;
  fetchTotalStaffCount: () => Promise<void>;
  searchStaffs: (query: string) => Promise<void>; // <-- NEW
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export const StaffProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useIonRouter();
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [staff, setStaff] = useState<Staff | null>(null);
  const [totalStaffCount, setTotalStaffCount] = useState<number>(0);
  const [staffCount, setStaffCount] = useState<number>(0);

  const {
    loading,
    error,
    createStaff: storeCreateStaff,
    updateStaff: storeUpdateStaff,
    fetchStaff: storeFetchStaffs,
    getStaffById: storeGetStaffById,
    getTotalStaffCount: storeGetTotalStaffCount,
    searchStaff: storeSearchStaff, // <-- bring in from zustand
  } = useStaffStore();

  // =========================
  // WRAPPERS
  // =========================

  const wrappedCreateStaff = async (payload: any) => {
    try {
      const response = await storeCreateStaff(payload);
      if (response?.success && response.data) {
        toast.success('Staff created successfully');
        sessionStorage.removeItem("staffData");
        router.push(`/staff/${response?.data.id}`, 'root');
        
      } else {
        toast.error(`Creation failed: ${response.message}`);
        
      }
    } catch (error) {
      toast.error('Staff creation error');
      throw error;
    }
  };

  const wrappedUpdateStaff = async (id: string, payload: any) => {
    try {
      const response = await storeUpdateStaff(id, payload);
      if (response.success && response.data) {
        const updatedStaff = response.data as Staff;
        setStaffs(prev => prev.map(c => c.id === id ? updatedStaff : c));
        setStaff(updatedStaff);
        toast.success('Staff updated successfully');
        router.push(`/staff/${updatedStaff.id}`, 'forward');
       
      } else {
        toast.error(`Update failed: ${response.message}`);
        
      }
    } catch (error) {
      toast.error('Staff update error');
      throw error;
    }
  };

  const wrappedFetchStaffs = async () => {
    try {
      const response = await storeFetchStaffs();
      if (response?.success && response?.data) {
        setStaffs(response.data as Staff[]);
      }
    } catch (error) {
      toast.error('Failed to fetch staffs');
      
    }
  };

  const wrappedFetchStaff = async (id: string) => {
    try {
      const response = await storeGetStaffById(id);
      if (response.success && response.data) {
        setStaff(response.data as Staff);
      }
    } catch (error) {
      toast.error(`Failed to fetch staff ${id}`);
      
    }
  };

  const wrappedFetchTotalStaffCount = async () => {
    try {
      const response = await storeGetTotalStaffCount();
      if (response.success && response.data) {
        setTotalStaffCount(response.data.count);
      } else {
        toast.error(`Failed: ${response.message}`);
      }
    } catch (error) {
      console.error('Error fetching total count:', error);
    }
  };

  const wrappedSearchStaffs = async (query: string) => {
    try {
      const results = await storeSearchStaff(query);
      if (results && Array.isArray(results)) {
        setStaffs(results);
      }
      
    } catch (error) {
      toast.error('Staff search error');
      
    }
  };

  const wrappedAddSalary = async (query: string) => {
    try {
      const results = await storeSearchStaff(query);
      if (results && Array.isArray(results)) {
        setStaffs(results);
      }
      
    } catch (error) {
      toast.error('Staff search error');
      
    }
  };

    const wrappedGetSalaryHistory = async (query: string) => {
    try {
      const results = await storeSearchStaff(query);
      if (results && Array.isArray(results)) {
        setStaffs(results);
      }
      
    } catch (error) {
      toast.error('Staff search error');
      
    }
  };


  const contextValue = useMemo(() => ({
    totalStaffCount,
    staffs,
    staff,
    loading,
    error,
    createStaff: wrappedCreateStaff,
    updateStaff: wrappedUpdateStaff,
    fetchStaffs: wrappedFetchStaffs,
    fetchStaff: wrappedFetchStaff,
    fetchTotalStaffCount: wrappedFetchTotalStaffCount,
    searchStaffs: wrappedSearchStaffs, // <-- exposed in context
  }), [
    staffs,
    totalStaffCount,
    staffCount,
    staff,
    loading,
    error,
  ]);

  return (
    <StaffContext.Provider value={contextValue}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => {
  const context = useContext(StaffContext);
  if (!context) throw new Error('useStaff must be used within a StaffProvider');
  return context;
};
