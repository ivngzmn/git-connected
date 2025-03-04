import Axios, { AxiosResponse } from 'axios';
import tw from 'twin.macro';
import { css } from 'styled-components/macro'; //eslint-disable-line
import { UserCard } from '../components/UserCard';
import { myContext } from '../hooks/Context';
import React, { useEffect, useState, useContext } from 'react';
import { IUser } from '../interface';

const Container = tw.div`flex flex-col px-6 text-gray-100`;
const Content = tw.div`flex-row flex max-w-screen-xl mx-auto py-2`;
const Header = tw.h1`flex flex-col items-center text-5xl font-bold mb-0`;


export default function Featured() {
  const ctx = useContext(myContext);

  const [users, setUsers] = useState<IUser[]>();
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_ORIGIN}/api/user/getallusers`).then(
      (res: AxiosResponse) => {
        setUsers(res.data);
      }
    );
  }, [ctx]);

  if (!users) {
    return <p>Loading...</p>;
  }

  const randomIndex = Math.floor(Math.random() * users.length);
  const randomUser = users[randomIndex];

  return (
    <>
      <Container>
        <Header>Git to Know...</Header>
        <Content>
          <UserCard {...randomUser} />
        </Content>
      </Container>
    </>
  );
}
