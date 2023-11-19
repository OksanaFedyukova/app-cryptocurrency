import React, { useState, useEffect } from "react";
import "./App.css";
import CoinsTable from "./components/CoinsTable";

const fetchData = async () => {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

const App = () => {
  const [cryptoData, setCryptoData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const data = await fetchData();
        setCryptoData(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchDataAndSetState();
  }, []);

  const formatCurrency = (value) => (value ? `$${value}` : "Невідомо");
  const formatPercentage = (value) => (value ? `${value}%` : "Невідомо");
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "Невідомо";

  return (
    <div className="App">
      <h1>Crypto Table</h1>

      <CoinsTable />
      <h1>Crypto Table</h1>
      {error && <p>Error: {error.message}</p>}
      {cryptoData && (
        <table>
          <thead>
            <tr>
              <th>Назва</th>
              <th></th>
              <th>Ціна (USD)</th>
              <th>Ринковий обсяг (USD)</th>
              <th>Зміни за 24 години (%)</th>
              <th>Всього в обігу</th>
              <th>ATH Ціна (USD)</th>
              <th>ATH Зміни (%)</th>
              <th>ATH Дата</th>
              <th>Блок-час (хв)</th>
              <th>Ринковий обсяг 24г (USD)</th>
              <th>Макс. ціна 24г (USD)</th>
            </tr>
          </thead>{" "}
          <tbody>
            {cryptoData.map((coin) => (
              <tr key={coin.id}>
                <td>
                  <img
                    src={coin.image?.small || "placeholder-url"}
                    alt={coin.name}
                    style={{ width: "30px", height: "30px" }}
                  />
                </td>
                <td>{coin.name}</td>
                <td>{formatCurrency(coin?.market_data?.current_price?.usd)}</td>
                <td>{formatCurrency(coin?.market_data?.total_volume?.usd)}</td>
                <td>
                  {formatPercentage(
                    coin?.market_data?.price_change_percentage_24h
                  )}
                </td>
                <td>{coin?.market_data?.circulating_supply}</td>
                <td>{formatCurrency(coin?.market_data?.circulating_supply)}</td>
                <td>
                  {formatPercentage(
                    coin?.market_data?.market_cap_change_percentage_24h
                  )}
                </td>
                <td>{formatDate(coin?.last_updated)}</td>
                <td>{coin?.block_time_in_minutes || "Невідомо"}</td>
                <td>{formatCurrency(coin?.market_data?.total_volume?.usd)}</td>
                <td>{formatCurrency(coin?.market_data?.high_24h?.usd)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
