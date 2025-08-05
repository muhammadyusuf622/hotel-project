import React, { useState } from "react";
import cls from "../../app/derector/Derector.module.css";

interface Branch {
  id: string;
  name: string;
  location: string;
  status: "active" | "inactive";
  rooms: number;
  employees: number;
  revenue: number;
}

interface AddBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (branch: Omit<Branch, "id">) => void;
}

const AddBranchModal: React.FC<AddBranchModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rooms: "",
    employees: "",
    revenue: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBranch = {
      name: formData.name,
      location: formData.location,
      status: "active" as const,
      rooms: parseInt(formData.rooms) || 0,
      employees: parseInt(formData.employees) || 0,
      revenue: parseInt(formData.revenue) || 0,
    };

    onAdd(newBranch);
    setFormData({
      name: "",
      location: "",
      rooms: "",
      employees: "",
      revenue: "",
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
          <h3 className={cls.cardTitle}>Yangi filial qo'shish</h3>
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
              Filial nomi
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
              Manzil
            </label>
            <textarea
              required
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid rgba(102, 126, 234, 0.3)",
                minHeight: "80px",
                resize: "vertical",
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
              Xonalar soni
            </label>
            <input
              type="number"
              required
              value={formData.rooms}
              onChange={(e) =>
                setFormData({ ...formData, rooms: e.target.value })
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
              Xodimlar soni
            </label>
            <input
              type="number"
              required
              value={formData.employees}
              onChange={(e) =>
                setFormData({ ...formData, employees: e.target.value })
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
              Daromad ($)
            </label>
            <input
              type="number"
              value={formData.revenue}
              onChange={(e) =>
                setFormData({ ...formData, revenue: e.target.value })
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

export default AddBranchModal;
