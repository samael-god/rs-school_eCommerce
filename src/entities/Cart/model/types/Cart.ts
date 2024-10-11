import {
  CentPrecisionMoney,
  DiscountOnTotalPrice,
  LineItem,
} from '@commercetools/platform-sdk';

export interface CartSchema {
  products: LineItem[];
  isLoading?: boolean;
  error?: string;
  getCartLoadingProductsIds?: string[];
  totalPrice: CentPrecisionMoney;
  discountOnTotalPrice?: DiscountOnTotalPrice;
}
