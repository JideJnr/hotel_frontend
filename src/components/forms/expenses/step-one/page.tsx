import { IonPage, useIonRouter } from "@ionic/react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  FormInput,
  FormTextarea,
  FormHeader,
  BackFormContainer,
  FileUpload,
} from "../../../../components/forms";
import Button from "../../../../components/button/button";
import FormSelect from "../../FormSelect";

const ExpenseStepOne = () => {
  const router = useIonRouter();

  const [formData, setFormData] = useState({
    amount: '',
    category: null as { value: string; label: string } | null,
    description: '',
    date: new Date().toISOString().split('T')[0],
    receiptBase64: '', // Add base64 field
  });

  const [errors, setErrors] = useState({
    amount: '',
    category: '',
    description: '',
    date: '',
  });

  const expenseCategories = [
    { id: 'supplies', name: 'Supplies' },
    { id: 'utilities', name: 'Utilities' },
    { id: 'maintenance', name: 'Maintenance' },
    { id: 'staff', name: 'Staff' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'food', name: 'Food & Beverage' },
    { id: 'cleaning', name: 'Cleaning' },
    { id: 'taxes', name: 'Taxes' },
    { id: 'insurance', name: 'Insurance' },
    { id: 'other', name: 'Other' },
  ];

  const validateForm = () => {
    const newErrors = {
      amount: !formData.amount || isNaN(parseFloat(formData.amount))
        ? 'Valid amount is required' : '',
      category: !formData.category
        ? 'Category is required' : '',
      description: !formData.description.trim()
        ? 'Description is required' : '',
      date: !formData.date
        ? 'Date is required' : '',
    };

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSave = {
        ...formData,
        categoryId: formData.category?.value,
        categoryName: formData.category?.label,
      };
      sessionStorage.setItem("expenseData", JSON.stringify(dataToSave));
      router.push("/register/expenses/steptwo", "forward", "push");
    } else {
      toast.error("Please fix the errors before continuing.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // File to base64 handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, receiptBase64: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <IonPage>
      <FormHeader />
      <BackFormContainer
        title="Record New Expense"
        subtitle="Step 1: Enter expense details"
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Amount *"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            error={errors.amount}
            required
          />

          <FormSelect
            label="Category *"
            name="category"
            value={formData.category}
            onChange={opt =>
              setFormData(fd => ({
                ...fd,
                category: opt
                  ? { value: String(opt.value), label: opt.label }
                  : null
              }))
            }
            options={expenseCategories.map(cat => ({
              value: cat.id,
              label: cat.name,
            }))}
            placeholder="Select category"
            error={errors.category}
            required
          />

          <FormTextarea
            label="Description *"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What was this expense for?"
            rows={3}
            error={errors.description}
            required
          />


          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Receipt (Optional)
            </label>
            <FileUpload
              accept=".jpg,.jpeg,.png,.pdf"
              maxSize={5}
              onChange={handleFileChange}
              preview={formData.receiptBase64}
              onRemove={() => setFormData(fd => ({ ...fd, receiptBase64: '' }))}
            />
          
          </div>

        
          <div className="pt-4">
            <Button text="Continue" type="submit" className="w-full" />
          </div>
        </form>
      </BackFormContainer>
    </IonPage>
  );
};

export default ExpenseStepOne;
