import React from "react";
import "./App.css";
import CoinsTable from "./components/CoinsTable";
import {cryptoData} from '../src/cryptoData.json'
const App = () => {


  const formatCurrency = (value) => (value ? `$${value}` : "Невідомо");
  const formatPercentage = (value) => (value ? `${value}%` : "Невідомо");
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "Невідомо";

  return (
    <div className="App">
      <h1>Crypto Material React Tabe</h1>

<CoinsTable />
      <h1>Crypto Table</h1>

     
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
              <th>
                Prediction
              </th>

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
