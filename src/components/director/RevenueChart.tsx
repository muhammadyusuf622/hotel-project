import React from "react";
import cls from "../../app/derector/Derector.module.css";

interface RevenueData {
  daily: number;
  weekly: number;
  monthly: number;
  netProfit: number;
}

interface RevenueChartProps {
  data: RevenueData;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <div className={cls.chartContainer}>
      <h3 className={cls.chartTitle}>Daromad statistikasi</h3>
      <div className={cls.chartGrid}>
        <div className={cls.chartItem}>
          <div className={cls.chartValue}>${data.daily.toLocaleString()}</div>
          <div className={cls.chartLabel}>Kunlik daromad</div>
        </div>
        <div className={cls.chartItem}>
          <div className={cls.chartValue}>${data.weekly.toLocaleString()}</div>
          <div className={cls.chartLabel}>Haftalik daromad</div>
        </div>
        <div className={cls.chartItem}>
          <div className={cls.chartValue}>${data.monthly.toLocaleString()}</div>
          <div className={cls.chartLabel}>Oylik daromad</div>
        </div>
        <div className={cls.chartItem}>
          <div className={cls.chartValue}>
            ${data.netProfit.toLocaleString()}
          </div>
          <div className={cls.chartLabel}>Sof foyda</div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
