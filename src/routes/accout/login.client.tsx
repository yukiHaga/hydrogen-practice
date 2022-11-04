import useCustomer from '../../hooks/useCustomer';

const LoginForm = () => {
  const {
    email,
    password,
    customer,
    handleCreateCustomerAccessToken,
    handleChangeEmail,
    handleChangePassword,
  } = useCustomer();

  return (
    <>
      <form onSubmit={handleCreateCustomerAccessToken}>
        <div className="mb-4">
          <input
            className="border focus:outline-none focus:shadow-outline"
            type="email"
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        <div className="mb-4">
          <input
            className="border focus:outline-none focus:shadow-outline"
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        <button className="border" type="submit">
          ログイン
        </button>
      </form>
      <div>
        <div>
          名前: {customer?.lastName} {customer?.firstName}
        </div>
      </div>
      <div>メールアドレス: {customer?.email}</div>
    </>
  );
};

export default LoginForm;
