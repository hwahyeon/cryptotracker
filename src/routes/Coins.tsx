import { useRef } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import Navigator from "../components/Navigator";

// styled-components
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: auto; // 자식 요소에 따라 높이 조정
  padding: 20px 15px;
  display: flex;
  flex-direction: column; // 자식 요소 수직 정렬
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: #2f3640;
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

const Input = styled.input`
  width: 80%;
  padding: 10px 20px;
  margin-top: 25px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: ${(props) => props.theme.accentColor};
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
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
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.8),
      transparent
    );
    animation: ${shimmer} 2s infinite;
  }
`;

const SkeletonImage = styled.div`
  width: 35px;
  height: 35px;
  background-color: #8b8a8a;
  border-radius: 50%;
  margin-right: 10px;
`;

const SkeletonText = styled.div`
  width: 100px;
  height: 16px;
  background-color: #8b8a8a;
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
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCoins, setVisibleCoins] = useState<ICoin[]>([]);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      setVisibleCoins(data.slice(0, 20));
    }
  }, [data]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setVisibleCoins(data?.slice(0, 20) || []);
    } else {
      const filteredCoins = data?.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredCoins?.length) {
        setVisibleCoins(filteredCoins.slice(0, 20));
      } else {
        setVisibleCoins([]);
      }
    }
  }, [searchTerm, data]);

  // Infinity Scrolling - Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCoins((prevCoins) => {
            const isAllDataLoaded = prevCoins.length >= (data?.length ?? 0);
            if (isAllDataLoaded) {
              observer.unobserve(loadMoreRef.current as Element);
              return prevCoins;
            }
            const nextCoins =
              data?.slice(prevCoins.length, prevCoins.length + 20) || [];
            return [...prevCoins, ...nextCoins];
          });
        }
      },
      { threshold: 1 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => observer.disconnect();
  }, [visibleCoins.length, data]);

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Navigator />
      <Header>
        <Title>Cryptotracker</Title>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a coin"
        />
      </Header>
      {isLoading ? (
        Array.from({ length: 17 }, (_, index) => (
          <SkeletonCoin key={index}>
            <SkeletonImage />
            <SkeletonText />
          </SkeletonCoin>
        ))
      ) : visibleCoins.length > 0 ? (
        <CoinsList>
          {visibleCoins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name}
              </Link>
            </Coin>
          ))}
          <div ref={loadMoreRef} />
        </CoinsList>
      ) : searchTerm.trim() ? (
        <p>Not Found</p>
      ) : null}
    </Container>
  );
}
export default Coins;
