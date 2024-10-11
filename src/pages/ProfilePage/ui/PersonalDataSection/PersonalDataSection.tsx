import classNames from 'classnames';

import { useForm } from 'react-hook-form';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/shared/ui/input/input';
import { Button } from '@/shared/ui/button/button';
import { Validation, ValidationMessages } from '@/shared/const/Validation';
import { AppError } from '@/shared/ui/AppError/AppError';
import { SubmitData } from '@/features/Registration';

import cls from './PersonalDataSection.module.scss';

import { ChangePasswordModal } from '@/pages/ProfilePage/ui/PersonalDataSection/ChangePasswordModal/ChangePasswordModal';
import { UpdateCustomer } from '@/pages/ProfilePage/model/services/updateCustomer';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';

export interface UserData {
  username: string;
  surname: string;
  email: string;
  password: string;
  birthdate: string;
}
export interface PersonalDataProps {
  className?: string;
  user: UserData;
}

export const PersonalDataSection = ({ className, user }: PersonalDataProps) => {
  const { username, surname, email, password, birthdate } = user;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<SubmitData>({
    mode: 'onChange',
    defaultValues: {
      username,
      surname,
      email,
      password,
      birthdate,
    },
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);

  const closeModal = () => {
    setIsEditPassword(false);
  };
  const navigate = useNavigate();
  const onSubmit = useCallback(() => {
    setIsLoading(true);
    UpdateCustomer(getValues(), setIsEdit, navigate).then(() => {
      setIsLoading(false);
    });
  }, [getValues, setIsEdit, navigate]);
  return (
    <>
      {isLoading && <LoadingAnimation fullScreen />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classNames(cls.form, className)}
      >
        <fieldset className={`${cls.field__wrapper} ${!isEdit && cls.blocked}`}>
          <legend className={cls.field__heading}>Personal data</legend>
          <div className={cls.input__wrapper}>
            <Input
              placeholder="Valera"
              label="Name"
              className={`${errors.username && cls.invalid}`}
              type="text"
              register={register('username', {
                required: ValidationMessages.username.required,
                pattern: {
                  value: Validation.username,
                  message: ValidationMessages.username.error,
                },
              })}
            />
            {errors?.username &&
              AppError({ text: errors.username?.message ?? 'Error!' })}
          </div>
          <div className={cls.input__wrapper}>
            <Input
              placeholder="Kostin"
              label="Surname"
              className={errors.surname && cls.invalid}
              type="text"
              register={register('surname', {
                required: ValidationMessages.surname.required,
                pattern: {
                  value: Validation.surname,
                  message: ValidationMessages.surname.error,
                },
              })}
            />
            {errors?.surname &&
              AppError({ text: errors.surname?.message ?? 'Error!' })}
          </div>
          <div className={cls.input__wrapper}>
            <Input
              register={register('email', {
                required: ValidationMessages.email.required,
                pattern: {
                  value: Validation.email,
                  message: ValidationMessages.email.error,
                },
              })}
              type="text"
              placeholder="example@google.com"
              label="Email"
              className={errors.email && cls.invalid}
            />
            {errors?.email &&
              AppError({ text: errors.email?.message ?? 'Error!' })}
          </div>
          <div className={cls.input__wrapper}>
            <Input
              label="Birthdate"
              className={`${errors.birthdate && cls.invalid} ${cls.input__date}`}
              type="date"
              register={register('birthdate', {
                required: ValidationMessages.birthDate.required,
                validate: (value) => Validation.birthDate(value),
              })}
            />
            {errors?.birthdate &&
              AppError({ text: errors.birthdate?.message ?? 'Error!' })}
          </div>
        </fieldset>
        <div className={cls.button__wrapper}>
          <div className={cls.editButtons__wrapper}>
            <Button
              text="Edit"
              className={cls.button}
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            />
            {isEdit && (
              <Button
                text="Save"
                className={cls.button}
                onClick={handleSubmit(onSubmit)}
              />
            )}
          </div>
          <Button
            text="Change Password"
            className={cls.button}
            onClick={() => {
              setIsEditPassword(!isEditPassword);
            }}
          />
        </div>
      </form>
      {isEditPassword && <ChangePasswordModal closeModal={closeModal} />}
    </>
  );
};
