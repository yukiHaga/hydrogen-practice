export const SHOPIFY_GRAPHQL_ENDPOINT = (
  storeDomain: string,
  storefrontApiVersion: string,
) => `https://${storeDomain}/api/${storefrontApiVersion}/graphql.json`;
