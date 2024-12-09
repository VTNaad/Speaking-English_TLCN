import React, { useEffect, useState } from "react";
import "../css/PackageScreen.css";
import Header from "../components/Header";

const PackageScreen = ( {pkg} ) => {
  // Khai báo state để lưu dữ liệu các gói
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  // Danh sách các hình ảnh mặc định
  const defaultImages = {
    imgCircle: [
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/rocket.png", 
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/cog.png",   
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/paperplane.png", 
        "https://res.cloudinary.com/dvdabwrng/image/upload/v1733287161/boomerang_fjpvbn.png", 
    ],
    imgHeader: [
        "http://www.pixeden.com/media/k2/galleries/343/002-city-vector-background-town-vol2.jpg",
        "https://images.all-free-download.com/images/graphicwebp/blue_modern_city_vector_illustration_267221.webp",
        "https://c7.uihere.com/files/859/510/385/abstract-forest-landscape.jpg",
        "https://images.all-free-download.com/images/thumb/modern_city_drawing_multicolored_high_building_icons_6835922.webp",
    ]
  };

  // Hàm gọi API createPaymentUrl và chuyển hướng đến trang thanh toán
  const handleBuyNow = async (pkg) => {
    try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData && userData.package !== null) {
          alert('You already have a service package. You cannot purchase additional packages!');
          return;
        }

      localStorage.setItem("packageInfoId", pkg._id);
      // Lấy giá trị giá tiền của gói
      const amount = pkg.price;

      // Gọi API để tạo Payment URL
      const response = await fetch(`${apiUrl}/payment/create_payment_url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          bankCode: '',
          language: 'vn',
        }),
      });

      // Kiểm tra xem API có trả về thành công không
      if (response.ok) {
        const data = await response.json();
        if (data && data.url) {
          // Mở URL thanh toán trong tab mới
          window.open(data.url, '_blank');
        } else {
          alert('Không thể tạo URL thanh toán');
        }
      } else {
        alert('Lỗi khi gọi API tạo URL thanh toán');
      }
    } catch (error) {
      console.error('Error in handleBuyNow:', error);
      alert('Đã xảy ra lỗi khi tạo URL thanh toán ' + error.message);
    }
  };

  // Dùng useEffect để gọi API khi component mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Gọi API
        const response = await fetch(`${apiUrl}/packageinfo`);
        const data = await response.json();

        if (data.success) {
          setPackages(data.data);  // Lưu dữ liệu gói vào state
        } else {
          throw new Error("Failed to fetch packages");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);  // Hoàn thành việc gọi API
      }
    };

    fetchPackages();
  }, []); // Mảng rỗng để chỉ gọi khi component mount

  // Hiển thị loading hoặc lỗi nếu có
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
  };

  return (
    <div>
        <Header />
        <div className="container">   
            <div className="highlight-text">
                <span>PACKAGE SPEAKING ENGLISH</span>
            </div>
            <div className="package">
                {packages.map((pkg, index) => (
                    <section key={index} className="card">
                    <div className="card_inner">
                        <div className="card_inner__circle">
                        <img src={defaultImages.imgCircle[index % defaultImages.imgCircle.length]} alt="Package Icon" />
                        </div>
                        <div className="card_inner__header">
                        <img src={defaultImages.imgHeader[index % defaultImages.imgHeader.length]} alt="Package Background" />
                        </div>
                        <div className="card_inner__content">
                        <div className="title">{pkg.packageName}</div>
                        <div className="price">{formatPrice(pkg.price)}</div>
                        <div className="text">{pkg.description} </div>
                        </div>
                        <div className="card_inner__cta">
                        <button onClick={() => handleBuyNow(pkg)}>
                            <span>Buy Now</span>
                        </button>
                        </div>
                    </div>
                    </section>
                ))}
            </div>
        </div>
    </div>
  );
};

export default PackageScreen;
