import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import LoadingBar from "../components/LoadingBar"

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
  const { isLoading, isError, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
  fetchCoinHistory(coinId),
    // {
    //   refetchInterval: 1000,
    // }
  );
  console.log('*', data)

  return (
    <div>
      {isLoading ? (
        <LoadingBar />
      ) : isError ? (
        <p>데이터 에러</p>
      ) : (<table>
        <tr>
          <th>일자</th>
          <th>종가</th>
          <th>전일대비</th>
          <th>거래량</th>
        </tr>
        {data?.slice(1).map((e, index) => { // 첫 번째 요소를 제외
          const previousClose = data[index].close; // 현재 요소의 이전 요소 종가
          const difference = e.close - previousClose;
          
          return (
            <tr>
              <td>
                {new Date(Number(e.time_open) * 1000)
                  .toString()
                  .substring(4, 16)}
              </td>
              <td>{e.close}</td>
              <td>{difference.toFixed(2)}</td>
              <td>{e.volume}</td>
            </tr>
          );
        })}
      </table>
      )}
    </div>
  );
}

export default Price;
