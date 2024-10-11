import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import cls from '@/pages/ProfilePage/ui/PersonalDataSection/ChangePasswordModal/ChangePasswordModal.module.scss';
import { Input } from '@/shared/ui/input/input';
import { Validation, ValidationMessages } from '@/shared/const/Validation';
import { AppError } from '@/shared/ui/AppError/AppError';
import { Button } from '@/shared/ui/button/button';
import { UpdatePassword } from '@/pages/ProfilePage/model/services/updatePassword';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';

interface ChangeModalProps {
  closeModal: () => void;
}
interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}

export const ChangePasswordModal = ({ closeModal }: ChangeModalProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<ChangePasswordData>({
    mode: 'onChange',
    defaultValues: {},
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [inputOldPassType, setInputOldPassType] = useState<'password' | 'text'>(
    'password',
  );
  const [inputNewPassType, setInputNewPassType] = useState<'password' | 'text'>(
    'password',
  );
  const [inputRepeatPassType, setInputRepeatPassType] = useState<
    'password' | 'text'
  >('password');
  const onSubmit = useCallback(() => {
    setIsLoading(true);
    UpdatePassword(getValues(), closeModal, navigate).then(() => {
      setIsLoading(false);
    });
  }, [closeModal, getValues, navigate]);

  return (
    <div className={cls.modal__wrapper}>
      {isLoading && <LoadingAnimation fullScreen />}
      <fieldset className={cls.field__wrapper}>
        <AiOutlineClose
          size={25}
          className={cls.closeIcon}
          onClick={() => {
            closeModal();
          }}
        />
        <legend className={cls.field__heading}>Change Password</legend>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classNames(cls.form)}
        >
          <div className={cls.input__wrapper}>
            <Input
              placeholder="Strongpassword21"
              label="Current password"
              className={errors.oldPassword && cls.invalid}
              type={inputOldPassType}
              icon={
                inputOldPassType === 'password' ? (
                  <AiFillEye
                    size={25}
                    className={cls.eye_icon}
                    onClick={() => setInputOldPassType('text')}
                  />
                ) : (
                  <AiFillEyeInvisible
                    size={25}
                    className={cls.eye_icon}
                    onClick={() => setInputOldPassType('password')}
                  />
                )
              }
              register={register('oldPassword', {
                required: ValidationMessages.password.required,
                pattern: {
                  value: Validation.password,
                  message: ValidationMessages.password.error,
                },
              })}
            />
            {errors?.oldPassword &&
              AppError({ text: errors.oldPassword?.message ?? 'Error!' })}
          </div>
          <div className={cls.input__wrapper}>
            <Input
              placeholder="Strongpassword21"
              label="New password"
              className={errors.newPassword && cls.invalid}
              type={inputNewPassType}
              icon={
                inputNewPassType === 'password' ? (
                  <AiFillEye
                    size={25}
                    className={cls.eye_icon}
                    onClick={() => setInputNewPassType('text')}
                  />
                ) : (
                  <AiFillEyeInvisible
                    size={25}
                    className={cls.eye_icon}
                    onClick={() => setInputNewPassType('password')}
                  />
                )
              }
              register={register('newPassword', {
                required: ValidationMessages.password.required,
                pattern: {
                  value: Validation.password,
                  message: ValidationMessages.password.error,
                },
                onChange: () => {
                  setValue('repeatPassword', `${getValues('repeatPassword')}`, {
                    shouldValidate: true,
                  });
                },
              })}
            />
            {errors?.newPassword &&
              AppError({ text: errors.newPassword?.message ?? 'Error!' })}
          </div>
          <div className={cls.input__wrapper}>
            <Input
              placeholder="Strongpassword21"
              label="Confirm password"
              className={errors.repeatPassword && cls.invalid}
              type={inputRepeatPassType}
              icon={
                inputRepeatPassType === 'password' ? (
                  <AiFillEye
                    size={25}
                    className={cls.eye_icon}
                    onClick={() => setInputRepeatPassType('text')}
                  />
                ) : (
                  <AiFillEyeInvisible
                    size={25}
                    className={cls.eye_icon}
                    onClick={() => setInputRepeatPassType('password')}
                  />
                )
              }
              register={register('repeatPassword', {
                required: ValidationMessages.password.required,
                validate: (value) =>
                  Validation.confirmPassword(value, getValues('newPassword')),
              })}
            />
            {errors?.repeatPassword &&
              AppError({ text: errors.repeatPassword?.message ?? 'Error!' })}
          </div>
          <Button
            text="Confirm"
            className={cls.button}
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </fieldset>
    </div>
  );
};
