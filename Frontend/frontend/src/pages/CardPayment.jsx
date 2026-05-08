import React, { useState } from "react";

const CardPayment = ({ amount, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const txnId = `TXN${new Date().getTime()}`;

  const handlePay = () => {
    if (!cardNumber || !expiry || !cvv) {
      alert("Please fill all card details");
      return;
    }

    setStep(2);
    setTimeout(() => {
      setStep(3);
    }, 1500);
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1055 }}
    >
      <div
        className="bg-white rounded-4 shadow p-4 w-100"
        style={{ maxWidth: "420px" }}
      >
        {step === 1 && (
          <>
            <h5 className="fw-bold mb-3 text-center">Card Payment</h5>

            <input
              type="text"
              placeholder="Card Number"
              className="form-control mb-3"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />

            <div className="d-flex gap-2">
              <input
                type="text"
                placeholder="MM/YY"
                className="form-control mb-3"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />

              <input
                type="password"
                placeholder="CVV"
                className="form-control mb-3"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>

            <h4 className="fw-bold mb-3">₹{amount}</h4>

            <button onClick={handlePay} className="btn btn-primary w-100">
              Pay Now
            </button>

            <button onClick={onClose} className="btn btn-link w-100 mt-2">
              Cancel
            </button>
          </>
        )}

        {step === 2 && (
          <div className="text-center">
            <div className="spinner-border text-primary mb-3"></div>
            <h6>Processing Payment...</h6>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <div className="text-success fs-1 mb-2">✓</div>
            <h5 className="fw-bold mb-2">Payment Successful</h5>

            <p className="text-muted mb-1">₹{amount} paid</p>
            <p className="small text-muted mb-3">Transaction ID: {txnId}</p>

            <button onClick={onSuccess} className="btn btn-primary w-100">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPayment;
