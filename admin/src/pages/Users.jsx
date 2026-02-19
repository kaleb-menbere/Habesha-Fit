import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiSearch, 
  FiEdit2, 
  FiTrash2, 
  FiUserPlus,
  FiFilter,
  FiDownload,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
  FiX
} from 'react-icons/fi';
import { users } from '../services/api';
import './Users.css';

export default function Users() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: '',
    subscriptionType: '',
    sortBy: 'createdAt',
    sortOrder: 'DESC'
  });
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    currentPage: 1
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await users.getAll(filters);
      setUserList(response.data.users);
      setPagination({
        total: response.data.count,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage
      });
      setSelectedUsers([]);
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({ ...filters, page: 1 });
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await users.delete(id);
        fetchUsers();
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Delete ${selectedUsers.length} users?`)) {
      try {
        for (const id of selectedUsers) {
          await users.delete(id);
        }
        fetchUsers();
        setShowBulkActions(false);
      } catch (err) {
        alert('Failed to delete some users');
      }
    }
  };

  const exportToCSV = () => {
    const headers = ['Phone', 'Name', 'Email', 'Status', 'Subscription', 'Points', 'Joined'];
    const csvData = userList.map(u => [
      u.phone,
      u.fullName,
      u.email || '',
      u.status,
      u.subscriptionType || '',
      u.point || 0,
      new Date(u.registrationDate).toLocaleDateString()
    ]);
    
    const csv = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const toggleSelectUser = (id) => {
    setSelectedUsers(prev => {
      const newSelected = prev.includes(id) 
        ? prev.filter(userId => userId !== id)
        : [...prev, id];
      setShowBulkActions(newSelected.length > 0);
      return newSelected;
    });
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === userList.length) {
      setSelectedUsers([]);
      setShowBulkActions(false);
    } else {
      setSelectedUsers(userList.map(u => u.id));
      setShowBulkActions(true);
    }
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
      search: '',
      status: '',
      subscriptionType: '',
      sortBy: 'createdAt',
      sortOrder: 'DESC'
    });
  };

  return (
    <div className="users-page">
      <div className="users-header">
        <div>
          <h1>User Management</h1>
          <p>Manage and view all registered users</p>
        </div>
        <div className="header-actions">
          <button onClick={exportToCSV} className="btn-export">
            <FiDownload /> Export
          </button>
          <Link to="/users/create" className="btn-create">
            <FiUserPlus /> Add User
          </Link>
        </div>
      </div>

      <div className="users-toolbar">
        <form onSubmit={handleSearch} className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by phone, name, or email..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
          />
          {filters.search && (
            <button 
              type="button" 
              className="clear-search"
              onClick={() => setFilters({ ...filters, search: '', page: 1 })}
            >
              <FiX />
            </button>
          )}
          <button type="submit">Search</button>
        </form>

        <div className="toolbar-actions">
          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> Filters
            {(filters.status || filters.subscriptionType) && (
              <span className="filter-badge">!</span>
            )}
          </button>
          <button className="refresh-btn" onClick={fetchUsers}>
            <FiRefreshCw />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3>Filters</h3>
            <button onClick={clearFilters} className="clear-filters">
              Clear All
            </button>
          </div>
          <div className="filters-grid">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>

            <select
              value={filters.subscriptionType}
              onChange={(e) => setFilters({ ...filters, subscriptionType: e.target.value, page: 1 })}
            >
              <option value="">All Subscriptions</option>
              <option value="Trial">Trial</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
              <option value="Admin">Admin</option>
            </select>

            <select
              value={filters.limit}
              onChange={(e) => setFilters({ ...filters, limit: e.target.value, page: 1 })}
            >
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
            </select>

            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            >
              <option value="createdAt">Sort by: Date</option>
              <option value="fullName">Sort by: Name</option>
              <option value="phone">Sort by: Phone</option>
              <option value="point">Sort by: Points</option>
            </select>

            <select
              value={filters.sortOrder}
              onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
            >
              <option value="DESC">Descending</option>
              <option value="ASC">Ascending</option>
            </select>
          </div>
        </div>
      )}

      {showBulkActions && (
        <div className="bulk-actions">
          <span>{selectedUsers.length} users selected</span>
          <div className="bulk-buttons">
            <button onClick={handleBulkDelete} className="bulk-delete">
              <FiTrash2 /> Delete Selected
            </button>
            <button onClick={() => setSelectedUsers([])} className="bulk-cancel">
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && <div className="users-error">{error}</div>}

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : (
        <>
          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th className="checkbox-cell">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === userList.length && userList.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th onClick={() => setFilters({ 
                    ...filters, 
                    sortBy: 'phone', 
                    sortOrder: filters.sortOrder === 'ASC' ? 'DESC' : 'ASC' 
                  })}>
                    Phone {filters.sortBy === 'phone' && (
                      <span className="sort-indicator">{filters.sortOrder === 'ASC' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th onClick={() => setFilters({ 
                    ...filters, 
                    sortBy: 'fullName', 
                    sortOrder: filters.sortOrder === 'ASC' ? 'DESC' : 'ASC' 
                  })}>
                    Name {filters.sortBy === 'fullName' && (
                      <span className="sort-indicator">{filters.sortOrder === 'ASC' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th>Email</th>
                  <th>Subscription</th>
                  <th>Status</th>
                  <th>Points</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userList.map(user => (
                  <tr key={user.id} className={selectedUsers.includes(user.id) ? 'selected' : ''}>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleSelectUser(user.id)}
                      />
                    </td>
                    <td>{user.phone}</td>
                    <td>
                      <div className="user-name-cell">
                        <div className="user-avatar-small">
                          {user.fullName?.charAt(0) || 'U'}
                        </div>
                        {user.fullName}
                      </div>
                    </td>
                    <td>{user.email || '-'}</td>
                    <td>
                      <span className={`sub-badge ${user.subscriptionType?.toLowerCase()}`}>
                        {user.subscriptionType || 'None'}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${user.status?.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="points-cell">{user.point || 0}</td>
                    <td>{new Date(user.registrationDate).toLocaleDateString()}</td>
                    <td className="actions">
                      <Link to={`/users/${user.id}`} className="btn-view" title="Edit">
                        <FiEdit2 />
                      </Link>
                      <button 
                        onClick={() => handleDelete(user.id, user.fullName)}
                        className="btn-delete"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                disabled={pagination.currentPage === 1}
                onClick={() => setFilters({ ...filters, page: pagination.currentPage - 1 })}
              >
                <FiChevronLeft /> Previous
              </button>
              
              <div className="page-numbers">
                {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (pagination.currentPage >= pagination.totalPages - 2) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = pagination.currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      className={`page-number ${pagination.currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => setFilters({ ...filters, page: pageNum })}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                className="pagination-btn"
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => setFilters({ ...filters, page: pagination.currentPage + 1 })}
              >
                Next <FiChevronRight />
              </button>
            </div>
          )}

          <div className="table-footer">
            Showing {((pagination.currentPage - 1) * filters.limit) + 1} to{' '}
            {Math.min(pagination.currentPage * filters.limit, pagination.total)} of{' '}
            {pagination.total} users
          </div>
        </>
      )}
    </div>
  );
}