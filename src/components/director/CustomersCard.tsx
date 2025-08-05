import React from "react";
import cls from "../../app/derector/Derector.module.css";

interface CustomersData {
  total: number;
  checkedIn: number;
  checkedOut: number;
  arrivals: number;
  departures: number;
}

interface CustomersCardProps {
  data: CustomersData;
}

const CustomersCard: React.FC<CustomersCardProps> = ({ data }) => {
  return (
    <div className={cls.card}>
      <div className={cls.cardHeader}>
        <div
          className={cls.cardIcon}
          style={{ background: "linear-gradient(135deg, #ed8936, #dd6b20)" }}
        >
          👥
        </div>
        <h3 className={cls.cardTitle}>Mijozlar</h3>
      </div>
      <div className={cls.cardContent}>
        <div className={cls.statGrid}>
          <div className={cls.statItem}>
            <div className={cls.statNumber}>{data.total}</div>
            <div className={cls.statLabel}>Jami mijozlar</div>
          </div>
          <div className={cls.statItem}>
            <div className={cls.statNumber}>{data.checkedIn}</div>
            <div className={cls.statLabel}>Tashrif buyurgan</div>
          </div>
          <div className={cls.statItem}>
            <div className={cls.statNumber}>{data.arrivals}</div>
            <div className={cls.statLabel}>Bugun kelgan</div>
          </div>
          <div className={cls.statItem}>
            <div className={cls.statNumber}>{data.departures}</div>
            <div className={cls.statLabel}>Bugun ketgan</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersCard;
