// utils/filterData.ts

export const filterData = (record: any[], formDataValue: string) => {
    if (formDataValue === "all") {
      return record; // Return the full array when no filter is needed
    }
    return record.filter(item => item.location === formDataValue);
  };
  