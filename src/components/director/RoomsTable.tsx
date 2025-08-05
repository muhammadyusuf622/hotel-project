import React from "react";
import cls from "../../app/derector/Derector.module.css";

interface Room {
  id: string;
  number: string;
  branch: string;
  type: string;
  status: "occupied" | "available" | "maintenance";
  price: string;
  customer: string;
}

interface RoomsTableProps {
  rooms: Room[];
}

const RoomsTable: React.FC<RoomsTableProps> = ({ rooms }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "occupied":
        return cls.statusActive;
      case "available":
        return cls.statusInactive;
      case "maintenance":
        return cls.statusPending;
      default:
        return cls.statusInactive;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "occupied":
        return "Band";
      case "available":
        return "Bo'sh";
      case "maintenance":
        return "Ta'mirlash";
      default:
        return "Bo'sh";
    }
  };

  return (
    <div className={cls.tableContainer}>
      <h3 className={cls.tableTitle}>Xonalar boshqaruvi</h3>
      <div style={{ marginBottom: "20px" }}>
        <button className={cls.actionButton}>Yangi xona qo'shish</button>
      </div>
      <table className={cls.table}>
        <thead>
          <tr>
            <th>Xona raqami</th>
            <th>Filial</th>
            <th>Tur</th>
            <th>Holat</th>
            <th>Narxi</th>
            <th>Mijoz</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.number}</td>
              <td>{room.branch}</td>
              <td>{room.type}</td>
              <td>
                <span
                  className={`${cls.status} ${getStatusClass(room.status)}`}
                >
                  {getStatusText(room.status)}
                </span>
              </td>
              <td>{room.price}</td>
              <td>{room.customer || "-"}</td>
              <td>
                <button className={cls.actionButtonSecondary}>Ko'rish</button>
                <button className={cls.actionButton}>Tahrirlash</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomsTable;
