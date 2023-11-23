import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from 'styled-components';
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import Navigator from "../components/Navigator"

// styled-components
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  margin: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const SkeletonCoin = styled.li`
  background-color: #eee;
  border-radius: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: 1;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
    animation: ${shimmer} 2s infinite;
  }
`;

const SkeletonImage = styled.div`
  width: 35px;
  height: 35px;
  background-color: #ddd;
  border-radius: 50%;
  margin-right: 10px;
`;

const SkeletonText = styled.div`
  width: 100px;
  height: 16px;
  background-color: #ddd;
`;

// interface for TypeScript
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>
          Coins
        </title>
      </Helmet>
      <Navigator />
      <Header>
        <Title>Cryptotracker</Title>
      </Header>
      {isLoading ? (
        Array.from({ length: 17 }, (_, index) => (
          <SkeletonCoin key={index}>
            <SkeletonImage />
            <SkeletonText />
          </SkeletonCoin>
        ))
      ) : (
        <CoinsList>
          {data?.slice(0, 200).map((coin) => (
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`} state={{ name: coin.name }}>
              <Img
                src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
              />
              {coin.name}
            </Link>
          </Coin>))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
