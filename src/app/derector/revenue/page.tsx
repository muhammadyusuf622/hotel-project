"use client";

import React, { useState } from "react";
import cls from "../Derector.module.css";

interface RevenueData {
  period: string;
  revenue: number;
  expenses: number;
  profit: number;
  growth: number;
}

interface BranchRevenue {
  name: string;
  revenue: number;
  percentage: number;
  growth: number;
}

const mockRevenueData: RevenueData[] = [
  {
    period: "Yanvar",
    revenue: 125000,
    expenses: 45000,
    profit: 80000,
    growth: 12.5,
  },
  {
    period: "Fevral",
    revenue: 135000,
    expenses: 48000,
    profit: 87000,
    growth: 8.0,
  },
  {
    period: "Mart",
    revenue: 142000,
    expenses: 52000,
    profit: 90000,
    growth: 5.2,
  },
  {
    period: "Aprel",
    revenue: 138000,
    expenses: 50000,
    profit: 88000,
    growth: -2.8,
  },
  {
    period: "May",
    revenue: 150000,
    expenses: 55000,
    profit: 95000,
    growth: 8.7,
  },
  {
    period: "Iyun",
    revenue: 165000,
    expenses: 60000,
    profit: 105000,
    growth: 10.0,
  },
];

const mockBranchRevenue: BranchRevenue[] = [
  { name: "Asosiy filial", revenue: 85000, percentage: 51.5, growth: 15.2 },
  { name: "Shahar markazi", revenue: 65000, percentage: 39.4, growth: 8.7 },
  { name: "Chorvoq filiali", revenue: 15000, percentage: 9.1, growth: 5.3 },
];

