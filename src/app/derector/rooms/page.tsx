"use client";

import React, { useState } from "react";
import cls from "../Derector.module.css";
import AddRoomModal from "../../../components/director/AddRoomModal";

interface Room {
  id: string;
  number: string;
  branch: string;
  type: string;
  status: "occupied" | "available" | "maintenance";
  price: string;
  customer: string;
  checkIn?: string;
  checkOut?: string;
}

const mockRooms: Room[] = [
  {
    id: "1",
    number: "201",
    branch: "Asosiy filial",
    type: "Standart",
    status: "occupied",
    price: "$80/kecha",
    customer: "Aziz Karimov",
    checkIn: "2024-01-15 14:00",
    checkOut: "2024-01-17 12:00",
  },
  {
    id: "2",
    number: "305",
    branch: "Shahar markazi",
    type: "Lyuks",
    status: "occupied",
    price: "$120/kecha",
    customer: "Malika Yusupova",
    checkIn: "2024-01-16 16:00",
    checkOut: "2024-01-18 11:00",
  },
  {
    id: "3",
    number: "102",
    branch: "Asosiy filial",
    type: "Standart",
    status: "available",
    price: "$80/kecha",
    customer: "",
  },
  {
    id: "4",
    number: "401",
    branch: "Shahar markazi",
    type: "VIP",
    status: "maintenance",
    price: "$200/kecha",
    customer: "",
  },
];

const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterBranch, setFilterBranch] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredRooms = rooms.filter((room) => {
    const statusMatch = filterStatus === "all" || room.status === filterStatus;
    const branchMatch = filterBranch === "all" || room.branch === filterBranch;
    return statusMatch && branchMatch;
  });

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

  const handleStatusChange = (id: string, newStatus: Room["status"]) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === id ? { ...room, status: newStatus } : room
      )
    );
  };

  const handleAddRoom = (newRoom: Omit<Room, "id">) => {
    const roomWithId = {
      ...newRoom,
      id: (rooms.length + 1).toString(),
    };
    setRooms((prev) => [...prev, roomWithId]);
  };

  return (
    <div className={cls.container}>
      <div className={cls.header}>
        <h1 className={cls.title}>Xonalar boshqaruvi</h1>
        <p className={cls.subtitle}>
          Barcha xonalarni boshqarish va monitoring
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
          + Yangi xona qo'shish
        </button>

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
          <option value="occupied">Band</option>
          <option value="available">Bo'sh</option>
          <option value="maintenance">Ta'mirlash</option>
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
                background: "linear-gradient(135deg, #48bb78, #38a169)",
              }}
            >
              🏠
            </div>
            <h3 className={cls.cardTitle}>Jami xonalar</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>{rooms.length}</div>
            <div className={cls.statLabel}>ta xona</div>
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
              ✅
            </div>
            <h3 className={cls.cardTitle}>Band xonalar</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>
              {rooms.filter((r) => r.status === "occupied").length}
            </div>
            <div className={cls.statLabel}>ta band</div>
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
              🔓
            </div>
            <h3 className={cls.cardTitle}>Bo'sh xonalar</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>
              {rooms.filter((r) => r.status === "available").length}
            </div>
            <div className={cls.statLabel}>ta bo'sh</div>
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
              🔧
            </div>
            <h3 className={cls.cardTitle}>Ta'mirlashda</h3>
          </div>
          <div className={cls.cardContent}>
            <div className={cls.statNumber}>
              {rooms.filter((r) => r.status === "maintenance").length}
            </div>
            <div className={cls.statLabel}>ta ta'mirlashda</div>
          </div>
        </div>
      </div>

      {/* Rooms Table */}
      <div className={cls.tableContainer}>
        <h3 className={cls.tableTitle}>Xonalar ro'yxati</h3>
        <table className={cls.table}>
          <thead>
            <tr>
              <th>Xona raqami</th>
              <th>Filial</th>
              <th>Tur</th>
              <th>Holat</th>
              <th>Narxi</th>
              <th>Mijoz</th>
              <th>Kelish vaqti</th>
              <th>Ketish vaqti</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room) => (
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
                <td>{room.checkIn || "-"}</td>
                <td>{room.checkOut || "-"}</td>
                <td>
                  <button className={cls.actionButtonSecondary}>Ko'rish</button>
                  <button className={cls.actionButton}>Tahrirlash</button>
                  {room.status === "available" && (
                    <button
                      className={cls.actionButtonSecondary}
                      onClick={() => handleStatusChange(room.id, "occupied")}
                    >
                      Band qilish
                    </button>
                  )}
                  {room.status === "occupied" && (
                    <button
                      className={cls.actionButtonSecondary}
                      onClick={() => handleStatusChange(room.id, "available")}
                    >
                      Bo'shatish
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Room Modal */}
      <AddRoomModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddRoom}
      />
    </div>
  );
};

export default RoomsPage;
