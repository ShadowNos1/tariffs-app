"use client";

import React, { useEffect } from "react";
import TariffCard from "./TariffCard";
import { Tariff } from "../types/types";

interface Props {
  tariffs: Tariff[];
  selectedPeriod: string | null;
  onSelect: (period: string) => void;
}

export default function TariffsGrid({ tariffs, selectedPeriod, onSelect }: Props) {
  // Устанавливаем выбранный тариф по умолчанию после загрузки тарифов
  useEffect(() => {
    const bestTariff = tariffs.find(t => t.is_best);
    if (bestTariff) onSelect(bestTariff.period);
  }, [tariffs, onSelect]);

  const foreverTariff = tariffs.find(t => t.period === "Навсегда");
  const otherTariffs = tariffs.filter(t => t.period !== "Навсегда");

  return (
    <div className="tariffs">
      {/* Главная карточка Навсегда сверху */}
      {foreverTariff && (
        <TariffCard
          key={foreverTariff.period}
          tariff={foreverTariff}
          isSelected={selectedPeriod === foreverTariff.period}
          onSelect={() => onSelect(foreverTariff.period)}
        />
      )}

      {/* Остальные тарифы снизу в ряд */}
      <div className="tariff-row">
        {otherTariffs.map(t => (
          <TariffCard
            key={t.period}
            tariff={t}
            isSelected={selectedPeriod === t.period}
            onSelect={() => onSelect(t.period)}
          />
        ))}
      </div>
    </div>
  );
}
