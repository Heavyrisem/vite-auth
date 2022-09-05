import React, { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import axios, { AxiosError } from 'axios';
import tw from 'twin.macro';

import FormLayout from '@components/Layouts/FormLayout';
import { AuthContext } from '@contexts/AuthContext';
import { Form } from '@styles/global';

interface UserForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { updateToken } = useContext(AuthContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserForm>();
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>();

  const onSubmit = useCallback(
    (data: UserForm) => {
      axios
        .request<{ token: string }>({
          method: 'POST',
          url: '/api/user/login',
          data,
        })
        .then((res) => {
          if (res.data.token) {
            updateToken(res.data.token);
          }
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            setLoginErrorMessage(err.response?.data?.message || 'Unkown Error');
          }
        });
    },
    [updateToken],
  );

  return (
    <FormLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        css={tw`bg-white px-8 py-12 rounded-xl w-full max-w-md`}
      >
        <div css={tw`text-3xl text-center`}>Log In</div>
        <div css={tw`mt-8 flex flex-col`}>
          <div css={tw`mb-3`}>
            <input
              css={[Form.InputStyle]}
              placeholder="Email"
              {...register('email', {
                required: 'Required',
                validate: (email) => (!email.includes('@gmail.com') ? 'Only Gmail allowed' : true),
              })}
            />
            <div css={[Form.ErrorMessageStyle]}>{errors.email?.message}</div>
          </div>
          <div css={tw`mb-3`}>
            <input
              css={[Form.InputStyle]}
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Required' })}
            />
            <div css={[Form.ErrorMessageStyle]}>{errors.password?.message}</div>
          </div>
          <div css={[Form.ErrorMessageStyle]}>{loginErrorMessage}</div>
        </div>
        <button
          type="submit"
          //   onClick={handleLoginClick}
          css={tw`w-full text-lg px-3.5 py-2 bg-purple-500 border-2 rounded-lg text-white border-purple-500 cursor-pointer duration-200 hover:text-purple-500 hover:bg-white`}
        >
          Log In
        </button>
      </form>
    </FormLayout>
  );
};

export default Login;
