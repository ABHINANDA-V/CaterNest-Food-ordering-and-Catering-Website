import React, { useState } from "react";

const UPIPayment = ({ amount, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState("");

  const handlePay = () => setStep(2);

  const txnId = `TXN${new Date().getTime()}`;
  const handleConfirm = () => {
    if (pin.length === 4) {
      setStep(3);
    } else {
      alert("Enter valid 4-digit UPI PIN");
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: 1055,
      }}
    >
      <div
        className="bg-white rounded-4 shadow p-4 w-100"
        style={{ maxWidth: "400px" }}
      >
        {step === 1 && (
          <>
            <h5 className="fw-bold mb-3 text-center">UPI Payment</h5>

            <p className="text-muted mb-1">Paying to</p>
            <p className="fw-semibold mb-3">merchant@upi</p>

            <p className="text-muted mb-1">Amount</p>
            <h3 className="fw-bold mb-4">₹{amount}</h3>

            <input
              type="text"
              placeholder="Add note (optional)"
              className="form-control mb-3"
            />

            <button onClick={handlePay} className="btn btn-primary w-100">
              Pay
            </button>

            <button onClick={onClose} className="btn btn-link w-100 mt-2">
              Cancel
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h5 className="fw-bold mb-3 text-center">Enter UPI PIN</h5>

            <input
              type="password"
              maxLength="4"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="form-control text-center fs-4 mb-3"
            />

            <button onClick={handleConfirm} className="btn btn-success w-100">
              Confirm Payment
            </button>
          </>
        )}

        {step === 3 && (
          <div className="text-center">
            <div className="text-success fs-1 mb-2">✓</div>

            <h5 className="fw-bold mb-2">Payment Successful</h5>

            <p className="text-muted mb-1">₹{amount} paid</p>
            <p className="small text-muted mb-3">
              Transaction ID: {txnId}
            </p>

            <button onClick={onSuccess} className="btn btn-primary w-100">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UPIPayment;
