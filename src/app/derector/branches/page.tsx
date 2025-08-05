"use client";

import React, { useState } from "react";
import cls from "../Derector.module.css";
import AddBranchModal from "../../../components/director/AddBranchModal";

interface Branch {
  id: string;
  name: string;
  location: string;
  status: "active" | "inactive";
  rooms: number;
  employees: number;
  revenue: number;
}

const mockBranches: Branch[] = [
  {
    id: "1",
    name: "Asosiy filial",
    location: "Toshkent shahri, Chilonzor tumani",
    status: "active",
    rooms: 45,
    employees: 12,
    revenue: 125000,
  },
  {
    id: "2",
    name: "Shahar markazi",
    location: "Toshkent shahri, Yakkasaroy tumani",
    status: "active",
    rooms: 38,
    employees: 10,
    revenue: 98000,
  },
  {
    id: "3",
    name: "Chorvoq filiali",
    location: "Chorvoq shahri",
    status: "active",
    rooms: 25,
    employees: 8,
    revenue: 65000,
  },
  {
    id: "4",
    name: "Samarqand filiali",
    location: "Samarqand shahri",
    status: "inactive",
    rooms: 30,
    employees: 0,
    revenue: 0,
  },
];

const BranchesPage = () => {
  const [branches, setBranches] = useState<Branch[]>(mockBranches);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

  const handleStatusToggle = (id: string) => {
    setBranches((prev) =>
      prev.map((branch) =>
        branch.id === id
          ? {
              ...branch,
              status: branch.status === "active" ? "inactive" : "active",
            }
          : branch
      )
    );
  };

  const handleDelete = (id: string) => {
    setBranches((prev) => prev.filter((branch) => branch.id !== id));
  };

  const handleAddBranch = (newBranch: Omit<Branch, "id">) => {
    const branchWithId = {
      ...newBranch,
      id: (branches.length + 1).toString(),
    };
    setBranches((prev) => [...prev, branchWithId]);
  };

  return (
    <div className={cls.container}>
      <div className={cls.header}>
        <h1 className={cls.title}>Filiallar boshqaruvi</h1>
        <p className={cls.subtitle}>
          Barcha filiallarni boshqarish va monitoring
        </p>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <button
          className={cls.actionButton}
          onClick={() => setShowAddForm(true)}
        >
          + Yangi filial qo'shish
        </button>
      </div>

      <div className={cls.tableContainer}>
        <h3 className={cls.tableTitle}>Filiallar ro'yxati</h3>
        <table className={cls.table}>
          <thead>
            <tr>
              <th>Filial nomi</th>
              <th>Manzil</th>
              <th>Xonalar soni</th>
              <th>Xodimlar soni</th>
              <th>Daromad</th>
              <th>Holat</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch.id}>
                <td>{branch.name}</td>
                <td>{branch.location}</td>
                <td>{branch.rooms}</td>
                <td>{branch.employees}</td>
                <td>${branch.revenue.toLocaleString()}</td>
                <td>
                  <span
                    className={`${cls.status} ${
                      branch.status === "active"
                        ? cls.statusActive
                        : cls.statusInactive
                    }`}
                  >
                    {branch.status === "active" ? "Faol" : "Nofaol"}
                  </span>
                </td>
                <td>
                  <button
                    className={cls.actionButtonSecondary}
                    onClick={() => handleStatusToggle(branch.id)}
                  >
                    {branch.status === "active"
                      ? "Deaktivlashtirish"
                      : "Faollashtirish"}
                  </button>
                  <button
                    className={cls.actionButton}
                    onClick={() => setEditingBranch(branch)}
                  >
                    Tahrirlash
                  </button>
                  <button
                    className={cls.actionButtonSecondary}
                    onClick={() => handleDelete(branch.id)}
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

      {/* Statistics Cards */}
      <div className={cls.dashboardGrid} style={{ marginTop: "30px" }}>
        <div className={cls.card}>
          <div className={cls.cardHeader}>
            <div
              className={cls.cardIcon}
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
              }}
            >
              🏢
            </div>
            <h3 className={cls.cardTitle}>Jami filiallar</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>{branches.length}</div>
            <div className={cls.statLabel}>ta filial</div>
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
            <h3 className={cls.cardTitle}>Faol filiallar</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>
              {branches.filter((b) => b.status === "active").length}
            </div>
            <div className={cls.statLabel}>ta faol</div>
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
              💰
            </div>
            <h3 className={cls.cardTitle}>Jami daromad</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>
              $
              {branches.reduce((sum, b) => sum + b.revenue, 0).toLocaleString()}
            </div>
            <div className={cls.statLabel}>barcha filiallardan</div>
          </div>
        </div>
      </div>

      {/* Add Branch Modal */}
      <AddBranchModal
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onAdd={handleAddBranch}
      />
    </div>
  );
};

export default BranchesPage;
