
import React, { useState, useEffect } from 'react';
import '../styling/Products.css';
import Loader from '../components/loader';
import { useModal } from '../contexts/ModalContext';
import { FaAddressCard, FaCreditCard } from 'react-icons/fa';
import { SiPaypal } from 'react-icons/si';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { openModal } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://bitvest-server-dmlk.onrender.com/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCTAClick = (product) => {
    openModal(<ProductPurchaseModal product={product} />);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  return (
    <div className="styled-container">
      <h1 className="styled-heading">Our Investment Plans</h1>
      <div className="styled-product-list">
        {products.map((product) => (
          <div key={product.id} className="styled-product-card">
            <h2 className="styled-product-title">{product.name}</h2>
            <p className="styled-product-description">{product.description}</p>
            <ul className="styled-product-features">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button
              className="styled-product-cta"
              onClick={() => handleCTAClick(product)}
            >
              {product.ctaText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Separate Component for Modal Content ---
const ProductPurchaseModal = ({ product }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showNextPage, setShowNextPage] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('creditCard'); // Default payment method
  const { closeModal } = useModal();

  const handleTermsChange = (e) => {
    setAgreedToTerms(e.target.checked);
  };

  const handleContinue = () => {
    if (agreedToTerms) {
      setShowNextPage(true);
    } else {
      alert('Please agree to the terms and conditions.');
    }
  };


  const renderTermsAndConditions = () => (
    <div className="modal-content-container">
      <h2 className="modal-title">Terms and Conditions</h2>
      <p className="modal-description">{product.longDescription}</p>
      <p className="modal-description">
        By proceeding, you agree to our terms and conditions.
      </p>

      <div>
        <label className="terms-label">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={handleTermsChange}
          />
          I agree to the terms and conditions
        </label>
      </div>
      <button
        className="continue-button"
        onClick={handleContinue}
        disabled={!agreedToTerms}
      >
        Continue
      </button>
    </div>
  );

 const renderPurchaseForm = () => {

  return (
    <div className="modal-content-container">
      <h2 className="modal-title">Purchase {product.name}</h2>
      <p className="modal-description">
        Select your payment method and enter your details.
      </p>

      <div className="payment-buttons-container">
        <button
          className={`payment-button ${
            paymentMethod === 'creditCard' ? 'active' : ''
          }`}
          onClick={() => setPaymentMethod('creditCard')}
        >
          <FaCreditCard /> Credit Card
        </button>
        <button
          className={`payment-button ${
            paymentMethod === 'paypal' ? 'active' : ''
          }`}
          onClick={() => setPaymentMethod('paypal')}
        >
          <SiPaypal className='payment-icon'/> PayPal
        </button>
        <button
          className={`payment-button ${
            paymentMethod === 'mpesa' ? 'active' : ''
          }`}
          onClick={() => setPaymentMethod('mpesa')}
        >
          <FaAddressCard /> M-Pesa
        </button>
      </div>

      <p className='amount-info'>
        Amount: $<span className="amount-display">{product.amount}</span>
      </p>

      {paymentMethod === 'creditCard' && (
        <div>
          <form className="payment-form" action="">
            <div className="coolinput">
            <div>
            <label className="text" htmlFor="FullName">Full Name</label>
            <input className="input" type="text" id="FullName" placeholder="Enter your full name" />
            <label className="text" htmlFor="cardNumber">Card Number</label>
            <input className="input"type="text" id="cardNumber" placeholder="Enter card number" />
            </div>
            <div>
            <label className="text" htmlFor="expiryDate">Expiry Date</label>
            <input className="input" type="text" id="expiryDate" placeholder="MM/YY" />
            <label className="text" htmlFor="cvv">CVV</label>
            <input className="input" type="text" id="cvv" placeholder="Enter CVV" />
            </div>
            </div>
          </form>
        </div>
      )}

      {paymentMethod === 'paypal' && (
        <div>
          <p className='modal-description'>Temporarily out of service. Consider proceeding with another payment method.</p>
        </div>
      )}

      {paymentMethod === 'mpesa' && (
        <div>
          <p className='modal-description'>Enter your M-Pesa number to initiate an STK Push.</p>
          
          <div className="coolinput">
            <label htmlFor="mpesaNumber" className="text">M-Pesa Number:</label>
            <input type="text" id="mpesaNumber" placeholder="e.g., 2547XXXXXXXX" className="input" />
          </div>
        </div>
      )}

      <button className="purchase-button" onClick={closeModal}>
        Complete Purchase
      </button>
    </div>
  );
};


  return showNextPage ? renderPurchaseForm() : renderTermsAndConditions();
};

export default Products;
