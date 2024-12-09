import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../modals/Modal';
import userAvatar from '../assets/user.png';

// Thêm icon cho avatar (tùy chọn)
import { FaUserCircle, FaSignOutAlt, FaSearch } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  // Hàm lấy thông tin người dùng từ token
  const getUserFromToken = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      else {
        console.log("TokenHeader:", token)
      }

      const response = await fetch(`${apiUrl}/user/getUserToken`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);

      if (data.success) {
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        // console.log("User data saved to localStorage:", data.user);
        setUser(data.user);
      } else {
        console.error("API did not return success:", data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  

  useEffect(() => {
    if (isDropdownOpen && user === null) {
      getUserFromToken();
    }
  }, [isDropdownOpen, user]);

  // Đóng dropdown khi nhấp ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null); // Xóa dữ liệu người dùng khi đăng xuất
    navigate('/login');
  };

  const handleAccountClick = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setDropdownOpen(!isDropdownOpen); // Mở hoặc đóng dropdown
    } else {
      setModalOpen(true); // Hiển thị modal nếu chưa đăng nhập
    }
  };

  const handleHomeClick = () => {
    navigate('/'); // Navigate to /home route
  };

  // const handleTalkClick = async () => {
  //   const packageId = JSON.parse(localStorage.getItem('user'))?.package;
  
  //   if (!packageId) {
  //     alert('Bạn cần đăng ký gói để truy cập nội dung.');
  //     return;
  //   }
  
  //   try {
  //     const response = await fetch(`http://localhost:8080/v1/api/package/${packageId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  
  //     const data = await response.json();
  
  //     if (response.ok && data.success) {
  //       navigate('/talkai');
  //     } else {
  //       alert('Bạn cần đăng ký gói để truy cập nội dung.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching package:', error);
  //     alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
  //   }
  // };
  
  const handleTalkClick = () => {
    navigate('/talkai'); // Navigate to /home route
  };

  const handleSearch = async (event) => {
    event.preventDefault();
  
    if (!searchQuery.trim()) {
      alert('Please enter a search query!');
      return;
    }
  
    try {
      const response = await fetch(`${apiUrl}/course/search/${encodeURIComponent(searchQuery)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.success) {
        // Lưu kết quả tìm kiếm vào localStorage hoặc truyền qua state nếu cần
        localStorage.setItem('searchResults', JSON.stringify(data.data));
        navigate('/search-results', { state: { results: data.data } });
      } else {
        alert(data.message || 'No courses found.');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('An error occurred while searching. Please try again.');
    }
  };

  const handlePackageClick = () => {
    navigate('/package');
  };

  const closeModal = () => setModalOpen(false);

  // CSS-in-JS cho phần giao diện
  const headerStyle = {
    background: 'linear-gradient(to right, #33FF33, #000080)', // Gradient màu xanh
    padding: '15px 30px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '20px', // Bo góc
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)', // Bóng mờ nhẹ
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  const headerItemStyle = {
    margin: '0 20px',
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',
  };

  const brandStyle = {
    fontWeight: 'bold',
    fontSize: '26px',
    fontFamily: "'Roboto', sans-serif",
    letterSpacing: '1px',
    color: '#fff',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', // Hiệu ứng chữ nổi
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '60px',
    right: '40px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    borderRadius: '10px',
    width: '250px',
    zIndex: 1,
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    opacity: isDropdownOpen ? 1 : 0,
    transform: isDropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
    visibility: isDropdownOpen ? 'visible' : 'hidden',
  };

  const dropdownHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  };

  const avatarStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '15px',
    objectFit: 'cover',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
  };

  const dropdownInfoStyle = {
    textAlign: 'left',
    color: '#333333',
    marginBottom: '10px',
  };

  const dropdownButtonStyle = {
    width: '100%',
    padding: '10px 0',
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease',
  };

  const searchStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: isFocused ? '#ffffff' : '#f1f1f1',
    borderRadius: '30px',
    padding: '10px 20px',
    boxShadow: isFocused
      ? '0px 4px 8px rgba(0, 0, 0, 0.2)'
      : '0px 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: isFocused ? '400px' : '300px',
    transition: 'all 0.3s ease',
    marginRight: '15px',
    flexGrow: 1,
  };

  const searchInputStyle = {
    border: 'none',
    outline: 'none',
    width: '100%',
    padding: '5px 10px',
    fontSize: '14px',
    color: '#333',
    background: 'transparent',
  };

  const searchIconStyle = {
    marginLeft: '10px',
    color: isFocused ? '#007BFF' : '#4CAF50',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: isFocused ? 'scale(1.2)' : 'scale(1)',
  };

  return (
    <header style={headerStyle}>
      <div style={brandStyle}>SpeechFriend</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <form style={searchStyle} onSubmit={handleSearch} onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={searchInputStyle}
          />
          <FaSearch style={searchIconStyle} onClick={handleSearch} />
        </form>
        <div style={headerItemStyle} onClick={handleHomeClick}>
          Home
        </div>
        <div style={headerItemStyle} onClick={handlePackageClick}>
          Package
        </div>
        <div style={headerItemStyle} onClick={handleTalkClick}>
          Talk With AI
        </div>
        {/* <div style={headerItemStyle}>My Course</div> */}
        <div style={headerItemStyle} onClick={handleAccountClick}>
          <FaUserCircle style={{ marginRight: '8px', fontSize: '20px' }} />
          Account
          {isDropdownOpen && (
            <div style={dropdownStyle} ref={dropdownRef}>
              {user ? (
                <>
                  <div style={dropdownHeaderStyle}>
                    <img
                      src= {userAvatar}
                      alt="User Avatar"
                      style={avatarStyle}
                    />
                    <div>
                      <h3 style={{ margin: 0 }}>{user.fullname}</h3>
                      <p style={{ margin: 0, fontSize: '14px', color: '#777' }}>{user.email}</p>
                    </div>
                  </div>
                  <div style={dropdownInfoStyle}>
                    <p><strong>Name:</strong> {user.fullname}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Status:</strong> {user.isBlocked ? "Blocked" : "Active"}</p>
                  </div>
                  <button
                    style={dropdownButtonStyle}
                    onClick={handleLogout}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
                  >
                    <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
                  </button>
                </>
              ) : (
                // <p style={{ color: '#555' }}>Loading...</p>
                <button
                    style={dropdownButtonStyle}
                    onClick={handleLogout}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
                  >
                    <FaSignOutAlt style={{ marginRight: '8px' }} /> Login
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal component */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        message="You don't have account, please log in !"
        messageStyle={{ color: 'black' }}
        onConfirm={() => {
          setModalOpen(false);
          navigate('/login'); // Chuyển hướng đến LoginScreen nếu chưa đăng nhập
        }}
      />
    </header>
  );
};

export default Header;

