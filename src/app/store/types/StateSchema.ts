import { CartSchema } from '@/entities/Cart';
import { UserSchema } from '@/entities/User';
import { CatalogSchema } from '@/pages/CatalogPage';

export interface StateSchema {
  user: UserSchema;
  catalog: CatalogSchema;
  cart: CartSchema;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  state: StateSchema;
}
