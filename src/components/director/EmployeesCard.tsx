import React from "react";
import cls from "../../app/derector/Derector.module.css";

interface EmployeesData {
  total: number;
  active: number;
  inactive: number;
  admins: number;
}

interface EmployeesCardProps {
  data: EmployeesData;
}

const EmployeesCard: React.FC<EmployeesCardProps> = ({ data }) => {
  return (
    <div className={cls.card}>
      <div className={cls.cardHeader}>
        <div
          className={cls.cardIcon}
          style={{ background: "linear-gradient(135deg, #9f7aea, #805ad5)" }}
        >
          👨‍💼
        </div>
        <h3 className={cls.cardTitle}>Xodimlar</h3>
      </div>
      <div className={cls.cardContent}>
        <div className={cls.statGrid}>
          <div className={cls.statItem}>
            <div className={cls.statNumber}>{data.total}</div>
            <div className={cls.statLabel}>Jami xodimlar</div>
          </div>
          <div className={cls.statItem}>
            <div className={cls.statNumber}>{data.active}</div>
            <div className={cls.statLabel}>Faol</div>
          </div>
          <div className={cls.statItem}>
            <div className={cls.statNumber}>{data.admins}</div>
            <div className={cls.statLabel}>Adminlar</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesCard;
