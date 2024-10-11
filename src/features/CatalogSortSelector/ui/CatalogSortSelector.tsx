import classNames from 'classnames';

import { Select } from '@/shared/ui/Select/Select';
import { SortingConsts, SortingParams } from '@/shared/const/SortingParams';

import cls from './CatalogSortSelector.module.scss';

interface CatalogSortSelectorProps {
  className?: string;
  onChangeOrder: (value: SortingConsts) => void;
}

export const CatalogSortSelector = (props: CatalogSortSelectorProps) => {
  const { className, onChangeOrder } = props;

  return (
    <div className={classNames(cls.CatalogSortSelector, className)}>
      <p className={cls.title}>Sort by: </p>
      <div className={cls.selectWrap}>
        <Select
          className={cls.select}
          optionValues={SortingParams}
          onChange={onChangeOrder}
        />
      </div>
    </div>
  );
};
