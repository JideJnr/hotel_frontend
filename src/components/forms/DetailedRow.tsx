export const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="">
    <p className="text-gray-500 text-sm font-medium">{label}</p>
    <p className="font-medium text-lg mt-1 text-gray-800">{value}</p>
  </div>
);