"use client";

import React from "react";
import { Tariff } from "../types/types";

interface Props {
  tariff: Tariff;
  isSelected: boolean;
  onSelect: () => void;
}

export default function TariffCard({ tariff, isSelected, onSelect }: Props) {
  const discount = Math.round(((tariff.full_price - tariff.price) / tariff.full_price) * 100);

  return (
    <div
  className={`tariff-card ${tariff.period === "Навсегда" ? "forever-card" : ""} ${
    isSelected ? "selected" : ""
  }`}
  onClick={onSelect}
>
  {/* Левая колонка: название + цены */}
  <div className="forever-left">
    <div className="discount forever">{discount}%</div>
    {tariff.is_best && <div className="hit-label">ХИТ!</div>}
    <div className="name">{tariff.period}</div>
    <div className="price-section">
      <div className="price">{tariff.price} ₽</div>
      <div className="old-price">{tariff.full_price} ₽</div>
    </div>
  </div>

  {/* Правая колонка: описание */}
  <div className="forever-description">
    {tariff.text}
  </div>
</div>

  );
}
