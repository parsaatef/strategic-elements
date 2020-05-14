import React from 'react';

type Props = {
  error: object
};

const Error = ({ error }: Props) => <p>{error.message}</p>;

export default Error;
