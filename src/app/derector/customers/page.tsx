"use client";

import React, { useState } from "react";
import cls from "../Derector.module.css";
import AddCustomerModal from "../../../components/director/AddCustomerModal";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  branch: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: "active" | "inactive" | "pending";
  totalSpent: number;
  visits: number;
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Aziz Karimov",
    phone: "+998 90 123 45 67",
    email: "aziz.karimov@email.com",
    branch: "Asosiy filial",
    room: "201",
    checkIn: "2024-01-15 14:00",
    checkOut: "2024-01-17 12:00",
    status: "active",
    totalSpent: 160,
    visits: 3,
  },
  {
    id: "2",
    name: "Malika Yusupova",
    phone: "+998 91 234 56 78",
    email: "malika.yusupova@email.com",
    branch: "Shahar markazi",
    room: "305",
    checkIn: "2024-01-16 16:00",
    checkOut: "2024-01-18 11:00",
    status: "active",
    totalSpent: 240,
    visits: 1,
  },
  {
    id: "3",
    name: "Jasur Toshmatov",
    phone: "+998 99 345 67 89",
    email: "jasur.toshmatov@email.com",
    branch: "Asosiy filial",
    room: "102",
    checkIn: "2024-01-14 10:00",
    checkOut: "2024-01-16 09:00",
    status: "inactive",
    totalSpent: 160,
    visits: 2,
  },
  {
    id: "4",
    name: "Dilfuza Rahimova",
    phone: "+998 88 456 78 90",
    email: "dilfuza.rahimova@email.com",
    branch: "Shahar markazi",
    room: "401",
    checkIn: "2024-01-20 12:00",
    checkOut: "2024-01-22 10:00",
    status: "pending",
    totalSpent: 0,
    visits: 0,
  },
];

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterBranch, setFilterBranch] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredCustomers = customers.filter((customer) => {
    const statusMatch =
      filterStatus === "all" || customer.status === filterStatus;
    const branchMatch =
      filterBranch === "all" || customer.branch === filterBranch;
    const searchMatch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && branchMatch && searchMatch;
  });

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

  const handleAddCustomer = (newCustomer: Omit<Customer, "id">) => {
    const customerWithId = {
      ...newCustomer,
      id: (customers.length + 1).toString(),
    };
    setCustomers((prev) => [...prev, customerWithId]);
  };

  return (
    <div className={cls.container}>
      <div className={cls.header}>
        <h1 className={cls.title}>Mijozlar boshqaruvi</h1>
        <p className={cls.subtitle}>
          Barcha mijozlarni boshqarish va monitoring
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
          + Yangi mijoz qo'shish
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
          <option value="inactive">Ketgan</option>
          <option value="pending">Kutilmoqda</option>
        </select>

        <select
          value={filterBranch}
          onChange={(e) => setFilterBranch(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid rgba(102, 126, 234, 0.3)",
          }}
        >
          <option value="all">Barcha filiallar</option>
          <option value="Asosiy filial">Asosiy filial</option>
          <option value="Shahar markazi">Shahar markazi</option>
        </select>
      </div>

      {/* Statistics Cards */}
      <div className={cls.dashboardGrid} style={{ marginBottom: "30px" }}>
        <div className={cls.card}>
          <div className={cls.cardHeader}>
            <div
              className={cls.cardIcon}
              style={{
                background: "linear-gradient(135deg, #ed8936, #dd6b20)",
              }}
            >
              👥
            </div>
            <h3 className={cls.cardTitle}>Jami mijozlar</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>{customers.length}</div>
            <div className={cls.statLabel}>ta mijoz</div>
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
            <h3 className={cls.cardTitle}>Faol mijozlar</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>
              {customers.filter((c) => c.status === "active").length}
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
            <h3 className={cls.cardTitle}>Jami daromad</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>
              $
              {customers
                .reduce((sum, c) => sum + c.totalSpent, 0)
                .toLocaleString()}
            </div>
            <div className={cls.statLabel}>mijozlardan</div>
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
            <h3 className={cls.cardTitle}>O'rtacha tashrif</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>
              {(
                customers.reduce((sum, c) => sum + c.visits, 0) /
                customers.length
              ).toFixed(1)}
            </div>
            <div className={cls.statLabel}>tashrif mijoz boshiga</div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className={cls.tableContainer}>
        <h3 className={cls.tableTitle}>Mijozlar ro'yxati</h3>
        <table className={cls.table}>
          <thead>
            <tr>
              <th>Ism</th>
              <th>Telefon</th>
              <th>Email</th>
              <th>Filial</th>
              <th>Xona</th>
              <th>Kelish vaqti</th>
              <th>Ketish vaqti</th>
              <th>Holat</th>
              <th>Jami xarajat</th>
              <th>Tashriflar</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
                <td>{customer.branch}</td>
                <td>{customer.room}</td>
                <td>{customer.checkIn}</td>
                <td>{customer.checkOut}</td>
                <td>
                  <span
                    className={`${cls.status} ${getStatusClass(
                      customer.status
                    )}`}
                  >
                    {getStatusText(customer.status)}
                  </span>
                </td>
                <td>${customer.totalSpent}</td>
                <td>{customer.visits}</td>
                <td>
                  <button className={cls.actionButtonSecondary}>Ko'rish</button>
                  <button className={cls.actionButton}>Tahrirlash</button>
                  <button className={cls.actionButtonSecondary}>Hisobot</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Customer Modal */}
      <AddCustomerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddCustomer}
      />
    </div>
  );
};

export default CustomersPage;
