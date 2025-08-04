import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Input,
  Select,
  Modal,
  Form,
  Tag,
  Space,
  Dropdown,
  Badge,
  Tooltip,
  Avatar,
  TimePicker,
  message,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ToolOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import ctl from "../../app/admin/admin.module.css";

const { Option } = Select;

interface Room {
  id: string;
  number: string;
  type: "standard" | "deluxe" | "suite" | "presidential";
  status: "available" | "occupied" | "cleaning" | "maintenance";
  price: number;
  floor: number;
  capacity: number;
  currentGuest?: string;
  checkInTime?: string;
  checkOutTime?: string;
  cleaningTime?: string;
  notes?: string;
}

interface RoomsProps {
  rooms: Room[];
  onUpdateRoom: (roomId: string, updates: Partial<Room>) => void;
  onAddRoom: (room: Omit<Room, "id">) => void;
  onDeleteRoom: (roomId: string) => void;
}

const Rooms: React.FC<RoomsProps> = ({
  rooms,
  onUpdateRoom,
  onAddRoom,
  onDeleteRoom,
}) => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [form] = Form.useForm();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "success";
      case "occupied":
        return "warning";
      case "cleaning":
        return "processing";
      case "maintenance":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Bo'sh";
      case "occupied":
        return "Band";
      case "cleaning":
        return "Tozalashda";
      case "maintenance":
        return "Ta'mirlashda";
      default:
        return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "standard":
        return "Oddiy";
      case "deluxe":
        return "Deluxe";
      case "suite":
        return "Lyuks";
      case "presidential":
        return "Prezident";
      default:
        return type;
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.number
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || room.status === statusFilter;
    const matchesType = typeFilter === "all" || room.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddRoom = () => {
    setEditingRoom(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    form.setFieldsValue({
      number: room.number,
      type: room.type,
      price: room.price,
      floor: room.floor,
      capacity: room.capacity,
      notes: room.notes,
    });
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingRoom) {
        onUpdateRoom(editingRoom.id, values);
        message.success("Xona muvaffaqiyatli yangilandi!");
      } else {
        onAddRoom({
          ...values,
          status: "available",
        });
        message.success("Yangi xona qo'shildi!");
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleStatusChange = (roomId: string, newStatus: string) => {
    onUpdateRoom(roomId, { status: newStatus as any });
    message.success("Xona holati yangilandi!");
  };

  const handleDeleteRoom = (roomId: string) => {
    Modal.confirm({
      title: "Xonani o'chirish",
      content: "Bu xonani o'chirishni xohlaysizmi?",
      okText: "Ha",
      cancelText: "Yo'q",
      onOk: () => {
        onDeleteRoom(roomId);
        message.success("Xona o'chirildi!");
      },
    });
  };

  const getRoomActions = (room: Room) => [
    {
      key: "edit",
      label: "Tahrirlash",
      icon: <EditOutlined />,
      onClick: () => handleEditRoom(room),
    },
    {
      key: "status",
      label: "Holatni o'zgartirish",
      children: [
        {
          key: "available",
          label: "Bo'sh",
          onClick: () => handleStatusChange(room.id, "available"),
        },
        {
          key: "occupied",
          label: "Band",
          onClick: () => handleStatusChange(room.id, "occupied"),
        },
        {
          key: "cleaning",
          label: "Tozalashda",
          onClick: () => handleStatusChange(room.id, "cleaning"),
        },
        {
          key: "maintenance",
          label: "Ta'mirlashda",
          onClick: () => handleStatusChange(room.id, "maintenance"),
        },
      ],
    },
    {
      key: "delete",
      label: "O'chirish",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleDeleteRoom(room.id),
    },
  ];

  return (
    <div>
      {/* Filters and Search */}
      <Card className={ctl.dashboardCard} style={{ marginBottom: "24px" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <Input
              placeholder="Xona raqamini qidirish..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={ctl.searchInput}
            />
          </Col>
          <Col xs={24} sm={4}>
            <Select
              placeholder="Holat"
              value={statusFilter}
              onChange={setStatusFilter}
              className={ctl.formSelect}
              style={{ width: "100%" }}
            >
              <Option value="all">Barcha holatlar</Option>
              <Option value="available">Bo'sh</Option>
              <Option value="occupied">Band</Option>
              <Option value="cleaning">Tozalashda</Option>
              <Option value="maintenance">Ta'mirlashda</Option>
            </Select>
          </Col>
          <Col xs={24} sm={4}>
            <Select
              placeholder="Turi"
              value={typeFilter}
              onChange={setTypeFilter}
              className={ctl.formSelect}
              style={{ width: "100%" }}
            >
              <Option value="all">Barcha turlar</Option>
              <Option value="standard">Oddiy</Option>
              <Option value="deluxe">Deluxe</Option>
              <Option value="suite">Lyuks</Option>
              <Option value="presidential">Prezident</Option>
            </Select>
          </Col>
          <Col xs={24} sm={8}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddRoom}
              className={`${ctl.actionButton} ${ctl.primary}`}
            >
              Yangi xona qo'shish
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Room Cards */}
      <Row gutter={[16, 16]}>
        {filteredRooms.map((room) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={room.id}>
            <Card className={ctl.roomCard}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div>
                  <h3
                    style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}
                  >
                    Xona {room.number}
                  </h3>
                  <p style={{ margin: "4px 0", color: "#8c8c8c" }}>
                    {getTypeText(room.type)} • {room.floor}-qavat
                  </p>
                </div>
                <Dropdown
                  menu={{ items: getRoomActions(room) }}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <Tag
                  color={getStatusColor(room.status)}
                  className={ctl.roomStatus}
                >
                  {getStatusText(room.status)}
                </Tag>
                <span style={{ marginLeft: "8px", fontWeight: "500" }}>
                  {room.price.toLocaleString()} UZS/kecha
                </span>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "4px",
                  }}
                >
                  <UserOutlined
                    style={{ marginRight: "8px", color: "#8c8c8c" }}
                  />
                  <span>{room.capacity} kishi</span>
                </div>
                {room.currentGuest && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <Avatar
                      size="small"
                      icon={<UserOutlined />}
                      style={{ marginRight: "8px" }}
                    />
                    <span>{room.currentGuest}</span>
                  </div>
                )}
                {room.cleaningTime && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <ClearOutlined
                      style={{ marginRight: "8px", color: "#8c8c8c" }}
                    />
                    <span>Tozalash: {room.cleaningTime}</span>
                  </div>
                )}
              </div>

              {room.notes && (
                <div
                  style={{
                    background: "#f5f5f5",
                    padding: "8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  {room.notes}
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add/Edit Room Modal */}
      <Modal
        title={editingRoom ? "Xonani tahrirlash" : "Yangi xona qo'shish"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editingRoom ? "Yangilash" : "Qo'shish"}
        cancelText="Bekor qilish"
        width={600}
        className={ctl.modalHeader}
      >
        <Form form={form} layout="vertical" className={ctl.modalBody}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="number"
                label="Xona raqami"
                rules={[{ required: true, message: "Xona raqamini kiriting!" }]}
                className={ctl.formItem}
              >
                <Input className={ctl.formInput} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Xona turi"
                rules={[{ required: true, message: "Xona turini tanlang!" }]}
                className={ctl.formItem}
              >
                <Select className={ctl.formSelect}>
                  <Option value="standard">Oddiy</Option>
                  <Option value="deluxe">Deluxe</Option>
                  <Option value="suite">Lyuks</Option>
                  <Option value="presidential">Prezident</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Narxi (UZS/kecha)"
                rules={[{ required: true, message: "Narxni kiriting!" }]}
                className={ctl.formItem}
              >
                <Input type="number" className={ctl.formInput} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="floor"
                label="Qavat"
                rules={[{ required: true, message: "Qavatni kiriting!" }]}
                className={ctl.formItem}
              >
                <Input type="number" className={ctl.formInput} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="capacity"
                label="Sig\'imi (kishi)"
                rules={[{ required: true, message: "Sig'imni kiriting!" }]}
                className={ctl.formItem}
              >
                <Input type="number" className={ctl.formInput} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="notes" label="Izohlar" className={ctl.formItem}>
            <Input.TextArea rows={3} className={ctl.formTextarea} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Rooms;
