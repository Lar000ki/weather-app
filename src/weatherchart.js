import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TodayForecast from './todayForecast';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label}`}</p>
                <p className="intro">{`Температура: ${payload[0].value}°C`}</p>
            </div>
        );
    }

    return null;
};

const WeatherChart = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [weatherDescription, setWeatherDescription] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Санкт-Петербург&appid=97c567d891d853bbed22405246ec8ff8&units=metric&lang=ru');
                setWeatherData(response.data.list);
                setWeatherDescription(response.data.list[0].weather[0].description);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
    }, []);

    const renderChart = () => {
        if (loading) {
            return <p>Loading...</p>;
        } else {
            return (
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={weatherData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="dt_txt" 
                            tickFormatter={(value, index) => {
                                const time = value.substring(11);
                                const date = value.substring(8, 10) + '.' + value.substring(5, 7);
                                return time === '00:00:00' ? date : '';
                            }} 
                        />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="main.temp" name="Температура (°C)" stroke="#ffffff" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            );
        }
    };

    return (
        <div>
            {renderChart()}
            <style jsx>{`
                .custom-tooltip {
                    background: white;
                    border: 1px solid #ccc;
                    padding: 10px;
                    color: black;
                }
                .custom-tooltip .label {
                    font-weight: bold;
                }
            `}</style>
            <TodayForecast weatherData={weatherData} />
        </div>
    );
};

export default WeatherChart;
