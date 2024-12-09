import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard'; // Đảm bảo bạn đã tạo component ProductCard

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
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

  // Lấy danh sách khóa học từ API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${apiUrl}/course/`); // Thay URL của API thật
        const data = await response.json();

        if (data.success) {
          setCourses(data.data); // Lưu danh sách khóa học vào state
        } else {
          setError('Không thể tải danh sách khóa học');
        }
      } catch (error) {
        setError('Lỗi khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    margin: '0 auto',
    maxWidth: '1200px',
  };

  const cardStyle = {
    flex: '0 0 calc(33.333% - 20px)', // 3 cột
    boxSizing: 'border-box',
  };

  return (
    <div style={containerStyle}>
      {courses.map((course) => (
        <div key={course._id} style={cardStyle}>
          <ProductCard
            title={course.title}
            description={course.description}
            image={getRandomImage()}
            courseId={course._id}
          />
        </div>
      ))}
    </div>
  );
};

export default CourseList;
