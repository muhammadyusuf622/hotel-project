import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Input,
  Select,
  Table,
  Tag,
  Avatar,
  Space,
  Dropdown,
  Badge,
  Tooltip,
  Modal,
  Form,
  message,
  Statistic,
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CrownOutlined,
  StarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import ctl from "../../app/admin/admin.module.css";

const { Option } = Select;

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "regular" | "vip" | "premium";
  status: "active" | "inactive" | "blocked";
  totalBookings: number;
  totalSpent: number;
  lastVisit: string;
  currentRoom?: string;
  checkInDate?: string;
  checkOutDate?: string;
  notes?: string;
  avatar?: string;
}

interface CustomersProps {
  customers: Customer[];
  onUpdateCustomer: (customerId: string, updates: Partial<Customer>) => void;
  onDeleteCustomer: (customerId: string) => void;
  onViewCustomer: (customer: Customer) => void;
}

const Customers: React.FC<CustomersProps> = ({
  customers,
  onUpdateCustomer,
  onDeleteCustomer,
  onViewCustomer,
}) => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [form] = Form.useForm();

  const getTypeColor = (type: string) => {
    switch (type) {
      case "vip":
        return "gold";
      case "premium":
        return "purple";
      case "regular":
        return "blue";
      default:
        return "default";
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "vip":
        return "VIP";
      case "premium":
        return "Premium";
      case "regular":
        return "Oddiy";
      default:
        return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "default";
      case "blocked":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Faol";
      case "inactive":
        return "Faol emas";
      case "blocked":
        return "Bloklangan";
      default:
        return status;
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.phone.includes(searchText);
    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;
    const matchesType = typeFilter === "all" || customer.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    form.setFieldsValue({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      type: customer.type,
      status: customer.status,
      notes: customer.notes,
    });
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingCustomer) {
        onUpdateCustomer(editingCustomer.id, values);
        message.success("Mijoz muvaffaqiyatli yangilandi!");
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleDeleteCustomer = (customerId: string) => {
    Modal.confirm({
      title: "Mijozni o'chirish",
      content: "Bu mijozni o'chirishni xohlaysizmi?",
      okText: "Ha",
      cancelText: "Yo'q",
      onOk: () => {
        onDeleteCustomer(customerId);
        message.success("Mijoz o'chirildi!");
      },
    });
  };

  const getCustomerActions = (customer: Customer) => [
    {
      key: "view",
      label: "Ko'rish",
      icon: <EyeOutlined />,
      onClick: () => onViewCustomer(customer),
    },
    {
      key: "edit",
      label: "Tahrirlash",
      icon: <EditOutlined />,
      onClick: () => handleEditCustomer(customer),
    },
    {
      key: "delete",
      label: "O'chirish",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleDeleteCustomer(customer.id),
    },
  ];

  const columns = [
    {
      title: "Mijoz",
      key: "customer",
      render: (record: Customer) => (
        <Space>
          <Avatar size="large" src={record.avatar} icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: "500" }}>{record.name}</div>
            <div style={{ color: "#8c8c8c", fontSize: "12px" }}>
              {record.email}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
      render: (phone: string) => (
        <Space>
          <PhoneOutlined />
          {phone}
        </Space>
      ),
    },
    {
      title: "Turi",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag color={getTypeColor(type)}>
          {type === "vip" && <CrownOutlined style={{ marginRight: "4px" }} />}
          {getTypeText(type)}
        </Tag>
      ),
    },
    {
      title: "Holat",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: "Bronlar",
      dataIndex: "totalBookings",
      key: "totalBookings",
      render: (bookings: number) => (
        <Badge count={bookings} style={{ backgroundColor: "#1890ff" }} />
      ),
    },
    {
      title: "Jami xarid",
      dataIndex: "totalSpent",
      key: "totalSpent",
      render: (spent: number) => (
        <span style={{ fontWeight: "500" }}>{spent.toLocaleString()} UZS</span>
      ),
    },
    {
      title: "So'nggi tashrif",
      dataIndex: "lastVisit",
      key: "lastVisit",
      render: (date: string) => (
        <Space>
          <ClockCircleOutlined />
          {date}
        </Space>
      ),
    },
    {
      title: "Amallar",
      key: "actions",
      render: (record: Customer) => (
        <Dropdown
          menu={{ items: getCustomerActions(record) }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const stats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter((c) => c.status === "active").length,
    vipCustomers: customers.filter((c) => c.type === "vip").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
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
            <Statistic
              title="Jami mijozlar"
              value={stats.totalCustomers}
              prefix={<UserOutlined />}
              valueStyle={{ color: "white" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            className={`${ctl.dashboardCard} ${ctl.statCard} ${ctl.success}`}
          >
            <Statistic
              title="Faol mijozlar"
              value={stats.activeCustomers}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "white" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            className={`${ctl.dashboardCard} ${ctl.statCard} ${ctl.warning}`}
          >
            <Statistic
              title="VIP mijozlar"
              value={stats.vipCustomers}
              prefix={<CrownOutlined />}
              valueStyle={{ color: "white" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className={`${ctl.dashboardCard} ${ctl.statCard} ${ctl.info}`}>
            <Statistic
              title="Jami daromad"
              value={stats.totalRevenue}
              prefix={<StarOutlined />}
              valueStyle={{ color: "white" }}
              suffix="UZS"
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className={ctl.dashboardCard} style={{ marginBottom: "24px" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <Input
              placeholder="Mijoz nomi, email yoki telefon..."
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
              <Option value="active">Faol</Option>
              <Option value="inactive">Faol emas</Option>
              <Option value="blocked">Bloklangan</Option>
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
              <Option value="regular">Oddiy</Option>
              <Option value="premium">Premium</Option>
              <Option value="vip">VIP</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      {/* Customers Table */}
      <Card className={ctl.tableContainer}>
        <Table
          columns={columns}
          dataSource={filteredCustomers}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} dan ${total} ta mijoz`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Edit Customer Modal */}
      <Modal
        title="Mijozni tahrirlash"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText="Yangilash"
        cancelText="Bekor qilish"
        width={600}
        className={ctl.modalHeader}
      >
        <Form form={form} layout="vertical" className={ctl.modalBody}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="To'liq ism"
                rules={[{ required: true, message: "Ismni kiriting!" }]}
                className={ctl.formItem}
              >
                <Input className={ctl.formInput} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Emailni kiriting!" },
                  { type: "email", message: "Noto'g'ri email!" },
                ]}
                className={ctl.formItem}
              >
                <Input className={ctl.formInput} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Telefon"
                rules={[{ required: true, message: "Telefonni kiriting!" }]}
                className={ctl.formItem}
              >
                <Input className={ctl.formInput} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Mijoz turi"
                rules={[{ required: true, message: "Mijoz turini tanlang!" }]}
                className={ctl.formItem}
              >
                <Select className={ctl.formSelect}>
                  <Option value="regular">Oddiy</Option>
                  <Option value="premium">Premium</Option>
                  <Option value="vip">VIP</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Holat"
                rules={[{ required: true, message: "Holatni tanlang!" }]}
                className={ctl.formItem}
              >
                <Select className={ctl.formSelect}>
                  <Option value="active">Faol</Option>
                  <Option value="inactive">Faol emas</Option>
                  <Option value="blocked">Bloklangan</Option>
                </Select>
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

export default Customers;
