import {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import {useShop} from '@shopify/hydrogen/client';
import createCustomerAccessToken from '../apis/createCustomerAccessToken';
import fetchCustomer from '../apis/fetchCustomer';

type Customer = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

type UseCustomer = {
  email: string;
  password: string;
  customer: Customer | null;
  handleCreateCustomerAccessToken: (e: FormEvent<HTMLFormElement>) => void;
  handleChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function useCustomer(): UseCustomer {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customerAccessToken, setCustomerAccessToken] = useState<string | null>(
    null,
  );
  const [customer, setCustomer] = useState<Customer | null>(null);

  // ストアのドメインやStorefront APIのアクセストークンは、shopify.config.jsに設定したものが取得できる
  const {storeDomain, storefrontApiVersion, storefrontToken} = useShop();

  const handleCreateCustomerAccessToken = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const onSuccess = ({data: {data}}: any) =>
      setCustomerAccessToken(
        data.customerAccessTokenCreate.customerAccessToken.accessToken,
      );
    const onError = (res: any) => console.error(res);

    createCustomerAccessToken({
      email,
      password,
      storeDomain,
      storefrontApiVersion,
      storefrontToken,
      onSuccess,
      onError,
    });
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleFetchCustomer = () => {
    const onSuccess = ({data: {data}}: any) => setCustomer(data.customer);
    const onError = (res: any) => console.error(res);
    fetchCustomer({
      customerAccessToken,
      storeDomain,
      storefrontApiVersion,
      storefrontToken,
      onSuccess,
      onError,
    });
  };

  useEffect(() => {
    if (customerAccessToken == null) return;
    handleFetchCustomer();
  }, [customerAccessToken]);

  return {
    email,
    password,
    customer,
    handleCreateCustomerAccessToken,
    handleChangeEmail,
    handleChangePassword,
  };
}
