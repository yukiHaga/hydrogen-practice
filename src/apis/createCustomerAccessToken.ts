import axios from 'axios';
import {SHOPIFY_GRAPHQL_ENDPOINT} from '../constants/url';
import {CREATE_CUSTOMER_ACCESS_TOKEN_MUTATION} from '../queries/queries';

type Args = {
  email: string;
  password: string;
  storeDomain: string;
  storefrontApiVersion: string;
  storefrontToken: string;
  onSuccess: any;
  onError: any;
};

export default async function createCustomerAccessToken({
  email,
  password,
  storeDomain,
  storefrontApiVersion,
  storefrontToken,
  onSuccess,
  onError,
}: Args) {
  const url = SHOPIFY_GRAPHQL_ENDPOINT(storeDomain, storefrontApiVersion);
  const graphqlQuery = {
    query: CREATE_CUSTOMER_ACCESS_TOKEN_MUTATION,
    variables: {
      email,
      password,
    },
  };
  const headers = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': storefrontToken,
  };

  axios.post(url, graphqlQuery, {headers}).then(onSuccess).catch(onError);
}
