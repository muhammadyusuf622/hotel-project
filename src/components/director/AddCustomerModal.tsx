import React, { useState } from "react";
import cls from "../../app/derector/Derector.module.css";

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

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (customer: Omit<Customer, "id">) => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    branch: "",
    room: "",
    checkIn: "",
    checkOut: "",
    totalSpent: "",
    visits: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCustomer = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      branch: formData.branch,
      room: formData.room,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      status: "active" as const,
      totalSpent: parseInt(formData.totalSpent) || 0,
      visits: parseInt(formData.visits) || 1,
    };

    onAdd(newCustomer);
    setFormData({
      name: "",
      phone: "",
      email: "",
      branch: "",
      room: "",
      checkIn: "",
      checkOut: "",
      totalSpent: "",
      visits: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        className={cls.card}
        style={{
          maxWidth: "500px",
          width: "90%",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div className={cls.cardHeader}>
          <h3 className={cls.cardTitle}>Yangi mijoz qo'shish</h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#718096",
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Ism
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid rgba(102, 126, 234, 0.3)",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Telefon
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid rgba(102, 126, 234, 0.3)",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid rgba(102, 126, 234, 0.3)",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Filial
            </label>
            <select
              required
              value={formData.branch}
              onChange={(e) =>
                setFormData({ ...formData, branch: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid rgba(102, 126, 234, 0.3)",
              }}
            >
              <option value="">Filialni tanlang</option>
              <option value="Asosiy filial">Asosiy filial</option>
              <option value="Shahar markazi">Shahar markazi</option>
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Xona raqami
            </label>
            <input
              type="text"
              required
              value={formData.room}
              onChange={(e) =>
                setFormData({ ...formData, room: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid rgba(102, 126, 234, 0.3)",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Kelish vaqti
            </label>
            <input
              type="datetime-local"
              required
              value={formData.checkIn}
              onChange={(e) =>
                setFormData({ ...formData, checkIn: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid rgba(102, 126, 234, 0.3)",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Ketish vaqti
            </label>
            <input
              type="datetime-local"
              required
              value={formData.checkOut}
              onChange={(e) =>
                setFormData({ ...formData, checkOut: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid rgba(102, 126, 234, 0.3)",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Jami xarajat ($)
            </label>
            <input
              type="number"
              value={formData.totalSpent}
              onChange={(e) =>
                setFormData({ ...formData, totalSpent: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid rgba(102, 126, 234, 0.3)",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Tashriflar soni
            </label>
            <input
              type="number"
              value={formData.visits}
              onChange={(e) =>
                setFormData({ ...formData, visits: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid rgba(102, 126, 234, 0.3)",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              className={cls.actionButton}
              style={{ flex: 1 }}
            >
              Qo'shish
            </button>
            <button
              type="button"
              className={cls.actionButtonSecondary}
              onClick={onClose}
              style={{ flex: 1 }}
            >
              Bekor qilish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;
