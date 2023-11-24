import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import LoadingBar from "../components/LoadingBar";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data, isError } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
    // {
    //   refetchInterval: 1000,
    // }
  );

  const exceptData = data ?? [];
  const chartData = exceptData?.map((e) => {
    return {
      x: new Date(e.time_close * 1000),
      y: [
        parseFloat(e.open),
        parseFloat(e.high),
        parseFloat(e.low),
        parseFloat(e.close),
      ],
    };
  });

  return (
    <div>
      {isLoading ? (
        <LoadingBar />
      ) : isError ? (
        <p>데이터 에러</p>
      ) : (
        <ApexChart
          type="candlestick"
          series={[{ data: chartData! }]}
          options={{
            yaxis: {
              tooltip: {
                enabled: true,
              },
              labels: {
                style: {},
              },
            },
            xaxis: {
              type: "datetime",
              labels: {
                style: {},
              },
            },
            colors: ["#6A82FB"],
          }}
        />
      )}
    </div>
  );
}

export default Chart;
