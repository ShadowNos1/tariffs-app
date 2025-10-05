"use client";

import { useState, useEffect } from "react";
import TariffsGrid from "../components/TariffsGrid";
import { Tariff } from "../types/types";
import "../styles/globals.css";

export default function HomePage() {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [agree, setAgree] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(2 * 60);

  // Получаем тарифы с API и сортируем
  useEffect(() => {
    fetch("https://t-core.fit-hub.pro/Test/GetTariffs")
      .then(res => res.json())
      .then((data: Tariff[]) => {
        const forever = data.filter(t => t.period === "Навсегда");
        const other = data
          .filter(t => t.period !== "Навсегда")
          .sort((a, b) => {
            const order = ["3 месяца", "1 месяц", "1 неделя"];
            return order.indexOf(a.period) - order.indexOf(b.period);
          });
        const sorted = [...forever, ...other];
        setTariffs(sorted);

        const best = sorted.find(t => t.is_best);
        if (best) setSelectedPeriod(best.period);
      });
  }, []);

  // Таймер обратного отсчета
  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBuy = () => {
    if (!agree) {
      alert("Сначала согласитесь с условиями");
      return;
    }
    const selectedTariff = tariffs.find(t => t.period === selectedPeriod);
    if (!selectedTariff) {
      alert("Выберите тариф для покупки!");
      return;
    }
    alert(`Спасибо за покупку тарифа "${selectedTariff.period}"`);
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  const warning = timeLeft <= 30;

  return (
    <div className="container">
      <div className="header">
        <div>Успейте открыть пробную неделю</div>
        <div className={`timer ${warning ? "warning" : ""}`}>
          • {minutes} : {seconds} •
        </div>
      </div>

      <h2>Выбери подходящий для себя <span className="text">тариф</span></h2>

      <div className="content">
        <div className="image-section">
          <img src="/man.png" alt="Мужчина в форме" />
        </div>

        <div className="right-side">
          <TariffsGrid
            tariffs={tariffs}
            selectedPeriod={selectedPeriod}
            onSelect={setSelectedPeriod}
          />

          <div className="benefit-text">
            <span className="benefit-icon">!</span>
            Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц
          </div>

          <div className="terms">
            <div className="checkbox">
              <input
                type="checkbox"
                checked={agree}
                onChange={e => setAgree(e.target.checked)}
                id="agree"
              />
              <label htmlFor="agree">
                Я согласен с офертой <u>рекуррентных платежей</u> и <u>Политикой конфиденциальности</u>
              </label>
            </div>

            <button className="buy-button" onClick={handleBuy}>
              Купить
            </button>
            <div className="buy-text">Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.</div>
          </div>
        </div>
      </div>

      <div className="refund">
        <div className="refund-title">Гарантия возврата 30 дней</div>
        <p>
          Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели!
          Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получите видимых результатов.
        </p>
      </div>
    </div>
  );
}
