import React, { useState } from 'react';
import { Address } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { AddressCard } from '@/shared/ui/AddressCard/AdressCard';
import { countriesList } from '@/shared/const/Countries';
import cls from './AddressesSection.module.scss';
import {
  AddressProps,
  EditAddressModal,
} from '@/pages/ProfilePage/ui/EditAddressModal/EditAddressModal';
import {
  ToastMessage,
  ToastTypes,
  userMessage,
} from '@/shared/const/ToastConfig';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';
import { deleteAddress } from '@/pages/ProfilePage/model/services/deleteAddress';

interface ShippingProps {
  addressesArr: Address[];
  defaultAddress: string;
  addressType: 'Shipping' | 'Billing';
}
export const AddressesSection = ({
  addressesArr,
  defaultAddress,
  addressType,
}: ShippingProps) => {
  const [addresses, setAddresses] = useState<Address[]>(addressesArr);
  const [defaultId, setDefaultId] = useState(defaultAddress);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewAddress, setIsNewAddress] = useState(false);
  const closeModal = () => {
    setEditMode(false);
    setIsNewAddress(false);
  };
  const [currentAddress, setCurrentAddress] = useState<AddressProps>({
    addressId: '',
    city: '',
    isDefault: false,
    country: '',
    postalCode: '',
    street: '',
  });
  const setDefaultAddress = (address: AddressProps) => {
    setCurrentAddress(address);
  };
  const openModal = (props: AddressProps) => {
    setDefaultAddress(props);
    setEditMode(true);
  };
  const updateAddresses = (
    newAddressesArr: Address[],
    newDefaultAddress: string | null,
  ) => {
    if (newDefaultAddress) {
      setDefaultId(newDefaultAddress);
    }
    setAddresses(newAddressesArr);
  };
  const navigate = useNavigate();
  const deleteAddressCard = async (addressId: string) => {
    try {
      setIsLoading(true);
      await deleteAddress(addressId, setAddresses, addressType);
      userMessage(ToastTypes.SUCCESS, 'Address deleted!');
    } catch (error) {
      if (error instanceof Error) {
        let errorMessage;
        switch (error.cause) {
          case 409: {
            errorMessage = 'Error occurred! Wrong client version.';
            break;
          }
          case 'LS': {
            errorMessage = error.message;
            navigate('/main');
            break;
          }
          default: {
            errorMessage = error.message;
            break;
          }
        }
        userMessage(
          ToastTypes.ERROR,
          errorMessage || ToastMessage.UNKNOWN_ERROR,
        );
      }
    } finally {
      closeModal();
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={cls.addressesWrapper}>
        {isLoading && <LoadingAnimation fullScreen />}
        {addresses.map(({ id, city, country, streetName, postalCode }) => {
          return (
            <AddressCard
              key={id}
              city={city ?? ''}
              country={
                countriesList.find(({ abbr }) => abbr === country)?.name ?? ''
              }
              street={streetName ?? ''}
              postalCode={postalCode ?? ''}
              defaultAddress={defaultId === id}
              addressId={id ?? ''}
              openModal={openModal}
              deleteAddress={deleteAddressCard}
            />
          );
        })}
        <button
          className={cls.addMore}
          aria-label="Add new address"
          type="button"
          onClick={() => {
            setIsNewAddress(true);
            openModal({
              country: 'Poland',
              city: '',
              street: '',
              postalCode: '',
              isDefault: false,
              addressId: '',
            });
          }}
        >
          <AiOutlinePlus size={100} className={cls.icon} />
        </button>
      </div>
      {editMode && (
        <EditAddressModal
          closeModal={closeModal}
          updateAddresses={updateAddresses}
          addressProps={currentAddress}
          addressType={addressType}
          newAddress={isNewAddress}
        />
      )}
    </>
  );
};
