import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <div className="layout-main">
        <div className="layout-sidebar">
          <Sidebar />
        </div>
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 