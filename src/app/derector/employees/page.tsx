"use client";

import React, { useState } from "react";
import cls from "../Derector.module.css";
import AddEmployeeModal from "../../../components/director/AddEmployeeModal";

interface Employee {
  id: string;
  name: string;
  position: string;
  branch: string;
  permissions: string;
  status: "active" | "inactive";
  email: string;
  phone: string;
  joinDate: string;
  salary: number;
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Admin User",
    position: "Admin",
    branch: "Barcha filiallar",
    permissions: "To'liq huquq",
    status: "active",
    email: "admin@hotel.com",
    phone: "+998 90 111 11 11",
    joinDate: "2023-01-15",
    salary: 5000,
  },
  {
    id: "2",
    name: "Manager One",
    position: "Manager",
    branch: "Asosiy filial",
    permissions: "Cheklangan",
    status: "active",
    email: "manager1@hotel.com",
    phone: "+998 91 222 22 22",
    joinDate: "2023-03-20",
    salary: 3500,
  },
  {
    id: "3",
    name: "Staff Member",
    position: "Xodim",
    branch: "Shahar markazi",
    permissions: "Asosiy",
    status: "inactive",
    email: "staff1@hotel.com",
    phone: "+998 99 333 33 33",
    joinDate: "2023-06-10",
    salary: 2500,
  },
  {
    id: "4",
    name: "Receptionist",
    position: "Resepsiya",
    branch: "Asosiy filial",
    permissions: "Asosiy",
    status: "active",
    email: "reception@hotel.com",
    phone: "+998 88 444 44 44",
    joinDate: "2023-08-05",
    salary: 2800,
  },
];

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPosition, setFilterPosition] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredEmployees = employees.filter((employee) => {
    const statusMatch =
      filterStatus === "all" || employee.status === filterStatus;
    const positionMatch =
      filterPosition === "all" || employee.position === filterPosition;
    const searchMatch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm);
    return statusMatch && positionMatch && searchMatch;
  });

  const getStatusClass = (status: string) => {
    return status === "active" ? cls.statusActive : cls.statusInactive;
  };

  const getStatusText = (status: string) => {
    return status === "active" ? "Faol" : "Nofaol";
  };

  const handleStatusToggle = (id: string) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? { ...emp, status: emp.status === "active" ? "inactive" : "active" }
          : emp
      )
    );
  };

  const handleDelete = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleAddEmployee = (newEmployee: Omit<Employee, "id">) => {
    const employeeWithId = {
      ...newEmployee,
      id: (employees.length + 1).toString(),
    };
    setEmployees((prev) => [...prev, employeeWithId]);
  };

  return (
    <div className={cls.container}>
      <div className={cls.header}>
        <h1 className={cls.title}>Xodimlar boshqaruvi</h1>
        <p className={cls.subtitle}>
          Barcha xodimlarni boshqarish va monitoring
        </p>
      </div>

      {/* Filters and Actions */}
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
          className={cls.actionButton}
          onClick={() => setShowAddModal(true)}
        >
          + Yangi xodim qo'shish
        </button>

        <input
          type="text"
          placeholder="Qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid rgba(102, 126, 234, 0.3)",
            minWidth: "200px",
          }}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid rgba(102, 126, 234, 0.3)",
          }}
        >
          <option value="all">Barcha holatlar</option>
          <option value="active">Faol</option>
          <option value="inactive">Nofaol</option>
        </select>

        <select
          value={filterPosition}
          onChange={(e) => setFilterPosition(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid rgba(102, 126, 234, 0.3)",
          }}
        >
          <option value="all">Barcha lavozimlar</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Xodim">Xodim</option>
          <option value="Resepsiya">Resepsiya</option>
        </select>
      </div>

      {/* Statistics Cards */}
      <div className={cls.dashboardGrid} style={{ marginBottom: "30px" }}>
        <div className={cls.card}>
          <div className={cls.cardHeader}>
            <div
              className={cls.cardIcon}
              style={{
                background: "linear-gradient(135deg, #9f7aea, #805ad5)",
              }}
            >
              👨‍💼
            </div>
            <h3 className={cls.cardTitle}>Jami xodimlar</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>{employees.length}</div>
            <div className={cls.statLabel}>ta xodim</div>
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
              ✅
            </div>
            <h3 className={cls.cardTitle}>Faol xodimlar</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>
              {employees.filter((e) => e.status === "active").length}
            </div>
            <div className={cls.statLabel}>ta faol</div>
          </div>
        </div>

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
            <h3 className={cls.cardTitle}>Jami maosh</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>
              $
              {employees.reduce((sum, e) => sum + e.salary, 0).toLocaleString()}
            </div>
            <div className={cls.statLabel}>oylik</div>
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
              📊
            </div>
            <h3 className={cls.cardTitle}>O'rtacha maosh</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>
              $
              {(
                employees.reduce((sum, e) => sum + e.salary, 0) /
                employees.length
              ).toFixed(0)}
            </div>
            <div className={cls.statLabel}>xodim boshiga</div>
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className={cls.tableContainer}>
        <h3 className={cls.tableTitle}>Xodimlar ro'yxati</h3>
        <table className={cls.table}>
          <thead>
            <tr>
              <th>Ism</th>
              <th>Lavozim</th>
              <th>Filial</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Imkoniyatlar</th>
              <th>Holat</th>
              <th>Maosh</th>
              <th>Ishga kirgan</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.branch}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.permissions}</td>
                <td>
                  <span
                    className={`${cls.status} ${getStatusClass(
                      employee.status
                    )}`}
                  >
                    {getStatusText(employee.status)}
                  </span>
                </td>
                <td>${employee.salary}</td>
                <td>{employee.joinDate}</td>
                <td>
                  <button
                    className={cls.actionButtonSecondary}
                    onClick={() => handleStatusToggle(employee.id)}
                  >
                    {employee.status === "active"
                      ? "Deaktivlashtirish"
                      : "Faollashtirish"}
                  </button>
                  <button className={cls.actionButton}>Tahrirlash</button>
                  <button
                    className={cls.actionButtonSecondary}
                    onClick={() => handleDelete(employee.id)}
                    style={{
                      backgroundColor: "rgba(245, 101, 101, 0.1)",
                      color: "#e53e3e",
                    }}
                  >
                    O'chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddEmployee}
      />
    </div>
  );
};

export default EmployeesPage;
