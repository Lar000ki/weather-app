import React from 'react';

const TodayForecast = ({ weatherData }) => {
    const today = new Date().toISOString().split('T')[0];
    const todayForecast = weatherData.filter(item => item.dt_txt.startsWith(today));

    return (
        <div className="today-forecast">
            <h1>Прогноз на сегодня</h1>
            {todayForecast.length > 0 ? (
                <div className="forecast-container">
                    {todayForecast.map((item, index) => (
                        <div key={index} className="forecast-item">
                            <p><strong>Время:</strong> {item.dt_txt.split(' ')[1]}</p>
                            <p><strong>Температура:</strong> {item.main.temp}°C</p>
                            <p><strong>Описание:</strong> {item.weather[0].description}</p>
                            <p><strong>Влажность:</strong> {item.main.humidity}%</p>
                            <p><strong>Скорость ветра:</strong> {item.wind.speed} м/с</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Нет данных для сегодняшнего прогноза.</p>
            )}
            <style jsx>{`
                .forecast-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                }
                .forecast-item {
                    border: 1px solid #ccc;
                    padding: 10px;
                    border-radius: 4px;
                    flex: 1;
                    min-width: 200px;
                    background-color: #202020;
                }
                .forecast-item p {
                    margin: 5px 0;
                }
                .today-forecast h3 {
                    margin-bottom: 10px;
                }
            `}</style>
        </div>
    );
};

export default TodayForecast;
