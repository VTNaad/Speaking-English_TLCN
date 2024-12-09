import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import skyImage from '../assets/1s.jpg';
import companyImage from '../assets/company.jpg';
import ocean from '../assets/ocean.png';
import ProductCard from '../components/ProductCard'; // Ensure ProductCard component is created
import { useNavigate, useLocation } from 'react-router-dom';

const SearchScreen = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const results = location.state?.results || JSON.parse(localStorage.getItem('searchResults')) || [];

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setAccessToken(token);
    if (results.length === 0) {
      setError('No courses found.');
      setLoading(false);
    } else {
      setCourses(results);
      setLoading(false);
    }
  }, [results]);

  const getRandomImage = () => {
    const images = [
      require('../assets/speak.png'),
      require('../assets/speak2.jpg'),
      require('../assets/speak3.jpg'),
      require('../assets/speak4.jpg'),
      require('../assets/speak5.jpg'),
      require('../assets/speak6.jpg'),
      require('../assets/speak7.jpg'),
      require('../assets/speak8.jpg'),
      require('../assets/speak9.jpg'),
      require('../assets/speak10.jpg'),
      require('../assets/speak11.jpg'),
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const homeScreenStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#FFFFFF',
  };

  const introductionStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundImage: `url(${ocean})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '20px',
    color: '#fff',
    fontFamily: '"Poppins", sans-serif',
  };

  const frameStyle = {
    position: 'relative',
    margin: '20px auto',
    padding: '30px 20px 20px 20px',
    backgroundImage: `url(${skyImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '20px 20px 0 0',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
    width: '80%',
    color: '#fff',
  };

  const framePointerStyle = {
    position: 'absolute',
    bottom: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundImage: `url(${skyImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '60px',
    height: '20px',
    backgroundColor: '#fff',
    clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
  };

  const productsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    margin: '20px 0',
  };

  const companyIntroStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '60px 40px',
    backgroundColor: '#f4f7fa',
    marginTop: '40px',
    borderRadius: '10px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    borderTop: '3px solid #3b82f6',
    color: '#374151',
    fontFamily: '"Poppins", sans-serif',
    lineHeight: '1.8',
    maxWidth: '1200px',
    margin: '40px auto',
  };

  const textStyle = {
    flex: '1',
    paddingRight: '20px',
    fontSize: '18px',
  };

  const imageStyle = {
    flex: '1',
    maxWidth: '100%',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
  };

  return (
    <div style={homeScreenStyle}>
      <Header />
      <div style={introductionStyle}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>
          Welcome to the English Speaking Practice Website
        </h1>
        <p style={{ fontSize: '20px', marginBottom: '20px' }}>
          Explore the courses and improve your English communication skills!
        </p>
      </div>
      <div style={frameStyle}>
        <div style={framePointerStyle}></div>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>Course Overview</h2>
        <p style={{ fontSize: '18px' }}>
          Join us to embark on a journey towards mastering English speaking with structured lessons and practical exercises!
        </p>
      </div>
      <div style={productsStyle}>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          courses.map((course) => (
            <ProductCard
              key={course._id}
              title={course.title}
              description={course.description}
              image={getRandomImage()}
            />
          ))
        )}
      </div>
      <div style={companyIntroStyle}>
        <div style={textStyle}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>About Our Company</h2>
          <p style={{ marginBottom: '15px' }}>
            We are committed to providing top-notch English learning resources to help individuals
            around the world improve their communication skills.
          </p>
          <p>
            Our team of experienced instructors and developers is dedicated to helping you achieve
            fluency and confidence in English through our structured lessons and advanced learning tools.
          </p>
        </div>
        <div>
          <img src={companyImage} alt="Our Company" style={imageStyle} />
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
