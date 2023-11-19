
import  { useState, useEffect } from 'react';
import axios from 'axios';
import * as tf from '@tensorflow/tfjs';

const PricePrediction = ({ currencyName }) => {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${currencyName.toLowerCase()}/market_chart`,
          {
            params: {
              vs_currency: 'usd',
              days: '30', 
            },
          }
        );

        const priceData = response.data.prices.map((price) => price[1]);

        // Створіть тензор для вхідних даних (днів) та вихідних даних (цін)
        const days = tf.tensor1d([...Array(priceData.length).keys()]);
        const prices = tf.tensor1d(priceData);

        // Створіть модель лінійної регресії
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

        // Компілюйте модель
        model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

        // Навчіть модель на історичних даних
        await model.fit(days, prices, { epochs: 100 });

        // Передбачте ціну для наступного дня
        const nextDay = tf.tensor1d([priceData.length]);
        const prediction = model.predict(nextDay).dataSync()[0];

        setPrediction(prediction);
      } catch (error) {
        console.error(`Error predicting price for ${currencyName}:`, error);
      }
    };

    fetchPriceData();
  }, [currencyName]);

  return (
    <p>
      {currencyName}: {prediction ? `$${prediction.toFixed(2)}` : 'Немає даних про прогноз ціни'}
    </p>
  );
};

export default PricePrediction;
