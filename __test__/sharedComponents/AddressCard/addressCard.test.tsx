import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddressCard } from '@/shared/ui/AddressCard/AdressCard';

describe('AddressCard test.', () => {
  it('Should render an AddressCard with conditional class.', () => {
    const testProps = {
      addressId: 'testId',
      country: 'Poland',
      city: 'Minsk',
      street: 'Poleza',
      postalCode: '232313',
      defaultAddress: true,
      openModal: () => {},
      deleteAddress: () => {},
    };
    render(<AddressCard {...testProps} />);
    const addressCard = screen.getByTestId('addressCard');
    expect(addressCard).toHaveClass('defaultAddress');
    expect(screen.getByText('Country: Poland')).toBeInTheDocument();
  });
  it('Should fire callback on icons click', () => {
    const testOpenModal = jest.fn();
    const testDeleteAddress = jest.fn();
    const testProps = {
      addressId: 'testId',
      country: 'Poland',
      city: 'Minsk',
      street: 'Poleza',
      postalCode: '232313',
      defaultAddress: false,
      openModal: () => {
        testOpenModal();
      },
      deleteAddress: () => {
        testDeleteAddress();
      },
    };
    render(<AddressCard {...testProps} />);
    const closeIcon = screen.getByTestId('closeIcon');
    const editIcon = screen.getByTestId('editIcon');
    fireEvent.click(closeIcon);
    fireEvent.click(editIcon);
    expect(testOpenModal).toHaveBeenCalled();
    expect(testDeleteAddress).toHaveBeenCalled();
  });
});
