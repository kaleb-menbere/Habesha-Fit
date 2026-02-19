import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

export default function Layout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
}