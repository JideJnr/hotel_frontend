import { IonIcon } from '@ionic/react';
import { arrowUp, arrowDown, card, home } from 'ionicons/icons';

type ItemType = 'debit' | 'credit' | 'card' | 'active' | 'inactive';

interface GenericListItem<T extends ItemType> {
  name: string;
  value: number;
  time?: string;
  type: T;
  id: string;
}

const iconMap: Record<ItemType, string> = {
  debit: arrowUp,
  credit: arrowDown,
  card: card,
  active: home,
  inactive: home,
};

const bgMap: Record<ItemType, string> = {
  debit: 'bg-red-100',
  credit: 'bg-green-100',
  card: 'bg-gray-200',
  active: 'bg-green-100',
  inactive: 'bg-gray-200',
};

const textMap: Record<ItemType, string> = {
  debit: 'text-red-600',
  credit: 'text-green-600',
  card: 'text-gray-800',
  active: 'text-green-600',
  inactive: 'text-gray-600',
};

const typeLabelMap: Record<ItemType, string> = {
  debit: 'Debit',
  credit: 'Credit',
  card: 'Card',
  active: 'Active',
  inactive: 'Inactive',
};

interface GenericListProps<T extends ItemType> {
  items: GenericListItem<T>[];
  title: string;
  valuePrefix?: string;
  showTypeLabel?: boolean;
  showTime?: boolean;
}

const GenericList = <T extends ItemType>({
  items,
  title,
  valuePrefix = '₦',
  showTypeLabel = false,
  showTime = true,
}: GenericListProps<T>) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-4">
      <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between rounded-lg p-3 bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${bgMap[item.type]}`}>
              <IonIcon icon={iconMap[item.type]} className={`text-xl ${textMap[item.type]}`} />
            </div>
            <div>
              <p className="font-medium text-sm text-gray-900">{item.name}</p>
              {showTime && item.time && <p className="text-xs text-gray-400">{item.time}</p>}
              {showTypeLabel && (
                <p className={`text-xs ${textMap[item.type]}`}>
                  {typeLabelMap[item.type]}
                </p>
              )}
            </div>
          </div>
          <div className={`text-sm font-semibold ${textMap[item.type]}`}>
            {item.type === 'debit' ? '-' : item.type === 'credit' ? '+' : ''}
            {valuePrefix}
            {item.value.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GenericList;