"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { Layout, Menu, Button, Badge, Avatar, Dropdown, message, MenuProps } from "antd";
import {
  DashboardOutlined,
  HomeOutlined,
  UserOutlined,
  MessageOutlined,
  LogoutOutlined,
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import ctl from "./admin.module.css";
import Dashboard from "../../components/admin/Dashboard";
import Rooms from "../../components/admin/Rooms";
import Customers from "../../components/admin/Customers";
import Complaints from "../../components/admin/Complaints";
import { IComplaint, ICustomer, IRecentActivity, IRoom } from "@/interface";

const { Header, Content, Sider } = Layout;

// Mock data
const mockStats = {
  totalBookings: 45,
  totalGuests: 32,
  totalRevenue: 2500000,
  occupancyRate: 78,
};

const mockRecentActivity: IRecentActivity[] = [
  {
    id: "1",
    type: "booking",
    message: "Yangi bron qilindi - Xona 205",
    time: "2 daqiqa oldin",
    user: "Ahmad Karimov",
  },
  {
    id: "2",
    type: "checkin",
    message: "Mehmon kirib keldi - Xona 103",
    time: "15 daqiqa oldin",
    user: "Malika Yusupova",
  },
  {
    id: "3",
    type: "checkout",
    message: "Mehmon chiqib ketdi - Xona 208",
    time: "1 soat oldin",
    user: "Bobur Toshmatov",
  },
  {
    id: "4",
    type: "complaint",
    message: "Yangi shikoyat - Xona 156",
    time: "2 soat oldin",
    user: "Dilfuza Karimova",
  },
];

const mockRooms: IRoom[] = [
  {
    id: "1",
    number: "101",
    type: "standard",
    status: "occupied",
    price: 150000,
    floor: 1,
    capacity: 2,
    currentGuest: "Ahmad Karimov",
    checkInTime: "2024-01-15",
    checkOutTime: "2024-01-17",
    cleaningTime: "14:00",
    notes: "Mehmon maxsus talablari bor",
  },
  {
    id: "2",
    number: "102",
    type: "deluxe",
    status: "available",
    price: 250000,
    floor: 1,
    capacity: 3,
    notes: "Balcony mavjud",
  },
  {
    id: "3",
    number: "201",
    type: "suite",
    status: "cleaning",
    price: 400000,
    floor: 2,
    capacity: 4,
    cleaningTime: "15:30",
    notes: "Lyuks xona",
  },
  {
    id: "4",
    number: "301",
    type: "presidential",
    status: "maintenance",
    price: 800000,
    floor: 3,
    capacity: 6,
    notes: "Ta'mirlash jarayonida",
  },
];

const mockCustomers: ICustomer[] = [
  {
    id: "1",
    name: "Ahmad Karimov",
    email: "ahmad@example.com",
    phone: "+998 90 123 45 67",
    type: "vip",
    status: "active",
    totalBookings: 15,
    totalSpent: 2500000,
    lastVisit: "2024-01-15",
    currentRoom: "101",
    checkInDate: "2024-01-15",
    checkOutDate: "2024-01-17",
    notes: "VIP mijoz, maxsus xizmat kerak",
  },
  {
    id: "2",
    name: "Malika Yusupova",
    email: "malika@example.com",
    phone: "+998 91 234 56 78",
    type: "premium",
    status: "active",
    totalBookings: 8,
    totalSpent: 1200000,
    lastVisit: "2024-01-14",
    currentRoom: "103",
    checkInDate: "2024-01-14",
    checkOutDate: "2024-01-16",
  },
  {
    id: "3",
    name: "Bobur Toshmatov",
    email: "bobur@example.com",
    phone: "+998 92 345 67 89",
    type: "regular",
    status: "active",
    totalBookings: 3,
    totalSpent: 450000,
    lastVisit: "2024-01-13",
    notes: "Yangi mijoz",
  },
];

const mockComplaints: IComplaint[] = [
  {
    id: "1",
    customerName: "Dilfuza Karimova",
    customerEmail: "dilfuza@example.com",
    customerPhone: "+998 93 456 78 90",
    roomNumber: "156",
    subject: "Konditsioner ishlamayapti",
    description:
      "Xonadagi konditsioner ishlamayapti, juda issiq. Iltimos tez orada tuzatib bering.",
    status: "pending",
    priority: "high",
    category: "facility",
    rating: 2,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    customerName: "Aziz Azizov",
    customerEmail: "aziz@example.com",
    customerPhone: "+998 94 567 89 01",
    roomNumber: "203",
    subject: "Ovqat juda kech keldi",
    description: "Buyurtma bergan ovqat 2 soat kech keldi. Bu juda noqulay.",
    status: "in_progress",
    priority: "medium",
    category: "service",
    rating: 3,
    createdAt: "2024-01-15T08:15:00Z",
    updatedAt: "2024-01-15T09:30:00Z",
    assignedTo: "Oshpaz bo'limi",
  },
  {
    id: "3",
    customerName: "Nodira Nodirova",
    customerEmail: "nodira@example.com",
    customerPhone: "+998 95 678 90 12",
    roomNumber: "105",
    subject: "Xona tozalikda muammo",
    description: "Xona toza emas, chang bor va choyshablar almashilmagan.",
    status: "resolved",
    priority: "high",
    category: "cleanliness",
    rating: 4,
    createdAt: "2024-01-14T16:45:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
    assignedTo: "Tozalash xizmati",
    response: "Kechirasiz, darhol hal qilamiz",
    resolution: "Xona to'liq tozalandi va choyshablar almashildi",
  },
];

const AdminPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [rooms, setRooms] = useState(mockRooms);
  const [customers, setCustomers] = useState(mockCustomers);
  const [complaints, setComplaints] = useState(mockComplaints);

  const handleUpdateRoom = (roomId: string, updates: any) => {
    setRooms((prev) =>
      prev.map((room) => (room.id === roomId ? { ...room, ...updates } : room))
    );
  };

  const handleAddRoom = (newRoom: any) => {
    const room = {
      ...newRoom,
      id: Date.now().toString(),
    };
    setRooms((prev) => [...prev, room]);
  };

  const handleDeleteRoom = (roomId: string) => {
    setRooms((prev) => prev.filter((room) => room.id !== roomId));
  };

  const handleUpdateCustomer = (customerId: string, updates: any) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === customerId ? { ...customer, ...updates } : customer
      )
    );
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers((prev) =>
      prev.filter((customer) => customer.id !== customerId)
    );
  };

  const handleViewCustomer = (customer: any) => {
    message.info(`${customer.name} ma'lumotlari ko'rsatilmoqda`);
  };

  const handleUpdateComplaint = (complaintId: string, updates: any) => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === complaintId ? { ...complaint, ...updates } : complaint
      )
    );
  };

  const handleDeleteComplaint = (complaintId: string) => {
    setComplaints((prev) =>
      prev.filter((complaint) => complaint.id !== complaintId)
    );
  };

  const handleViewComplaint = (complaint: any) => {
    message.info(`${complaint.subject} shikoyati ko'rsatilmoqda`);
  };

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "rooms",
      icon: <HomeOutlined />,
      label: "Xonalar",
    },
    {
      key: "customers",
      icon: <UserOutlined />,
      label: "Mijozlar",
    },
    {
      key: "complaints",
      icon: <MessageOutlined />,
      label: "Shikoyatlar",
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: "profile",
      label: "Profil",
      icon: <UserOutlined />,
    },
    {
      key: "settings",
      label: "Sozlamalar",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Chiqish",
      icon: <LogoutOutlined />,
    },
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case "rooms":
        return (
          <Rooms
            rooms={rooms}
            onUpdateRoom={handleUpdateRoom}
            onAddRoom={handleAddRoom}
            onDeleteRoom={handleDeleteRoom}
          />
        );
      case "customers":
        return (
          <Customers
            customers={customers}
            onUpdateCustomer={handleUpdateCustomer}
            onDeleteCustomer={handleDeleteCustomer}
            onViewCustomer={handleViewCustomer}
          />
        );
      case "complaints":
        return (
          <Complaints
            complaints={complaints}
            onUpdateComplaint={handleUpdateComplaint}
            onDeleteComplaint={handleDeleteComplaint}
            onViewComplaint={handleViewComplaint}
          />
        );
      default:
        return (
          <Dashboard stats={mockStats} recentActivity={mockRecentActivity} />
        );
    }
  };

  return (
    <Layout className={ctl.adminLayout}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={ctl.adminSider}
        width={280}
      >
        <div style={{ padding: "32px 24px", textAlign: "center" }}>
          <h2
            style={{ color: "white", marginBottom: "12px", fontSize: "28px" }}
          >
            🏨 Admin Panel
          </h2>
          <p style={{ color: "white", opacity: 0.9, fontSize: "16px" }}>
            Hotel Management
          </p>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          style={{
            background: "transparent",
            color: "white",
            border: "none",
            fontSize: "18px",
          }}
          items={menuItems}
          onClick={({ key }) => setSelectedMenu(key)}
        />
      </Sider>

      <Layout>
        <Header className={ctl.adminHeader}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                color: "#8B4513",
              }}
            />
            <h4
              style={{
                margin: 0,
                color: "#8B4513",
                fontSize: "20px",
                marginLeft: "16px",
              }}
            >
              {selectedMenu === "dashboard" && "📊 Dashboard"}
              {selectedMenu === "rooms" && "🏠 Xonalar boshqaruvi"}
              {selectedMenu === "customers" && "👥 Mijozlar"}
              {selectedMenu === "complaints" && "📝 Shikoyatlar"}
            </h4>
          </div>

          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Badge count={5} size="small">
              <Button
                type="text"
                icon={<BellOutlined />}
                style={{ fontSize: "18px", color: "#8B4513" }}
              />
            </Badge>

            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  style={{ marginRight: "8px" }}
                />
                <span style={{ color: "#8B4513", fontWeight: "500" }}>
                  Admin User
                </span>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className={ctl.adminContent}>{renderContent()}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
