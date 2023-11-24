import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import styled from "styled-components";
import LoadingBar from "../components/LoadingBar";

// styled-components
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.9em;
`;

const StyledHeader = styled.th`
  background-color: #f4f4f4;
  color: #333;
  padding: 10px 15px;
  border-bottom: 2px solid #ddd;
`;

const StyledRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
    color: black;
  }
`;

const StyledCell = styled.td`
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
`;

// TypeScript
interface IHistorical {
  time_open: number;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Price({ coinId }: ChartProps) {
  const { isLoading, isError, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 1000,
    }
  );

  return (
    <div>
      {isLoading ? (
        <LoadingBar />
      ) : isError ? (
        <p>데이터 에러</p>
      ) : (
        <StyledTable>
          <tr>
            <StyledHeader>일자</StyledHeader>
            <StyledHeader>종가</StyledHeader>
            <StyledHeader>전일대비</StyledHeader>
            <StyledHeader>거래량</StyledHeader>
          </tr>
          {data
            ?.slice()
            .sort((a, b) => b.time_open - a.time_open)
            .map((e, index, sortedData) => {
              if (index < sortedData.length - 1) {
                const previousClose = sortedData[index + 1].close;
                const difference = e.close - previousClose;

                return (
                  <StyledRow key={e.time_open}>
                    <StyledCell>
                      {new Date(Number(e.time_open) * 1000)
                        .toString()
                        .substring(4, 16)}
                    </StyledCell>
                    <StyledCell>{e.close}</StyledCell>
                    <StyledCell
                      style={{ color: difference < 0 ? "red" : "blue" }}
                    >
                      {difference.toFixed(2)}
                    </StyledCell>
                    <StyledCell>{e.volume}</StyledCell>
                  </StyledRow>
                );
              }
              return null;
            })}
        </StyledTable>
      )}
    </div>
  );
}

export default Price;
