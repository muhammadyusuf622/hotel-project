import React, { useState } from "react";
import cls from "../../app/derector/Derector.module.css";

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

interface AddRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (room: Omit<Room, "id">) => void;
}

const AddRoomModal: React.FC<AddRoomModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState({
    number: "",
    branch: "",
    type: "",
    price: "",
    customer: "",
    checkIn: "",
    checkOut: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRoom = {
      number: formData.number,
      branch: formData.branch,
      type: formData.type,
      status: "available" as const,
      price: formData.price,
      customer: formData.customer || "",
      checkIn: formData.checkIn || undefined,
      checkOut: formData.checkOut || undefined,
    };

    onAdd(newRoom);
    setFormData({
      number: "",
      branch: "",
      type: "",
      price: "",
      customer: "",
      checkIn: "",
      checkOut: "",
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
          <h3 className={cls.cardTitle}>Yangi xona qo'shish</h3>
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
              Xona raqami
            </label>
            <input
              type="text"
              required
              value={formData.number}
              onChange={(e) =>
                setFormData({ ...formData, number: e.target.value })
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
              Xona turi
            </label>
            <select
              required
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid rgba(102, 126, 234, 0.3)",
              }}
            >
              <option value="">Xona turini tanlang</option>
              <option value="Standart">Standart</option>
              <option value="Lyuks">Lyuks</option>
              <option value="VIP">VIP</option>
              <option value="Suite">Suite</option>
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
              Narxi (kecha boshiga)
            </label>
            <input
              type="text"
              required
              placeholder="$80/kecha"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
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
              Mijoz (ixtiyoriy)
            </label>
            <input
              type="text"
              value={formData.customer}
              onChange={(e) =>
                setFormData({ ...formData, customer: e.target.value })
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
              Kelish vaqti (ixtiyoriy)
            </label>
            <input
              type="datetime-local"
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

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Ketish vaqti (ixtiyoriy)
            </label>
            <input
              type="datetime-local"
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

export default AddRoomModal;
