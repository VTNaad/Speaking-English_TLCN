// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProductCard = ({ title, description, image, courseId }) => {  // Rename `images` to `image`
//   const [isHovered, setIsHovered] = useState(false);
//   const navigate = useNavigate();

//   const productCardStyle = {
//     border: '1px solid #ccc',
//     borderRadius: '20%',
//     padding: '30px',
//     margin: '50px',
//     backgroundColor: '#F8F8FF',
//     textAlign: 'center',
//     transition: 'transform 0.2s',
//     flex: '0 0 calc(25% - 20px)',
//     boxSizing: 'border-box',
//     transform: isHovered ? 'scale(1.05)' : 'scale(1.0)',
//   };

//   const imageStyle = {
//     width: '100%',
//     height: '150px',
//     objectFit: 'cover',
//     marginBottom: '20px',
//     borderRadius: '20%',
//   };

//   const headingStyle = {
//     margin: '10px 0',
//     fontSize: '1.5rem',
//   };

//   const paragraphStyle = {
//     color: '#666',
//   };

//   const buttonStyle = {
//     backgroundColor: '#33CC00',
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     padding: '12px 24px',
//     cursor: 'pointer',
//     fontSize: '16px',
//     fontWeight: '600',
//     textTransform: 'uppercase',
//     letterSpacing: '1px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
//     display: 'inline-block',
//   };

//   const buttonHoverStyle = {
//     ...buttonStyle,
//     backgroundColor: '#45a049',
//     transform: 'scale(1.05)',
//     boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
//   };

//   return (
//     <div
//       style={productCardStyle}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <img src={image} alt="Practice" style={imageStyle} />  {/* Display single image */}
//       <h3 style={headingStyle}>{title}</h3>
//       <p style={paragraphStyle}>{description}</p>
//       <button
//         style={isHovered ? buttonHoverStyle : buttonStyle}
//         onMouseDown={() => setIsHovered(false)}
//         onMouseUp={() => setIsHovered(true)}
//         onClick={() => navigate(`/lessons/${courseId}`)}
//       >
//         Practice
//       </button>
//     </div>
//   );
// };

// export default ProductCard;

import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ title, description, image, courseId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  // Lấy packageId từ localStorage
  const packageId = JSON.parse(localStorage.getItem('user'))?.package;
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  // useEffect(() => {
  //   // Nếu không có user trong localStorage, hiển thị modal
  //   if (!user) {
  //     setShowModal(true);
  //   }
  // }, [user]);

  const checkPackageAndNavigate = async () => {
    if (!user)
    {
      setShowModal(true);
      return;
    }
    if (!packageId) {
      setErrorMessage('Bạn cần đăng ký gói để truy cập nội dung.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/package/${packageId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Package tồn tại, điều hướng đến lessons
        navigate(`/lessons/${courseId}`);
      } else {
        setErrorMessage('Bạn cần đăng ký gói để truy cập nội dung.');
      }
    } catch (error) {
      console.error('Error fetching package:', error);
      setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/login');
  };

  const productCardStyle = {
    border: '1px solid #ccc',
    borderRadius: '20%',
    padding: '30px',
    margin: '50px',
    backgroundColor: '#F8F8FF',
    textAlign: 'center',
    transition: 'transform 0.2s',
    flex: '0 0 calc(25% - 20px)',
    boxSizing: 'border-box',
    transform: isHovered ? 'scale(1.05)' : 'scale(1.0)',
  };

  const imageStyle = {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    marginBottom: '20px',
    borderRadius: '20%',
  };

  const headingStyle = {
    margin: '10px 0',
    fontSize: '1.5rem',
  };

  const paragraphStyle = {
    color: '#666',
  };

  const buttonStyle = {
    backgroundColor: '#33CC00',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
    display: 'inline-block',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#45a049',
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  };

  return (
    <div
      style={productCardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={image} alt="Practice" style={imageStyle} />
      <h3 style={headingStyle}>{title}</h3>
      <p style={paragraphStyle}>{description}</p>
      <button
        style={isHovered ? buttonHoverStyle : buttonStyle}
        onMouseDown={() => setIsHovered(false)}
        onMouseUp={() => setIsHovered(true)}
        onClick={checkPackageAndNavigate}
      >
        Practice
      </button>
      {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
          }}
        >
          <p style={{ marginBottom: '20px' }}>Please sign in to continue.</p>
          <button
            style={{
              ...buttonStyle,
              backgroundColor: '#007BFF',
            }}
            onClick={handleModalClose}
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;

