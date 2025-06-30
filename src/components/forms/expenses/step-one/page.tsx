import OnboardingTemplate from "../../../../components/templates/onboarding/onboarding";
import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/button/button";

const ExpenseStepOne = () => {
  const router = useIonRouter();

  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0], // Default to today
  });

  const [errors, setErrors] = useState({
    amount: '',
    category: '',
    description: '',
    date: '',
  });

  const handleNext = () => {
    const newErrors: any = {};

    if (!formData.amount || isNaN(parseFloat(formData.amount))) 
      newErrors.amount = "Valid amount is required.";
    
    if (!formData.category.trim()) 
      newErrors.category = "Category is required.";
    
    if (!formData.description.trim()) 
      newErrors.description = "Description is required.";
    
    if (!formData.date) 
      newErrors.date = "Date is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      sessionStorage.setItem("expenseData", JSON.stringify(formData));
      router.push("/expenses/create/steptwo", "forward", "push");
    } else {
      toast.error("Please fix the errors before continuing.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));
  };

  // Common expense categories
  const expenseCategories = [
    'Supplies',
    'Utilities',
    'Maintenance',
    'Staff',
    'Marketing',
    'Food & Beverage',
    'Cleaning',
    'Taxes',
    'Insurance',
    'Other'
  ];

  return (
    <OnboardingTemplate titleOne="Record New Expense">
      <div className="flex flex-col gap-4 w-full h-full p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-medium">Amount *</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="block w-full pl-8 rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-md sm:leading-6"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium">Date *</p>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-md sm:leading-6"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-medium">Category *</p>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-md sm:leading-6"
          >
            <option value="">Select category</option>
            {expenseCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-medium">Description *</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-md sm:leading-6"
            placeholder="What was this expense for?"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-medium">Receipt (Optional)</p>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, PDF (MAX. 5MB)</p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </label>
          </div>
        </div>

        <div className="mt-4">
          <Button text="Continue" onClick={handleNext} />
        </div>
      </div>
    </OnboardingTemplate>
  );
};

export default ExpenseStepOne;