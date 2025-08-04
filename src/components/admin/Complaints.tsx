import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Input,
  Select,
  Tag,
  Space,
  Avatar,
  Timeline,
  Modal,
  Form,
  message,
  Badge,
  Tooltip,
  Dropdown,
  Rate,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  MessageOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  MoreOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
} from "@ant-design/icons";
import ctl from "../../app/admin/admin.module.css";

const { Option } = Select;
const { TextArea } = Input;

interface Complaint {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  roomNumber: string;
  subject: string;
  description: string;
  status: "pending" | "in_progress" | "resolved" | "urgent";
  priority: "low" | "medium" | "high" | "critical";
  category: "service" | "facility" | "cleanliness" | "noise" | "other";
  rating?: number;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  response?: string;
  resolution?: string;
}

interface ComplaintsProps {
  complaints: Complaint[];
  onUpdateComplaint: (complaintId: string, updates: Partial<Complaint>) => void;
  onDeleteComplaint: (complaintId: string) => void;
  onViewComplaint: (complaint: Complaint) => void;
}

const Complaints: React.FC<ComplaintsProps> = ({
  complaints,
  onUpdateComplaint,
  onDeleteComplaint,
  onViewComplaint,
}) => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null
  );
  const [form] = Form.useForm();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "in_progress":
        return "processing";
      case "resolved":
        return "success";
      case "urgent":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Kutilmoqda";
      case "in_progress":
        return "Jarayonda";
      case "resolved":
        return "Hal qilindi";
      case "urgent":
        return "Shoshilinch";
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "green";
      case "medium":
        return "blue";
      case "high":
        return "orange";
      case "critical":
        return "red";
      default:
        return "default";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "low":
        return "Past";
      case "medium":
        return "O'rta";
      case "high":
        return "Yuqori";
      case "critical":
        return "Kritik";
      default:
        return priority;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case "service":
        return "Xizmat";
      case "facility":
        return "Imkoniyatlar";
      case "cleanliness":
        return "Tozalik";
      case "noise":
        return "Shovqin";
      case "other":
        return "Boshqa";
      default:
        return category;
    }
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
      complaint.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      complaint.roomNumber.includes(searchText);
    const matchesStatus =
      statusFilter === "all" || complaint.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || complaint.priority === priorityFilter;
    const matchesCategory =
      categoryFilter === "all" || complaint.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const handleViewComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    form.setFieldsValue({
      response: complaint.response || "",
      resolution: complaint.resolution || "",
      status: complaint.status,
      assignedTo: complaint.assignedTo || "",
    });
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (selectedComplaint) {
        onUpdateComplaint(selectedComplaint.id, {
          ...values,
          updatedAt: new Date().toISOString(),
        });
        message.success("Shikoyat muvaffaqiyatli yangilandi!");
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleDeleteComplaint = (complaintId: string) => {
    Modal.confirm({
      title: "Shikoyatni o'chirish",
      content: "Bu shikoyatni o'chirishni xohlaysizmi?",
      okText: "Ha",
      cancelText: "Yo'q",
      onOk: () => {
        onDeleteComplaint(complaintId);
        message.success("Shikoyat o'chirildi!");
      },
    });
  };

  const getComplaintActions = (complaint: Complaint) => [
    {
      key: "view",
      label: "Ko'rish",
      icon: <EyeOutlined />,
      onClick: () => handleViewComplaint(complaint),
    },
    {
      key: "edit",
      label: "Tahrirlash",
      icon: <EditOutlined />,
      onClick: () => handleViewComplaint(complaint),
    },
    {
      key: "delete",
      label: "O'chirish",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleDeleteComplaint(complaint.id),
    },
  ];

  const stats = {
    totalComplaints: complaints.length,
    pendingComplaints: complaints.filter((c) => c.status === "pending").length,
    urgentComplaints: complaints.filter((c) => c.status === "urgent").length,
    resolvedComplaints: complaints.filter((c) => c.status === "resolved")
      .length,
  };

  return (
    <div>
      {/* Statistics */}
      <Row
        gutter={[24, 24]}
        className={ctl.responsiveGrid}
        style={{ marginBottom: "24px" }}
      >
        <Col xs={24} sm={12} lg={6}>
          <Card className={`${ctl.dashboardCard} ${ctl.statCard}`}>
            <div style={{ textAlign: "center", color: "white" }}>
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                {stats.totalComplaints}
              </div>
              <div style={{ fontSize: "16px" }}>Jami shikoyatlar</div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            className={`${ctl.dashboardCard} ${ctl.statCard} ${ctl.warning}`}
          >
            <div style={{ textAlign: "center", color: "white" }}>
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                {stats.pendingComplaints}
              </div>
              <div style={{ fontSize: "16px" }}>Kutilayotgan</div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className={`${ctl.dashboardCard} ${ctl.statCard} ${ctl.info}`}>
            <div style={{ textAlign: "center", color: "white" }}>
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                {stats.urgentComplaints}
              </div>
              <div style={{ fontSize: "16px" }}>Shoshilinch</div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            className={`${ctl.dashboardCard} ${ctl.statCard} ${ctl.success}`}
          >
            <div style={{ textAlign: "center", color: "white" }}>
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                {stats.resolvedComplaints}
              </div>
              <div style={{ fontSize: "16px" }}>Hal qilingan</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className={ctl.dashboardCard} style={{ marginBottom: "24px" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={6}>
            <Input
              placeholder="Mijoz nomi yoki mavzu..."
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
              <Option value="pending">Kutilmoqda</Option>
              <Option value="in_progress">Jarayonda</Option>
              <Option value="resolved">Hal qilindi</Option>
              <Option value="urgent">Shoshilinch</Option>
            </Select>
          </Col>
          <Col xs={24} sm={4}>
            <Select
              placeholder="Ustuvorlik"
              value={priorityFilter}
              onChange={setPriorityFilter}
              className={ctl.formSelect}
              style={{ width: "100%" }}
            >
              <Option value="all">Barcha</Option>
              <Option value="low">Past</Option>
              <Option value="medium">O'rta</Option>
              <Option value="high">Yuqori</Option>
              <Option value="critical">Kritik</Option>
            </Select>
          </Col>
          <Col xs={24} sm={4}>
            <Select
              placeholder="Kategoriya"
              value={categoryFilter}
              onChange={setCategoryFilter}
              className={ctl.formSelect}
              style={{ width: "100%" }}
            >
              <Option value="all">Barcha</Option>
              <Option value="service">Xizmat</Option>
              <Option value="facility">Imkoniyatlar</Option>
              <Option value="cleanliness">Tozalik</Option>
              <Option value="noise">Shovqin</Option>
              <Option value="other">Boshqa</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      {/* Complaints List */}
      <Row gutter={[16, 16]}>
        {filteredComplaints.map((complaint) => (
          <Col xs={24} lg={12} key={complaint.id}>
            <Card className={ctl.complaintCard}>
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
                    {complaint.subject}
                  </h3>
                  <p style={{ margin: "4px 0", color: "#8c8c8c" }}>
                    Xona {complaint.roomNumber} • {complaint.customerName}
                  </p>
                </div>
                <Dropdown
                  menu={{ items: getComplaintActions(complaint) }}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <Space wrap>
                  <Tag
                    color={getStatusColor(complaint.status)}
                    className={ctl.complaintStatus}
                  >
                    {getStatusText(complaint.status)}
                  </Tag>
                  <Tag color={getPriorityColor(complaint.priority)}>
                    {getPriorityText(complaint.priority)}
                  </Tag>
                  <Tag color="blue">{getCategoryText(complaint.category)}</Tag>
                </Space>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <p style={{ color: "#666", fontSize: "14px" }}>
                  {complaint.description.length > 150
                    ? `${complaint.description.substring(0, 150)}...`
                    : complaint.description}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "12px", color: "#8c8c8c" }}>
                  <ClockCircleOutlined style={{ marginRight: "4px" }} />
                  {new Date(complaint.createdAt).toLocaleDateString("uz-UZ")}
                </div>
                {complaint.rating && (
                  <Rate
                    disabled
                    defaultValue={complaint.rating}
                    style={{ fontSize: "12px" }}
                  />
                )}
              </div>

              {complaint.status === "resolved" && complaint.resolution && (
                <div
                  style={{
                    background: "#f6ffed",
                    padding: "8px",
                    borderRadius: "4px",
                    marginTop: "8px",
                    border: "1px solid #b7eb8f",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "500",
                      color: "#52c41a",
                      marginBottom: "4px",
                    }}
                  >
                    Hal qilindi:
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    {complaint.resolution}
                  </div>
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>

      {/* View/Edit Complaint Modal */}
      <Modal
        title="Shikoyatni ko'rish va javob berish"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText="Saqlash"
        cancelText="Bekor qilish"
        width={800}
        className={ctl.modalHeader}
      >
        {selectedComplaint && (
          <div className={ctl.modalBody}>
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <h4>Mijoz ma'lumotlari</h4>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Ism:</strong> {selectedComplaint.customerName}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Email:</strong> {selectedComplaint.customerEmail}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Telefon:</strong> {selectedComplaint.customerPhone}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Xona:</strong> {selectedComplaint.roomNumber}
                </div>
              </Col>
              <Col span={12}>
                <h4>Shikoyat ma'lumotlari</h4>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Mavzu:</strong> {selectedComplaint.subject}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Kategoriya:</strong>{" "}
                  {getCategoryText(selectedComplaint.category)}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Ustuvorlik:</strong>{" "}
                  {getPriorityText(selectedComplaint.priority)}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Sana:</strong>{" "}
                  {new Date(selectedComplaint.createdAt).toLocaleString(
                    "uz-UZ"
                  )}
                </div>
              </Col>
            </Row>

            <div style={{ marginTop: "24px" }}>
              <h4>Shikoyat matni</h4>
              <div
                style={{
                  background: "#f5f5f5",
                  padding: "12px",
                  borderRadius: "4px",
                  marginBottom: "16px",
                }}
              >
                {selectedComplaint.description}
              </div>
            </div>

            <Form form={form} layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="status"
                    label="Holat"
                    className={ctl.formItem}
                  >
                    <Select className={ctl.formSelect}>
                      <Option value="pending">Kutilmoqda</Option>
                      <Option value="in_progress">Jarayonda</Option>
                      <Option value="resolved">Hal qilindi</Option>
                      <Option value="urgent">Shoshilinch</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="assignedTo"
                    label="Javobgar"
                    className={ctl.formItem}
                  >
                    <Input
                      className={ctl.formInput}
                      placeholder="Javobgar shaxs"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="response" label="Javob" className={ctl.formItem}>
                <TextArea
                  rows={3}
                  className={ctl.formTextarea}
                  placeholder="Mijozga javob yozing..."
                />
              </Form.Item>

              <Form.Item
                name="resolution"
                label="Hal qilish"
                className={ctl.formItem}
              >
                <TextArea
                  rows={3}
                  className={ctl.formTextarea}
                  placeholder="Qanday hal qilindi..."
                />
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Complaints;
