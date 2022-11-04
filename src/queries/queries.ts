// GraphQLのクエリは文字列としてファイル内で直接定義することができる。
// しかし、これはベストプラクティスではない。
// コードハイライトが効かない、型検査ができない、入力補完がされない、リクエストパラメータやレスポンスの型を手で定義しなくてはならないといった問題があるからである。
// 実際の開発では*.gqlファイルにクエリを定義して、graphql-codegenを使ってAPIクライアントとリクエストパラメータ、レスポンスの方を自動生成します。
export const CREATE_CUSTOMER_ACCESS_TOKEN_MUTATION = `
  mutation customerAccessTokenCreate($email: String!, $password: String!) {
    customerAccessTokenCreate(input: {email: $email, password: $password}) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
      }
    }
  }
`;

export const FETCH_CUSTOMER = `
  query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
    }
  }
`;
