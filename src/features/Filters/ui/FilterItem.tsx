import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import { Input } from '@/shared/ui/input/input';

import cls from './FilterItem.module.scss';

interface FilterItemProps {
  className?: string;
  title: string;
  selectedBrands?: string[];
  range?: boolean;
  maxPrice?: string;
  minPrice?: string;
  brands?: string[];
  onAddBrands?: (value: string) => void;
  onRemoveSelectedBrands?: (value: string) => void;
  onChangeMaxPrice?: (newPrice: string) => void;
  onChangeMinPrice?: (newPrice: string) => void;
}

export const FilterItem = (props: FilterItemProps) => {
  const {
    className,
    title,
    range,
    selectedBrands,
    maxPrice,
    minPrice,
    brands,
    onAddBrands,
    onRemoveSelectedBrands,
    onChangeMaxPrice,
    onChangeMinPrice,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onFilterItemClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const onInputChange = (value: string, checked?: boolean) => {
    if (checked) {
      onAddBrands?.(value);
    } else {
      onRemoveSelectedBrands?.(value);
    }
  };

  const onChangeRange = (values: number[]) => {
    onChangeMinPrice?.(String(values[0]));
    onChangeMaxPrice?.(String(values[1]));
  };

  const onChangeMinPriceHandler = (value: string) => {
    onChangeMinPrice?.(value);
  };

  const onChangeMaxPriceHandler = (value: string) => {
    onChangeMaxPrice?.(value);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const brandContent = () => {
    if (brands) {
      return (
        <div className={cls.list}>
          {Array.from(brands).map((attribute) => (
            <li key={attribute} className={cls.item}>
              <Input
                onChange={onInputChange}
                label={attribute}
                classNameLabel={cls.label}
                type="checkbox"
                value={attribute}
                checked={selectedBrands?.includes(attribute)}
              />
            </li>
          ))}
        </div>
      );
    }
    return null;
  };

  const priceContent = () => (
    <>
      <div className={cls.price_filters}>
        <Input
          max="500"
          value={minPrice}
          onChange={onChangeMinPriceHandler}
          maxLength={3}
          placeholder="0"
          type="number"
          icon={<BsCurrencyDollar className={cls.dollar} />}
        />
        <span>-</span>
        <Input
          max="500"
          value={maxPrice}
          placeholder="500"
          onChange={onChangeMaxPriceHandler}
          maxLength={3}
          type="number"
          icon={<BsCurrencyDollar className={cls.dollar} />}
        />
      </div>
      <RangeSlider
        value={[minPrice, maxPrice]}
        onInput={onChangeRange}
        min={0}
        max={500}
        className={cls.rangeInput}
      />
      <div className={cls.selectedRange}>
        <p className={cls.min}>{minPrice}</p>
        <p className={cls.max}>{maxPrice}</p>
      </div>
    </>
  );

  return (
    <div ref={ref} className={classNames(cls.FilterItem, className)}>
      <button type="button" onClick={onFilterItemClick} className={cls.header}>
        {title}
        <span
          className={classNames(
            cls.arrow,
            isOpen ? cls.arrow_up : cls.arrow_down,
          )}
        />
      </button>
      <div className={classNames(cls.content, { [cls.hidden]: !isOpen })}>
        {range ? priceContent() : brandContent()}
        <button
          aria-label="close"
          type="button"
          className={cls.close}
          onClick={onFilterItemClick}
        >
          <span />
          <span />
        </button>
      </div>
    </div>
  );
};
