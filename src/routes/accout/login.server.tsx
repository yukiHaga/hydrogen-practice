import React, {Suspense} from 'react';
import LoginForm from './login.client';

const Login = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default Login;
