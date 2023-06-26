import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

type MarketSize = { year: number; size: number }[];

const calculateMarketSize = (
  startValue: number,
  endValue: number,
  startYear: number,
  endYear: number
): MarketSize => {
  const years = endYear - startYear;
  const cagr = (endValue / startValue) ** (1 / years) - 1;

  const marketSize: MarketSize = [];
  for (let year = startYear; year <= endYear; year += 1) {
    marketSize.push({
      year,
      size: startValue * (1 + cagr) ** (year - startYear),
    });
  }

  return marketSize;
};

export const CalculatorScreen: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const [startValue, setStartValue] = useState(265);
  const [endValue, setEndValue] = useState(1870);
  const [startYear, setStartYear] = useState(2021);
  const [endYear, setEndYear] = useState(2030);
  const [marketSize, setMarketSize] = useState<MarketSize | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const startValue = Number(params.get("startValue")) || 265;
    const endValue = Number(params.get("endValue")) || 1870;
    const startYear = Number(params.get("startYear")) || 2021;
    const endYear = Number(params.get("endYear")) || 2030;

    setStartValue(startValue);
    setEndValue(endValue);
    setStartYear(startYear);
    setEndYear(endYear);

    if (
      params.get("startValue") &&
      params.get("endValue") &&
      params.get("startYear") &&
      params.get("endYear")
    ) {
      setMarketSize(
        calculateMarketSize(startValue, endValue, startYear, endYear)
      );
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = calculateMarketSize(
      startValue,
      endValue,
      startYear,
      endYear
    );
    setMarketSize(result);
  };

  return (
    <Box mt={2}>
      <Stack component="form" onSubmit={handleSubmit} spacing={2}>
        <TextField
          label="Start Value"
          type="number"
          value={startValue}
          onChange={(event) => setStartValue(Number(event.target.value))}
          variant="outlined"
        />
        <TextField
          label="End Value"
          type="number"
          value={endValue}
          onChange={(event) => setEndValue(Number(event.target.value))}
          variant="outlined"
        />
        <TextField
          label="Start Year"
          type="number"
          value={startYear}
          onChange={(event) => setStartYear(Number(event.target.value))}
          variant="outlined"
        />
        <TextField
          label="End Year"
          type="number"
          value={endYear}
          onChange={(event) => setEndYear(Number(event.target.value))}
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Calculate
        </Button>
      </Stack>
      {!marketSize && (
        <Box
          width="100%"
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="80dvw">
            <p>
              このアプリケーションは、指定した期間内である市場の成長を計算するツールです。
            </p>
            <p>
              具体的には、複利年率（CAGR）を基に、開始年度から終了年度までの市場規模を予測します。
              ユーザーは開始値（開始年度の市場規模）、終了値（終了年度の市場規模）、開始年度、終了年度を入力します。
              これらの値は、URLのクエリパラメータからも提供することができます。
            </p>
            <p>
              「計算」ボタンをクリックすると、アプリケーションは以下の計算を行います：
            </p>
            <p>
              まず、CAGRを計算します。これは、終了値を開始値で割った後、年数で1を除した値から1を引くことで求められます。
            </p>
            <p>
              次に、このCAGRを用いて、開始年度から終了年度までの各年度の市場規模を計算します。
            </p>
            <p>
              これは開始値に
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                （1 + CAGR）
              </span>
              を各年度で累乗した値を掛けることで得られます。
            </p>
            <p>これを基に市場規模を推定します。</p>
            <p>
              CAGRの計算式は次のとおりです。
              <br />
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                V = P * (1 + r) ^ n
              </span>
            </p>
          </Box>
        </Box>
      )}
      {marketSize && (
        <div>
          <h2>Table</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell align="right">Market Size</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {marketSize.map(({ year, size }) => (
                  <TableRow key={year}>
                    <TableCell component="th" scope="row">
                      {year}
                    </TableCell>
                    <TableCell align="right">
                      {Math.ceil(size * 10) / 10}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <h2>Line Chart</h2>
          <LineChart
            width={width * 0.9}
            height={height * 0.4}
            data={marketSize}
            margin={{
              top: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="size"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      )}
    </Box>
  );
};