const RevenuePage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("monthly");

  const currentMonth = mockRevenueData[mockRevenueData.length - 1];
  const totalRevenue = mockRevenueData.reduce(
    (sum, data) => sum + data.revenue,
    0
  );
  const totalExpenses = mockRevenueData.reduce(
    (sum, data) => sum + data.expenses,
    0
  );
  const totalProfit = totalRevenue - totalExpenses;

  return (
    <div className={cls.container}>
      <div className={cls.header}>
        <h1 className={cls.title}>Daromad statistikasi</h1>
        <p className={cls.subtitle}>
          Hotel daromadlari va xarajatlar monitoringi
        </p>
      </div>

      {/* Period Selector */}
      <div
        style={{
          marginBottom: "30px",
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <button
          className={`${cls.actionButton} ${
            selectedPeriod === "daily" ? "" : cls.actionButtonSecondary
          }`}
          onClick={() => setSelectedPeriod("daily")}
        >
          Kunlik
        </button>
        <button
          className={`${cls.actionButton} ${
            selectedPeriod === "weekly" ? "" : cls.actionButtonSecondary
          }`}
          onClick={() => setSelectedPeriod("weekly")}
        >
          Haftalik
        </button>
        <button
          className={`${cls.actionButton} ${
            selectedPeriod === "monthly" ? "" : cls.actionButtonSecondary
          }`}
          onClick={() => setSelectedPeriod("monthly")}
        >
          Oylik
        </button>
        <button
          className={`${cls.actionButton} ${
            selectedPeriod === "yearly" ? "" : cls.actionButtonSecondary
          }`}
          onClick={() => setSelectedPeriod("yearly")}
        >
          Yillik
        </button>
      </div>

      {/* Main Revenue Cards */}
      <div className={cls.dashboardGrid} style={{ marginBottom: "30px" }}>
        <div className={cls.card}>
          <div className={cls.cardHeader}>
            <div
              className={cls.cardIcon}
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
              }}
            >
              💰
            </div>
            <h3 className={cls.cardTitle}>Jami daromad</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>
              ${currentMonth.revenue.toLocaleString()}
            </div>
            <div className={cls.statLabel}>bu oy</div>
            <div
              style={{
                marginTop: "10px",
                color: currentMonth.growth >= 0 ? "#38a169" : "#e53e3e",
              }}
            >
              {currentMonth.growth >= 0 ? "+" : ""}
              {currentMonth.growth}% o'tgan oydan
            </div>
          </div>
        </div>

        <div className={cls.card}>
          <div className={cls.cardHeader}>
            <div
              className={cls.cardIcon}
              style={{
                background: "linear-gradient(135deg, #48bb78, #38a169)",
              }}
            >
              📈
            </div>
            <h3 className={cls.cardTitle}>Sof foyda</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>
              ${currentMonth.profit.toLocaleString()}
            </div>
            <div className={cls.statLabel}>bu oy</div>
            <div style={{ marginTop: "10px", color: "#38a169" }}>
              {((currentMonth.profit / currentMonth.revenue) * 100).toFixed(1)}%
              foyda
            </div>
          </div>
        </div>

        <div className={cls.card}>
          <div className={cls.cardHeader}>
            <div
              className={cls.cardIcon}
              style={{
                background: "linear-gradient(135deg, #ed8936, #dd6b20)",
              }}
            >
              💸
            </div>
            <h3 className={cls.cardTitle}>Xarajatlar</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>
              ${currentMonth.expenses.toLocaleString()}
            </div>
            <div className={cls.statLabel}>bu oy</div>
            <div style={{ marginTop: "10px", color: "#e53e3e" }}>
              {((currentMonth.expenses / currentMonth.revenue) * 100).toFixed(
                1
              )}
              % daromaddan
            </div>
          </div>
        </div>

        <div className={cls.card}>
          <div className={cls.cardHeader}>
            <div
              className={cls.cardIcon}
              style={{
                background: "linear-gradient(135deg, #9f7aea, #805ad5)",
              }}
            >
              📊
            </div>
            <h3 className={cls.cardTitle}>O'sish darajasi</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>{currentMonth.growth}%</div>
            <div className={cls.statLabel}>o'tgan oydan</div>
            <div
              style={{
                marginTop: "10px",
                color: currentMonth.growth >= 0 ? "#38a169" : "#e53e3e",
              }}
            >
              {currentMonth.growth >= 0 ? "O'sish" : "Pasayish"}
            </div>
          </div>
        </div>
      </div>

      {/* Branch Revenue */}
      <div className={cls.chartContainer}>
        <h3 className={cls.chartTitle}>Filiallar bo'yicha daromad</h3>
        <div className={cls.chartGrid}>
          {mockBranchRevenue.map((branch, index) => (
            <div key={index} className={cls.chartItem}>
              <div className={cls.chartValue}>{branch.name}</div>
              <div className={cls.chartLabel}>
                ${branch.revenue.toLocaleString()}
              </div>
              <div
                style={{
                  marginTop: "10px",
                  color: branch.growth >= 0 ? "#38a169" : "#e53e3e",
                }}
              >
                {branch.growth}% o'sish
              </div>
              <div className={cls.progressBar}>
                <div
                  className={cls.progressFill}
                  style={{ width: `${branch.percentage}%` }}
                ></div>
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#718096",
                  marginTop: "5px",
                }}
              >
                {branch.percentage}% umumiy daromaddan
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Revenue Table */}
      <div className={cls.tableContainer}>
        <h3 className={cls.tableTitle}>Oylik daromad statistikasi</h3>
        <table className={cls.table}>
          <thead>
            <tr>
              <th>Oy</th>
              <th>Daromad</th>
              <th>Xarajatlar</th>
              <th>Sof foyda</th>
              <th>O'sish</th>
              <th>Foyda darajasi</th>
            </tr>
          </thead>
          <tbody>
            {mockRevenueData.map((data, index) => (
              <tr key={index}>
                <td>{data.period}</td>
                <td>${data.revenue.toLocaleString()}</td>
                <td>${data.expenses.toLocaleString()}</td>
                <td>${data.profit.toLocaleString()}</td>
                <td style={{ color: data.growth >= 0 ? "#38a169" : "#e53e3e" }}>
                  {data.growth >= 0 ? "+" : ""}
                  {data.growth}%
                </td>
                <td>{((data.profit / data.revenue) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Yearly Summary */}
      <div className={cls.chartContainer}>
        <h3 className={cls.chartTitle}>Yillik xulosa</h3>
        <div className={cls.chartGrid}>
          <div className={cls.chartItem}>
            <div className={cls.chartValue}>
              ${totalRevenue.toLocaleString()}
            </div>
            <div className={cls.chartLabel}>Jami daromad</div>
          </div>
          <div className={cls.chartItem}>
            <div className={cls.chartValue}>
              ${totalExpenses.toLocaleString()}
            </div>
            <div className={cls.chartLabel}>Jami xarajatlar</div>
          </div>
          <div className={cls.chartItem}>
            <div className={cls.chartValue}>
              ${totalProfit.toLocaleString()}
            </div>
            <div className={cls.chartLabel}>Jami sof foyda</div>
          </div>
          <div className={cls.chartItem}>
            <div className={cls.chartValue}>
              {((totalProfit / totalRevenue) * 100).toFixed(1)}%
            </div>
            <div className={cls.chartLabel}>O'rtacha foyda darajasi</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenuePage;
