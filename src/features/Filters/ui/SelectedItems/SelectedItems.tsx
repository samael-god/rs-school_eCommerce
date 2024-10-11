import { RxCrossCircled, RxReload } from 'react-icons/rx';
import classNames from 'classnames';
import { Icon } from '@/shared/ui/Icon/Icon';
import cls from './SelectedItems.module.scss';

interface SelectedItemsProps {
  className?: string;
  attributes?: string[];
  maxPrice?: string;
  minPrice?: string;
  onRemoveSelectedFilter?: (value: string) => void;
  onRemoveAllFilters?: () => void;
  onRemoveSelectedPrice?: () => void;
}

export const SelectedItems = (props: SelectedItemsProps) => {
  const {
    className,
    attributes = [],
    maxPrice,
    minPrice,
    onRemoveSelectedFilter,
    onRemoveAllFilters,
    onRemoveSelectedPrice,
  } = props;

  const deleteSelectedItems = (value: string) => () => {
    onRemoveSelectedFilter?.(value);
  };

  const deletePriceFilter = () => {
    onRemoveSelectedPrice?.();
  };

  const deleteAllSelectedItems = () => {
    onRemoveAllFilters?.();
  };

  return (
    <div className={classNames(cls.selected_items, className)}>
      {(maxPrice || minPrice) && (
        <div className={cls.selected}>
          {`Price: ${minPrice || 0} - ${maxPrice || 500}$`}
          <RxCrossCircled className={cls.icon} onClick={deletePriceFilter} />
        </div>
      )}
      {Array.from(attributes).map((item) => (
        <div key={item} className={cls.selected}>
          {item}
          <Icon
            Svg={RxCrossCircled}
            className={cls.icon}
            onClick={deleteSelectedItems(item)}
          />
        </div>
      ))}
      {(Array.from(attributes).length !== 0 || maxPrice) && (
        <div className={classNames(cls.selected, cls.reset)}>
          Reset all
          <Icon
            Svg={RxReload}
            className={cls.icon}
            onClick={deleteAllSelectedItems}
          />
        </div>
      )}
    </div>
  );
};
