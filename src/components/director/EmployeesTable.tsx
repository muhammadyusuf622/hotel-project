import React from "react";
import cls from "../../app/derector/Derector.module.css";

interface Employee {
  id: string;
  name: string;
  position: string;
  branch: string;
  permissions: string;
  status: "active" | "inactive";
}

interface EmployeesTableProps {
  employees: Employee[];
}

const EmployeesTable: React.FC<EmployeesTableProps> = ({ employees }) => {
  const getStatusClass = (status: string) => {
    return status === "active" ? cls.statusActive : cls.statusInactive;
  };

  const getStatusText = (status: string) => {
    return status === "active" ? "Faol" : "Nofaol";
  };

  return (
    <div className={cls.tableContainer}>
      <h3 className={cls.tableTitle}>Xodimlar boshqaruvi</h3>
      <table className={cls.table}>
        <thead>
          <tr>
            <th>Ism</th>
            <th>Lavozim</th>
            <th>Filial</th>
            <th>Imkoniyatlar</th>
            <th>Holat</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.branch}</td>
              <td>{employee.permissions}</td>
              <td>
                <span
                  className={`${cls.status} ${getStatusClass(employee.status)}`}
                >
                  {getStatusText(employee.status)}
                </span>
              </td>
              <td>
                <button className={cls.actionButtonSecondary}>
                  {employee.status === "active" ? "Cheklash" : "Faollashtirish"}
                </button>
                <button className={cls.actionButton}>Tahrirlash</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;
