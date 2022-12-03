import React from 'react';

const UserProfile = (props) => {
  return (
    <div>
      <h1>{props.userName}</h1>
    </div>
  );
};

export default UserProfile;

export async function getServerSideProps(context) {
  // context in serverSideProps has access of multiple things

  const { params, req, res } = context;

  return {
    props: {
      userName: 'Sam',
    },
  };
}
