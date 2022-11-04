import axios from 'axios';
import {SHOPIFY_GRAPHQL_ENDPOINT} from '../constants/url';
import {FETCH_CUSTOMER} from '../queries/queries';

type Args = {
  customerAccessToken: string | null;
  storeDomain: string;
  storefrontApiVersion: string;
  storefrontToken: string;
  onSuccess: any;
  onError: any;
};

export default async function fetchCustomer({
  customerAccessToken,
  storeDomain,
  storefrontApiVersion,
  storefrontToken,
  onSuccess,
  onError,
}: Args) {
  const url = SHOPIFY_GRAPHQL_ENDPOINT(storeDomain, storefrontApiVersion);
  const graphqlQuery = {
    query: FETCH_CUSTOMER,
    variables: {
      customerAccessToken,
    },
  };
  const headers = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': storefrontToken,
  };

  axios.post(url, graphqlQuery, {headers}).then(onSuccess).catch(onError);
}
