import { Navigate, useRouteLoaderData } from 'react-router-dom';
import { Customer } from '@commercetools/platform-sdk';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import classNames from 'classnames';
import { Header } from '@/widgets/Header/Header';
import cls from './ProfilePage.module.scss';
import { Footer } from '@/widgets/Footer/Footer';
import { PersonalDataSection } from '@/pages/ProfilePage/ui/PersonalDataSection/PersonalDataSection';
import { isLogged } from '@/shared/util/isLogged';
import { AddressesSection } from '@/pages/ProfilePage/ui/AddressesSection/AddressesSection';
import { getShippingAddresses } from '@/pages/ProfilePage/model/services/getShippingAddresses';
import { getBillingAddresses } from '@/pages/ProfilePage/model/services/getBillingAddresses';
import { PageIDs } from '@/app/providers/RouterConfig/RouteConfig';

export const ProfilePage = () => {
  const client = useRouteLoaderData(PageIDs.PROFILE) as Customer;
  if (!isLogged()) {
    return <Navigate to="/main" replace />;
  }
  const isDataLoaded = !!client;
  const shippingAddresses = getShippingAddresses(client) || [];
  const { defaultShippingAddressId } = client;
  const billingAddresses = getBillingAddresses(client) || [];
  const { defaultBillingAddressId } = client;
  const PersonalData = {
    username: client.firstName ?? '',
    surname: client.lastName ?? '',
    email: client.email ?? '',
    password: client.password ?? '',
    birthdate: client.dateOfBirth ?? '',
  };
  return (
    isDataLoaded && (
      <div className={cls.wrapper}>
        <Header />
        <main className={cls.mainBlock}>
          <Tabs forceRenderTabPanel className={cls.reactTabs}>
            <TabList className={classNames(cls.tabList)}>
              <Tab
                className={cls.tab}
                disabledClassName={classNames(cls.tab__disabled)}
                selectedClassName={classNames(cls.tab__selected)}
              >
                Personal info
              </Tab>
              <Tab
                className={cls.tab}
                disabledClassName={classNames(cls.tab__disabled)}
                selectedClassName={classNames(cls.tab__selected)}
              >
                Shipping Info
              </Tab>
              <Tab
                className={cls.tab}
                disabledClassName={classNames(cls.tab__disabled)}
                selectedClassName={classNames(cls.tab__selected)}
              >
                Billing Info
              </Tab>
            </TabList>

            <TabPanel>
              <PersonalDataSection user={PersonalData} />
            </TabPanel>
            <TabPanel>
              <AddressesSection
                addressesArr={shippingAddresses}
                defaultAddress={defaultShippingAddressId || ''}
                addressType="Shipping"
              />
            </TabPanel>
            <TabPanel>
              <AddressesSection
                addressesArr={billingAddresses}
                defaultAddress={defaultBillingAddressId || ''}
                addressType="Billing"
              />
            </TabPanel>
          </Tabs>
        </main>
        <Footer />
      </div>
    )
  );
};
