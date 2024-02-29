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
      refetchInterval: 3000,
    }
  );

  if (isLoading) return <LoadingBar />;
  if (isError || !Array.isArray(data))
    return <p>Sorry, there was a temporary issue fetching the data. Please wait a moment.</p>;

  // Data (Daily fluctuation rate)
  const sortedData = data.slice().sort((a, b) => b.time_open - a.time_open);

  return (
    <div>
      <StyledTable>
        <tbody>
          <tr>
            <StyledHeader>Date</StyledHeader>
            <StyledHeader>Closing Price</StyledHeader>
            <StyledHeader>Daily fluctuation rate</StyledHeader>
            <StyledHeader>Volume</StyledHeader>
          </tr>
          {sortedData.map((e, index) => {
            const previousClose =
              index < sortedData.length - 1
                ? sortedData[index + 1].close
                : null;
            const difference = previousClose ? e.close - previousClose : 0;

            return (
              <StyledRow key={e.time_open}>
                <StyledCell>
                  {new Date(Number(e.time_open) * 1000)
                    .toString()
                    .substring(4, 16)}
                </StyledCell>
                <StyledCell>{e.close}</StyledCell>
                <StyledCell style={{ color: difference < 0 ? "red" : "blue" }}>
                  {difference.toFixed(2)}
                </StyledCell>
                <StyledCell>{Number(e.volume).toFixed(2)}</StyledCell>
              </StyledRow>
            );
          })}
        </tbody>
      </StyledTable>
    </div>
  );
}

export default Price;
