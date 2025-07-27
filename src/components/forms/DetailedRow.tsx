export const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="font-medium text-lg mt-1 text-gray-800">{value}</p>
  </div>
);