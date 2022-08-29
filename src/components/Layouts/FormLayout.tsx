import React from 'react';

import tw from 'twin.macro';

const FormLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div css={tw`text-center h-full flex justify-center items-center bg-slate-800`}>{children}</div>
  );
};

export default FormLayout;
