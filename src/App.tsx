import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { useWindowDimensions } from './hooks/useWindowDimensions';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { LoadingCard } from './components/LoadingCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

type MarketSize = { year: number, size: number }[];

const calculateMarketSize = (startValue: number, endValue: number, startYear: number, endYear: number): MarketSize => {
    const years = endYear - startYear;
    const cagr = (endValue / startValue) ** (1 / years) - 1;

    const marketSize: MarketSize = [];
    for (let year = startYear; year <= endYear; year += 1) {
        marketSize.push({
            year,
            size: startValue * ((1 + cagr) ** (year - startYear))
        });
    }

    return marketSize;
};

const MarketSizeCalculator: React.FC = () => {
    const { width, height } = useWindowDimensions();
    const [startValue, setStartValue] = useState(265);
    const [endValue, setEndValue] = useState(1870);
    const [startYear, setStartYear] = useState(2021);
    const [endYear, setEndYear] = useState(2030);
    const [marketSize, setMarketSize] = useState<MarketSize | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setStartValue(Number(params.get('startValue')) || 265);
        setEndValue(Number(params.get('endValue')) || 1870);
        setStartYear(Number(params.get('startYear')) || 2021);
        setEndYear(Number(params.get('endYear')) || 2030);
    }, []);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = calculateMarketSize(startValue, endValue, startYear, endYear);
        setMarketSize(result);
    };

    return (
        <Box mt={2}>

        <Stack component="form" onSubmit={handleSubmit} spacing={2}>
            <TextField 
                label="Start Value" 
                type="number" 
                value={startValue} 
                onChange={event => setStartValue(Number(event.target.value))} 
                variant="outlined"
            />
            <TextField 
                label="End Value" 
                type="number" 
                value={endValue} 
                onChange={event => setEndValue(Number(event.target.value))} 
                variant="outlined"
            />
            <TextField 
                label="Start Year" 
                type="number" 
                value={startYear} 
                onChange={event => setStartYear(Number(event.target.value))} 
                variant="outlined"
            />
            <TextField 
                label="End Year" 
                type="number" 
                value={endYear} 
                onChange={event => setEndYear(Number(event.target.value))} 
                variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary">
                Calculate
            </Button>
        </Stack>
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
                                        <TableCell component="th" scope="row">{year}</TableCell>
                                        <TableCell align="right">{Math.ceil(size * 10) / 10}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <h2>Line Chart</h2>
                    <LineChart
                        width={width}
                        height={height * 0.4}
                        data={marketSize}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="size" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>
            )}
        </Box>
    );
};

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [hideApp, setHideApp] = useState(true); // for loading animation
  const { width, height } = useWindowDimensions();
  const [size, setSize] = useState(Math.min(width, height));
  useEffect(() => {
    setSize(Math.min(width, height) * 0.5);
  }, [width, height]);
  useEffect(() => {
    // 数秒後にアプリを表示する
    setTimeout(() => setHideApp(false), 1000);
    // 数秒後にローディングを解除する
    setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <Box className="app" width={width} height={height}>
      {loading ? <LoadingCard /> : <></>}
      {hideApp ? (
        <></>
      ) : (
        <MarketSizeCalculator />
      )}
    </Box>
  );
};
