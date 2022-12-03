import React from 'react';

const UserId = (props) => {
  return (
    <div>
      <h1>{props.id}</h1>
    </div>
  );
};

export default UserId;

export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.uid;

  console.log('Server Side Code');

  return {
    props: {
      id: 'userid-' + userId,
    },
  };
}
