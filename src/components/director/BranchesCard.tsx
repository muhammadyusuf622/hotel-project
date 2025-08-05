import React from "react";
import cls from "../../app/derector/Derector.module.css";

interface BranchesData {
  total: number;
  active: number;
  inactive: number;
}

interface BranchesCardProps {
  data: BranchesData;
}

const BranchesCard: React.FC<BranchesCardProps> = ({ data }) => {
  return (
    <div className={cls.card}>
      <div className={cls.cardHeader}>
        <div
          className={cls.cardIcon}
          style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
        >
          🏢
        </div>
        <h3 className={cls.cardTitle}>Filiallar</h3>
      </div>
      <div className={cls.cardContent}>
        <div className={cls.statGrid}>
          <div className={cls.statItem}>
            <div className={cls.statNumber}>{data.total}</div>
            <div className={cls.statLabel}>Jami filiallar</div>
          </div>
          <div className={cls.statItem}>
            <div className={cls.statNumber}>{data.active}</div>
            <div className={cls.statLabel}>Faol</div>
          </div>
          <div className={cls.statItem}>
            <div className={cls.statNumber}>{data.inactive}</div>
            <div className={cls.statLabel}>Nofaol</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchesCard;
