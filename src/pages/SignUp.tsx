import React, { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import axios, { AxiosError } from 'axios';
import tw from 'twin.macro';

import FormLayout from '@components/Layouts/FormLayout';
import { AuthContext } from '@contexts/AuthContext';
import { Form } from '@styles/global';

interface SignUpForm {
  email: string;
  password: string;
  name: string;
}

const SignUp: React.FC = () => {
  const { updateToken } = useContext(AuthContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpForm>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const onSubmit = useCallback(async (data: SignUpForm) => {
    axios
      .request<{ result: boolean }>({
        method: 'POST',
        url: '/api/user/register',
        data,
      })
      .then((res) => {
        if (res.data.result === true) {
          window.location.href = '/login';
        } else throw Error('계정 생성에 실패했습니다. 잠시 후 다시 시도해 주세요');
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          console.log(err);
          setErrorMessage(err.response?.data?.message || 'Unkown Error');
        }
      });
  }, []);

  return (
    <FormLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        css={tw`bg-white px-6 py-12 rounded-lg w-full max-w-lg`}
      >
        <div css={tw`text-2xl text-center`}>Sign Up</div>
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
          <div css={tw`mb-3`}>
            <input
              css={[Form.InputStyle]}
              type="text"
              placeholder="Name"
              {...register('name', { required: 'Required' })}
            />
            <div css={[Form.ErrorMessageStyle]}>{errors.password?.message}</div>
          </div>
          <div css={[Form.ErrorMessageStyle]}>{errorMessage}</div>
        </div>
        <button
          type="submit"
          //   onClick={handleLoginClick}
          css={tw`w-full text-lg px-3.5 py-2 bg-purple-500 border-2 rounded-lg text-white border-purple-500 cursor-pointer duration-200 hover:text-purple-500 hover:bg-white`}
        >
          Sign Up
        </button>
      </form>
    </FormLayout>
  );
};

export default SignUp;
