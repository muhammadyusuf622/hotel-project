"use client";

import React, { useState } from "react";
import cls from "./Derector.module.css";
import Link from "next/link";

// Import components
import BranchesCard from "../../components/director/BranchesCard";
import RoomsCard from "../../components/director/RoomsCard";
import CustomersCard from "../../components/director/CustomersCard";
import EmployeesCard from "../../components/director/EmployeesCard";
import RevenueChart from "../../components/director/RevenueChart";
import CustomersTable from "../../components/director/CustomersTable";
import EmployeesTable from "../../components/director/EmployeesTable";
import RoomsTable from "../../components/director/RoomsTable";

// Mock data for demonstration
const mockData = {
  branches: {
    total: 8,
    active: 6,
    inactive: 2,
  },
  rooms: {
    total: 150,
    occupied: 89,
    available: 61,
    occupancyRate: 59.3,
  },
  customers: {
    total: 234,
    checkedIn: 89,
    checkedOut: 145,
    arrivals: 12,
    departures: 8,
  },
  employees: {
    total: 45,
    active: 42,
    inactive: 3,
    admins: 8,
  },
  revenue: {
    daily: 125000,
    weekly: 875000,
    monthly: 3750000,
    netProfit: 80000,
  },
};

// Mock data for tables
const mockCustomers = [
  {
    id: "1",
    name: "Aziz Karimov",
    branch: "Asosiy filial",
    room: "201",
    checkIn: "2024-01-15 14:00",
    checkOut: "2024-01-17 12:00",
    status: "active" as const,
  },
  {
    id: "2",
    name: "Malika Yusupova",
    branch: "Shahar markazi",
    room: "305",
    checkIn: "2024-01-16 16:00",
    checkOut: "2024-01-18 11:00",
    status: "active" as const,
  },
  {
    id: "3",
    name: "Jasur Toshmatov",
    branch: "Asosiy filial",
    room: "102",
    checkIn: "2024-01-14 10:00",
    checkOut: "2024-01-16 09:00",
    status: "inactive" as const,
  },
];

const mockEmployees = [
  {
    id: "1",
    name: "Admin User",
    position: "Admin",
    branch: "Barcha filiallar",
    permissions: "To'liq huquq",
    status: "active" as const,
  },
  {
    id: "2",
    name: "Manager One",
    position: "Manager",
    branch: "Asosiy filial",
    permissions: "Cheklangan",
    status: "active" as const,
  },
  {
    id: "3",
    name: "Staff Member",
    position: "Xodim",
    branch: "Shahar markazi",
    permissions: "Asosiy",
    status: "inactive" as const,
  },
];

const mockRooms = [
  {
    id: "1",
    number: "201",
    branch: "Asosiy filial",
    type: "Standart",
    status: "occupied" as const,
    price: "$80/kecha",
    customer: "Aziz Karimov",
  },
  {
    id: "2",
    number: "305",
    branch: "Shahar markazi",
    type: "Lyuks",
    status: "occupied" as const,
    price: "$120/kecha",
    customer: "Malika Yusupova",
  },
  {
    id: "3",
    number: "102",
    branch: "Asosiy filial",
    type: "Standart",
    status: "available" as const,
    price: "$80/kecha",
    customer: "",
  },
];

const DirectorPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderOverview = () => (
    <>
      <div className={cls.dashboardGrid}>
        <BranchesCard data={mockData.branches} />
        <RoomsCard data={mockData.rooms} />
        <CustomersCard data={mockData.customers} />
        <EmployeesCard data={mockData.employees} />
      </div>

      {/* Quick Actions */}
      <div className={cls.chartContainer}>
        <h3 className={cls.chartTitle}>Tezkor amallar</h3>
        <div className={cls.chartGrid}>
          <Link
            href="/derector/branches"
            className={cls.chartItem}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <div className={cls.chartValue}>🏢</div>
            <div className={cls.chartLabel}>Filiallar boshqaruvi</div>
          </Link>
          <Link
            href="/derector/rooms"
            className={cls.chartItem}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <div className={cls.chartValue}>🏠</div>
            <div className={cls.chartLabel}>Xonalar boshqaruvi</div>
          </Link>
          <Link
            href="/derector/customers"
            className={cls.chartItem}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <div className={cls.chartValue}>👥</div>
            <div className={cls.chartLabel}>Mijozlar boshqaruvi</div>
          </Link>
          <Link
            href="/derector/employees"
            className={cls.chartItem}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <div className={cls.chartValue}>👨‍💼</div>
            <div className={cls.chartLabel}>Xodimlar boshqaruvi</div>
          </Link>
        </div>
      </div>
    </>
  );

  const renderRevenue = () => (
    <>
      <RevenueChart data={mockData.revenue} />

      {/* Additional Revenue Details */}
      <div className={cls.chartContainer}>
        <h3 className={cls.chartTitle}>Daromad tafsilotlari</h3>
        <div className={cls.chartGrid}>
          <div className={cls.chartItem}>
            <div className={cls.chartValue}>📈</div>
            <div className={cls.chartLabel}>O'sish darajasi: +12.5%</div>
          </div>
          <div className={cls.chartItem}>
            <div className={cls.chartValue}>📊</div>
            <div className={cls.chartLabel}>Eng yaxshi filial: Asosiy</div>
          </div>
          <div className={cls.chartItem}>
            <div className={cls.chartValue}>🎯</div>
            <div className={cls.chartLabel}>Maqsad: $4,000,000</div>
          </div>
          <div className={cls.chartItem}>
            <div className={cls.chartValue}>📅</div>
            <div className={cls.chartLabel}>Bu oy: 75% bajarildi</div>
          </div>
        </div>
      </div>
    </>
  );

  const renderCustomers = () => (
    <>
      <CustomersTable customers={mockCustomers} />

      {/* Customer Statistics */}
      <div className={cls.dashboardGrid} style={{ marginTop: "30px" }}>
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
            <h3 className={cls.cardTitle}>Bugungi statistika</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statGrid}>
              <div className={cls.statItem}>
                <div className={cls.statNumber}>
                  {mockData.customers.arrivals}
                </div>
                <div className={cls.statLabel}>Kelgan</div>
              </div>
              <div className={cls.statItem}>
                <div className={cls.statNumber}>
                  {mockData.customers.departures}
                </div>
                <div className={cls.statLabel}>Ketgan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderEmployees = () => (
    <>
      <EmployeesTable employees={mockEmployees} />

      {/* Employee Statistics */}
      <div className={cls.dashboardGrid} style={{ marginTop: "30px" }}>
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
            <h3 className={cls.cardTitle}>Xodimlar statistikasi</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statGrid}>
              <div className={cls.statItem}>
                <div className={cls.statNumber}>{mockData.employees.total}</div>
                <div className={cls.statLabel}>Jami xodimlar</div>
              </div>
              <div className={cls.statItem}>
                <div className={cls.statNumber}>
                  {mockData.employees.active}
                </div>
                <div className={cls.statLabel}>Faol</div>
              </div>
              <div className={cls.statItem}>
                <div className={cls.statNumber}>
                  {mockData.employees.admins}
                </div>
                <div className={cls.statLabel}>Adminlar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderRooms = () => (
    <>
      <RoomsTable rooms={mockRooms} />

      {/* Room Statistics */}
      <div className={cls.dashboardGrid} style={{ marginTop: "30px" }}>
        <div className={cls.card}>
          <div className={cls.cardHeader}>
            <div
              className={cls.cardIcon}
              style={{
                background: "linear-gradient(135deg, #48bb78, #38a169)",
              }}
            >
              🏠
            </div>
            <h3 className={cls.cardTitle}>Xonalar statistikasi</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statGrid}>
              <div className={cls.statItem}>
                <div className={cls.statNumber}>{mockData.rooms.total}</div>
                <div className={cls.statLabel}>Jami xonalar</div>
              </div>
              <div className={cls.statItem}>
                <div className={cls.statNumber}>{mockData.rooms.occupied}</div>
                <div className={cls.statLabel}>Band</div>
              </div>
              <div className={cls.statItem}>
                <div className={cls.statNumber}>{mockData.rooms.available}</div>
                <div className={cls.statLabel}>Bo'sh</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className={cls.container}>
      <div className={cls.header}>
        <h1 className={cls.title}>Director Dashboard</h1>
        <p className={cls.subtitle}>Hotel boshqaruvi va monitoring tizimi</p>
      </div>

      {/* Navigation tabs */}
      <div
        style={{
          marginBottom: "30px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button
          className={`${cls.actionButton} ${
            activeTab === "overview" ? "" : cls.actionButtonSecondary
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Umumiy ma'lumot
        </button>
        <button
          className={`${cls.actionButton} ${
            activeTab === "revenue" ? "" : cls.actionButtonSecondary
          }`}
          onClick={() => setActiveTab("revenue")}
        >
          Daromad
        </button>
        <button
          className={`${cls.actionButton} ${
            activeTab === "customers" ? "" : cls.actionButtonSecondary
          }`}
          onClick={() => setActiveTab("customers")}
        >
          Mijozlar
        </button>
        <button
          className={`${cls.actionButton} ${
            activeTab === "employees" ? "" : cls.actionButtonSecondary
          }`}
          onClick={() => setActiveTab("employees")}
        >
          Xodimlar
        </button>
        <button
          className={`${cls.actionButton} ${
            activeTab === "rooms" ? "" : cls.actionButtonSecondary
          }`}
          onClick={() => setActiveTab("rooms")}
        >
          Xonalar
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "overview" && renderOverview()}
      {activeTab === "revenue" && renderRevenue()}
      {activeTab === "customers" && renderCustomers()}
      {activeTab === "employees" && renderEmployees()}
      {activeTab === "rooms" && renderRooms()}
    </div>
  );
};

export default DirectorPage;
