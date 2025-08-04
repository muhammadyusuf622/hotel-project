import React from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  Timeline,
  Avatar,
  Badge,
} from "antd";
import {
  UserOutlined,
  HomeOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import ctl from "../../app/admin/admin.module.css";

interface DashboardProps {
  stats: {
    totalBookings: number;
    totalGuests: number;
    totalRevenue: number;
    occupancyRate: number;
  };
  recentActivity: Array<{
    id: string;
    type: "booking" | "checkin" | "checkout" | "complaint";
    message: string;
    time: string;
    user: string;
  }>;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, recentActivity }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
      case "checkin":
        return <ArrowUpOutlined style={{ color: "#1890ff" }} />;
      case "checkout":
        return <ArrowDownOutlined style={{ color: "#fa8c16" }} />;
      case "complaint":
        return <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  return (
    <div>
      {/* Statistics Cards */}
      <Row gutter={[24, 24]} className={ctl.responsiveGrid}>
        <Col xs={24} sm={12} lg={6}>
          <Card className={`${ctl.dashboardCard} ${ctl.statCard}`}>
            <Statistic
              title="Kunlik bronlar"
              value={stats.totalBookings}
              prefix={<HomeOutlined />}
              valueStyle={{ color: "white" }}
            />
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>
              Bugun: +{Math.floor(stats.totalBookings * 0.3)}
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            className={`${ctl.dashboardCard} ${ctl.statCard} ${ctl.success}`}
          >
            <Statistic
              title="Kirgan mehmonlar"
              value={stats.totalGuests}
              prefix={<UserOutlined />}
              valueStyle={{ color: "white" }}
            />
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>
              Bugun: +{Math.floor(stats.totalGuests * 0.4)}
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            className={`${ctl.dashboardCard} ${ctl.statCard} ${ctl.warning}`}
          >
            <Statistic
              title="Chiqgan mehmonlar"
              value={Math.floor(stats.totalGuests * 0.6)}
              prefix={<UserOutlined />}
              valueStyle={{ color: "white" }}
            />
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>
              Bugun: {Math.floor(stats.totalGuests * 0.2)}
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className={`${ctl.dashboardCard} ${ctl.statCard} ${ctl.info}`}>
            <Statistic
              title="Kunlik daromad"
              value={stats.totalRevenue}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "white" }}
              suffix="UZS"
            />
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>
              +12.5% o'tgan haftaga
            </div>
          </Card>
        </Col>
      </Row>

      {/* Charts and Progress */}
      <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>
        <Col xs={24} lg={12}>
          <Card title="Xona bandligi" className={ctl.dashboardCard}>
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span>Umumiy bandlik</span>
                <span>{stats.occupancyRate}%</span>
              </div>
              <Progress
                percent={stats.occupancyRate}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                className={ctl.progressBar}
              />
            </div>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#52c41a",
                    }}
                  >
                    {Math.floor(stats.occupancyRate * 0.8)}%
                  </div>
                  <div style={{ fontSize: "14px", color: "#8c8c8c" }}>
                    Oddiy xonalar
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#fa8c16",
                    }}
                  >
                    {Math.floor(stats.occupancyRate * 0.9)}%
                  </div>
                  <div style={{ fontSize: "14px", color: "#8c8c8c" }}>
                    Lyuks xonalar
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="So'nggi faollik" className={ctl.dashboardCard}>
            <Timeline>
              {recentActivity.map((activity) => (
                <Timeline.Item
                  key={activity.id}
                  dot={getActivityIcon(activity.type)}
                  className={ctl.timelineItem}
                >
                  <div className={ctl.timelineTime}>{activity.time}</div>
                  <div className={ctl.timelineContent}>
                    <div style={{ fontWeight: "500" }}>{activity.message}</div>
                    <div style={{ color: "#8c8c8c", fontSize: "12px" }}>
                      {activity.user}
                    </div>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>

      {/* Quick Stats */}
      <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>
        <Col xs={24} lg={8}>
          <Card title="Xona holati" className={ctl.dashboardCard}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <span>Bo'sh xonalar</span>
              <Badge
                count={Math.floor(100 - stats.occupancyRate)}
                style={{ backgroundColor: "#52c41a" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <span>Band xonalar</span>
              <Badge
                count={Math.floor(stats.occupancyRate)}
                style={{ backgroundColor: "#fa8c16" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <span>Tozalashda</span>
              <Badge
                count={Math.floor(stats.occupancyRate * 0.1)}
                style={{ backgroundColor: "#1890ff" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Ta'mirlashda</span>
              <Badge
                count={Math.floor(stats.occupancyRate * 0.05)}
                style={{ backgroundColor: "#ff4d4f" }}
              />
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Mijozlar statistikasi" className={ctl.dashboardCard}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <span>Jami mijozlar</span>
              <Badge
                count={stats.totalGuests}
                style={{ backgroundColor: "#8B4513" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <span>Faol mijozlar</span>
              <Badge
                count={Math.floor(stats.totalGuests * 0.7)}
                style={{ backgroundColor: "#52c41a" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <span>Yangi mijozlar</span>
              <Badge
                count={Math.floor(stats.totalGuests * 0.2)}
                style={{ backgroundColor: "#1890ff" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>VIP mijozlar</span>
              <Badge
                count={Math.floor(stats.totalGuests * 0.1)}
                style={{ backgroundColor: "#fa8c16" }}
              />
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Daromad tahlili" className={ctl.dashboardCard}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <span>Kunlik daromad</span>
              <span style={{ fontWeight: "bold", color: "#52c41a" }}>
                {stats.totalRevenue.toLocaleString()} UZS
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <span>Haftalik daromad</span>
              <span style={{ fontWeight: "bold", color: "#1890ff" }}>
                {(stats.totalRevenue * 7).toLocaleString()} UZS
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <span>Oylik daromad</span>
              <span style={{ fontWeight: "bold", color: "#fa8c16" }}>
                {(stats.totalRevenue * 30).toLocaleString()} UZS
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>O'rtacha chek</span>
              <span style={{ fontWeight: "bold", color: "#8B4513" }}>
                {Math.floor(
                  stats.totalRevenue / stats.totalBookings
                ).toLocaleString()}{" "}
                UZS
              </span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
