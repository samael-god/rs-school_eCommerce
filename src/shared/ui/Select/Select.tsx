import { ChangeEvent, FC } from 'react';
import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';

import cls from './select.module.scss';
import { SortingConsts } from '@/shared/const/SortingParams';

interface InputProps {
  className?: string;
  label?: string;
  register?: UseFormRegisterReturn<string>;
  optionValues: string[];
  onChange?: (value: SortingConsts) => void;
}

export const Select: FC<InputProps> = ({
  className = '',
  label = '',
  register,
  optionValues,
  onChange,
}) => {
  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as SortingConsts);
  };

  return (
    <>
      <label className={cls.label}>{label}</label>
      <select
        className={classNames(cls.select, className)}
        {...register}
        onChange={onChangeHandler}
      >
        {optionValues?.map((item) => (
          <option className={`${cls.option}`} key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
};
