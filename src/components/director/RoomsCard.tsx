import React from "react";
import cls from "../../app/derector/Derector.module.css";

interface RoomsData {
  total: number;
  occupied: number;
  available: number;
  occupancyRate: number;
}

interface RoomsCardProps {
  data: RoomsData;
}

const RoomsCard: React.FC<RoomsCardProps> = ({ data }) => {
  return (
    <div className={cls.card}>
      <div className={cls.cardHeader}>
        <div
          className={cls.cardIcon}
          style={{ background: "linear-gradient(135deg, #48bb78, #38a169)" }}
        >
          🏠
        </div>
        <h3 className={cls.cardTitle}>Xonalar</h3>
      </div>
      <div className={cls.cardContent}>
        <div className={cls.statGrid}>
          <div className={cls.statItem}>
            <div className={cls.statNumber}>{data.total}</div>
            <div className={cls.statLabel}>Jami xonalar</div>
          </div>
          <div className={cls.statItem}>
            <div className={cls.statNumber}>{data.occupied}</div>
            <div className={cls.statLabel}>Band</div>
          </div>
          <div className={cls.statItem}>
            <div className={cls.statNumber}>{data.available}</div>
            <div className={cls.statLabel}>Bo'sh</div>
          </div>
        </div>
        <div style={{ marginTop: "15px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "5px",
            }}
          >
            <span>Band qilish darajasi</span>
            <span>{data.occupancyRate}%</span>
          </div>
          <div className={cls.progressBar}>
            <div
              className={cls.progressFill}
              style={{ width: `${data.occupancyRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsCard;
