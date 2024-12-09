import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';

const PaymentSuccessScreen = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    // Create a state to hold the API response result
    const [paymentStatus, setPaymentStatus] = useState(null);

    // Ref to track if the API has already been called
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return; // Prevent re-fetch if already fetched

        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user ? user._id : null;
        const packageInfoId = localStorage.getItem("packageInfoId");

        if (userId && packageInfoId) {
            // Call the API to add package to user
            fetch(`${apiUrl}/package/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, packageInfoId }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        // If the API returns success, set success status
                        setPaymentStatus('success');
                        alert("Đã thêm thành công! Vui lòng đăng nhập lại để sử dụng dịch vụ");
                    } else {
                        // If the API returns failure, set failure status
                        setPaymentStatus('failed');
                        alert(data.message); // Show the error message returned by the API
                    }
                })
                .catch((error) => {
                    setPaymentStatus('failed');
                    console.error("Error adding package to user:", error);
                });

            hasFetched.current = true; // Set the ref to true after the fetch is called
        } else {
            alert("Không thể lấy thông tin gói hoặc người dùng!");
            setPaymentStatus('failed');
            hasFetched.current = true; // Set ref to true to prevent future fetch calls
        }
    }, []); // Run effect once when component is mounted

    return (
        <div>
            <Header />
            {/* Conditionally render based on paymentStatus */}
            {paymentStatus === 'success' ? (
                <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Payment Success!</h1>
            ) : paymentStatus === 'failed' ? (
                <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Package Failed!</h1>
            ) : (
                <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</h1>
            )}
        </div>
    );
};

export default PaymentSuccessScreen;
