import React from "react";
import cls from "../../app/derector/Derector.module.css";

interface Customer {
  id: string;
  name: string;
  branch: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: "active" | "inactive" | "pending";
}

interface CustomersTableProps {
  customers: Customer[];
}

const CustomersTable: React.FC<CustomersTableProps> = ({ customers }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return cls.statusActive;
      case "inactive":
        return cls.statusInactive;
      case "pending":
        return cls.statusPending;
      default:
        return cls.statusActive;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Faol";
      case "inactive":
        return "Ketgan";
      case "pending":
        return "Kutilmoqda";
      default:
        return "Faol";
    }
  };

  return (
    <div className={cls.tableContainer}>
      <h3 className={cls.tableTitle}>Mijozlar ro'yxati</h3>
      <table className={cls.table}>
        <thead>
          <tr>
            <th>Ism</th>
            <th>Filial</th>
            <th>Xona</th>
            <th>Kelish vaqti</th>
            <th>Ketish vaqti</th>
            <th>Holat</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.branch}</td>
              <td>{customer.room}</td>
              <td>{customer.checkIn}</td>
              <td>{customer.checkOut}</td>
              <td>
                <span
                  className={`${cls.status} ${getStatusClass(customer.status)}`}
                >
                  {getStatusText(customer.status)}
                </span>
              </td>
              <td>
                <button className={cls.actionButton}>Ko'rish</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTable;
