import { ReactElement } from 'react';
import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';

import cls from './input.module.scss';

interface InputProps {
  className?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  register?: UseFormRegisterReturn<string>;
  classNameLabel?: string;
  checked?: boolean;
  icon?: ReactElement;
  onChange?: (value: string, checked?: boolean) => void;
  min?: string;
  max?: string;
  maxLength?: number;
}

export const Input = ({
  className = '',
  label = '',
  placeholder = '',
  value,
  type,
  register,
  icon,
  checked,
  maxLength,
  min,
  max,
  onChange,
  classNameLabel,
}: InputProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number' && maxLength && e.target.value.length > maxLength) {
      e.currentTarget.value = e.currentTarget.value.slice(0, maxLength);
    }
    if (type === 'number' && max && +e.target.value > +max) {
      e.currentTarget.value = '';
    }
    onChange?.(e.target.value, e.target.checked);
  };

  return (
    <label className={classNames(cls.label, classNameLabel)}>
      {label}
      <input
        min={min}
        max={max}
        checked={checked}
        onChange={onChangeHandler}
        className={classNames(cls.input, className)}
        placeholder={placeholder}
        value={value}
        type={type}
        {...register}
      />
      {icon}
    </label>
  );
};
