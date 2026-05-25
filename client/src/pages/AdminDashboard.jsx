import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import api from "../utils/api";
import ConfirmModal from "../components/ConfirmModal";
import {
  FiUsers,
  FiFileText,
  FiTrash2,
  FiShield,
  FiAlertCircle,
  FiRefreshCw,
  FiSearch,
} from "react-icons/fi";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 28px 16px;
  overflow-y: auto;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 16px 10px;
  }
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  animation: ${fadeInUp} 0.4s ease;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: ${({ theme }) => theme.primary}15;
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const HeaderContent = styled.div``;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
  letter-spacing: -0.3px;
`;

const HeaderSub = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 2px 0 0;
`;

const TabBar = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding-bottom: 0;
`;

const Tab = styled.button`
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  background: none;
  border: none;
  border-bottom: 2px solid ${({ $active, theme }) => $active ? theme.primary : "transparent"};
  color: ${({ $active, theme }) => $active ? theme.primary : theme.text_secondary};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: ${({ $bg }) => $bg || "#174657"}12;
  color: ${({ $bg }) => $bg || "#174657"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const StatInfo = styled.div``;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: -0.5px;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
`;

const TableCard = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const TableTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 20px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${({ theme }) => theme.input_bg};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 12px 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  white-space: nowrap;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ $admin, theme }) => $admin ? theme.primary + "20" : "transparent"};
  color: ${({ $admin, theme }) => $admin ? theme.primary : theme.text_secondary};
  border: 1px solid ${({ $admin, theme }) => $admin ? theme.primary + "40" : theme.border};
`;

const ActionBtn = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  background: ${({ $danger, theme }) => $danger ? theme.red + "15" : theme.primary + "15"};
  color: ${({ $danger, theme }) => $danger ? theme.red : theme.primary};

  &:hover {
    background: ${({ $danger, theme }) => $danger ? theme.red + "25" : theme.primary + "25"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  margin-left: auto;
  width: 260px;

  @media (max-width: 600px) {
    width: 100%;
    margin: 0;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 9px 14px 9px 36px;
  font-size: 13px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.input_bg};
  color: ${({ theme }) => theme.text_primary};
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary}60;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  pointer-events: none;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
`;

const LoadingRow = styled.div`
  text-align: center;
  padding: 32px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
`;

const AdminDashboard = () => {
  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ users: 0, blogs: 0, admins: 0 });
  const [confirm, setConfirm] = useState({ open: false, variant: "danger", title: "", message: "", onConfirm: null });
  const [search, setSearch] = useState("");

  const q = search.toLowerCase().trim();
  const filteredUsers = q ? users.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)) : users;
  const filteredBlogs = q ? blogs.filter((b) => b.title.toLowerCase().includes(q) || b.author_name?.toLowerCase().includes(q)) : blogs;

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
      setStats((prev) => ({
        ...prev,
        users: res.data.length,
        admins: res.data.filter((u) => u.is_admin).length,
      }));
    } catch (err) {
      console.error("Failed to fetch users");
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/admin/blog");
      setBlogs(res.data);
      setStats((prev) => ({ ...prev, blogs: res.data.length }));
    } catch (err) {
      console.error("Failed to fetch blogs");
    }
  };

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([fetchUsers(), fetchBlogs()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const toggleAdmin = async (userId, current) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { is_admin: !current });
      fetchUsers();
    } catch (err) {
      console.error("Failed to update role");
    }
  };

  const deleteUser = async (userId) => {
    setConfirm({
      open: true,
      variant: "danger",
      title: "Delete User",
      message: "Delete this user? This cannot be undone.",
      onConfirm: async () => {
        setConfirm((p) => ({ ...p, open: false }));
        try {
          await api.delete(`/admin/users/${userId}`);
          fetchUsers();
        } catch (err) {
          console.error("Failed to delete user");
        }
      },
    });
  };

  const deleteBlog = async (blogId) => {
    setConfirm({
      open: true,
      variant: "danger",
      title: "Delete Blog Post",
      message: "Delete this blog post? This cannot be undone.",
      onConfirm: async () => {
        setConfirm((p) => ({ ...p, open: false }));
        try {
          await api.delete(`/admin/blog/${blogId}`);
          fetchBlogs();
        } catch (err) {
          console.error("Failed to delete blog");
        }
      },
    });
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <Container>
      <Wrapper>
        <Header>
          <HeaderIcon><FiShield size={22} /></HeaderIcon>
          <HeaderContent>
            <HeaderTitle>Admin Dashboard</HeaderTitle>
            <HeaderSub>Manage users and moderate blog content</HeaderSub>
          </HeaderContent>
        </Header>

        <StatsRow>
          <StatCard>
            <StatIcon $bg="#174657"><FiUsers size={20} /></StatIcon>
            <StatInfo>
              <StatValue>{stats.users}</StatValue>
              <StatLabel>Total Users</StatLabel>
            </StatInfo>
          </StatCard>
          <StatCard>
            <StatIcon $bg="#00AEFF"><FiShield size={20} /></StatIcon>
            <StatInfo>
              <StatValue>{stats.admins}</StatValue>
              <StatLabel>Admins</StatLabel>
            </StatInfo>
          </StatCard>
          <StatCard>
            <StatIcon $bg="#00FF9D"><FiFileText size={20} /></StatIcon>
            <StatInfo>
              <StatValue>{stats.blogs}</StatValue>
              <StatLabel>Blog Posts</StatLabel>
            </StatInfo>
          </StatCard>
        </StatsRow>

        <TabBar>
          <Tab $active={tab === "users"} onClick={() => setTab("users")}>
            <FiUsers size={16} /> Users
          </Tab>
          <Tab $active={tab === "blogs"} onClick={() => setTab("blogs")}>
            <FiFileText size={16} /> Blog Posts
          </Tab>
          <div style={{ flex: 1 }} />
          <SearchWrapper>
            <SearchIcon><FiSearch size={14} /></SearchIcon>
            <SearchInput
              placeholder={`Search ${tab === "users" ? "users" : "blog posts"}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchWrapper>
          <ActionBtn onClick={fetchAll}>
            <FiRefreshCw size={14} /> Refresh
          </ActionBtn>
        </TabBar>

        {loading ? (
          <LoadingRow>Loading...</LoadingRow>
        ) : tab === "users" ? (
          <TableCard>
            <TableHeader>
              <TableTitle>All Users</TableTitle>
            </TableHeader>
            <TableWrapper>
              {filteredUsers.length === 0 ? (
                <EmptyState><FiAlertCircle size={20} style={{ marginBottom: 8 }} /><br />{users.length === 0 ? "No users found." : "No users match your search."}</EmptyState>
              ) : (
                <StyledTable>
                  <thead>
                    <tr>
                      <Th>ID</Th>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Joined</Th>
                      <Th>Role</Th>
                      <Th>Actions</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.user_id}>
                        <Td>{u.user_id}</Td>
                        <Td style={{ fontWeight: 600 }}>{u.name}</Td>
                        <Td>{u.email}</Td>
                        <Td>{formatDate(u.created_at)}</Td>
                        <Td>
                          <Badge $admin={u.is_admin}>
                            {u.is_admin ? "Admin" : "User"}
                          </Badge>
                        </Td>
                        <Td>
                          <div style={{ display: "flex", gap: 8 }}>
                            <ActionBtn onClick={() => toggleAdmin(u.user_id, u.is_admin)}>
                              <FiShield size={12} />
                              {u.is_admin ? "Revoke Admin" : "Make Admin"}
                            </ActionBtn>
                            <ActionBtn $danger onClick={() => deleteUser(u.user_id)}>
                              <FiTrash2 size={12} />
                              Delete
                            </ActionBtn>
                          </div>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </StyledTable>
              )}
            </TableWrapper>
          </TableCard>
        ) : (
          <TableCard>
            <TableHeader>
              <TableTitle>All Blog Posts</TableTitle>
            </TableHeader>
            <TableWrapper>
              {filteredBlogs.length === 0 ? (
                <EmptyState><FiAlertCircle size={20} style={{ marginBottom: 8 }} /><br />{blogs.length === 0 ? "No blog posts yet." : "No blog posts match your search."}</EmptyState>
              ) : (
                <StyledTable>
                  <thead>
                    <tr>
                      <Th>ID</Th>
                      <Th>Title</Th>
                      <Th>Author</Th>
                      <Th>Date</Th>
                      <Th>Actions</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBlogs.map((b) => (
                      <tr key={b.blog_id}>
                        <Td>{b.blog_id}</Td>
                        <Td style={{ fontWeight: 600, maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis" }}>
                          {b.title}
                        </Td>
                        <Td>{b.author_name}</Td>
                        <Td>{formatDate(b.created_at)}</Td>
                        <Td>
                          <ActionBtn $danger onClick={() => deleteBlog(b.blog_id)}>
                            <FiTrash2 size={12} />
                            Delete
                          </ActionBtn>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </StyledTable>
              )}
            </TableWrapper>
          </TableCard>
        )}
      </Wrapper>

      <ConfirmModal
        open={confirm.open}
        variant={confirm.variant}
        title={confirm.title}
        message={confirm.message}
        confirmLabel="Delete"
        onConfirm={confirm.onConfirm}
        onCancel={() => setConfirm((p) => ({ ...p, open: false }))}
      />
    </Container>
  );
};

export default AdminDashboard;
