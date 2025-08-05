import React, { useState } from "react";
import cls from "../../app/derector/Derector.module.css";

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

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (employee: Omit<Employee, "id">) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    branch: "",
    permissions: "",
    email: "",
    phone: "",
    salary: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEmployee = {
      name: formData.name,
      position: formData.position,
      branch: formData.branch,
      permissions: formData.permissions,
      status: "active" as const,
      email: formData.email,
      phone: formData.phone,
      joinDate: new Date().toISOString().split("T")[0],
      salary: parseInt(formData.salary),
    };

    onAdd(newEmployee);
    setFormData({
      name: "",
      position: "",
      branch: "",
      permissions: "",
      email: "",
      phone: "",
      salary: "",
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
          <h3 className={cls.cardTitle}>Yangi xodim qo'shish</h3>
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
              Lavozim
            </label>
            <select
              required
              value={formData.position}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid rgba(102, 126, 234, 0.3)",
              }}
            >
              <option value="">Lavozimni tanlang</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Xodim">Xodim</option>
              <option value="Resepsiya">Resepsiya</option>
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
              <option value="Barcha filiallar">Barcha filiallar</option>
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
              Imkoniyatlar
            </label>
            <select
              required
              value={formData.permissions}
              onChange={(e) =>
                setFormData({ ...formData, permissions: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid rgba(102, 126, 234, 0.3)",
              }}
            >
              <option value="">Imkoniyatlarni tanlang</option>
              <option value="To'liq huquq">To'liq huquq</option>
              <option value="Cheklangan">Cheklangan</option>
              <option value="Asosiy">Asosiy</option>
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

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Maosh ($)
            </label>
            <input
              type="number"
              required
              value={formData.salary}
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
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

export default AddEmployeeModal;
