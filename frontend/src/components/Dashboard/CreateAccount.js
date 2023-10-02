import React, { useState } from "react";
import "../../styles/Register.css";
import Navbar from "../Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateAccount({ updateHasAccount }) {
  const [account, setAccount] = useState({
    dateOfBirth: "",
    gender: "",
    alternateEmailId: "",
    address: "",
    city: "",
    state:"",
    country:"",
    accountNumber:"",
    balanceGBP:100,
    balanceUSD:100,
    balanceEUR:100,
    id:""
  });

  const generateAccountNumber = () => {
    const accountNumber = Math.floor(
      700000000000 + Math.random() * 9000000000
    );
    return accountNumber;
  };
  
  const validateEmail = (email) => {
    const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!pattern.test(email)) {
      return false;
    }
    return true;
  };
  
  let navigate = useNavigate();
  
  const handleChanges = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if(account){
    if (account.dateOfBirth.length !== 10) {
      alert("Enter Date of Birth in the format of DD-MM-YYYY");
      return;
    }
    if (!validateEmail(account.alternateEmailId)) {
      alert("Invalid Email");
      return;
    }
    if (account.alternateEmailId.length < 3) {
      alert("Email must be at least 3 characters long");
      return;
    }
    account.accountNumber = generateAccountNumber();
    account.id=sessionStorage.getItem("id");
    axios.post("http://localhost:8081/accounts/createNewAccount", account);
    updateHasAccount(true);
    alert("Registered Successfully");
    navigate('/dashboard');
  }
  else{
    alert("Not a valid account Data")
  }
  };
  return (
    <div>
      
      <div className="signup-container">
        <h1 className="heading">Additional details to create your account</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Date of Birth :</label>
            <input
              className="name_field"
              type="text"
              id="dateOfBirth"
              name="dateOfBirth"
              value={account.dateOfBirth}
              onChange={handleChanges}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Gender :</label>
            <input
              className="name_field"
              type="text"
              id="gender"
              name="gender"
              value={account.gender}
              onChange={handleChanges}
            />
          </div>

          <div className="form-group">
            <label className="label">Alternate Email :</label>
            <input
              className="email_field"
              type="text"
              id="alternateEmailId"
              name="alternateEmailId"
              value={account.alternateEmailId}
              onChange={handleChanges}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Address :</label>
            <input
              className="phone_field"
              type="tel"
              id="address"
              name="address"
              value={account.address}
              onChange={handleChanges}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">City : </label>
            <input
              className="password_field_register"
              type="text"
              id="city"
              name="city"
              value={account.city}
              onChange={handleChanges}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">State : </label>
            <input
              className="confirm_password_field"
              type="text"
              id="state"
              name="state"
              value={account.state}
              onChange={handleChanges}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Country :</label>
            <input
              className="confirm_password_field"
              type="text"
              id="country"
              name="country"
              value={account.country}
              onChange={handleChanges}
              required
            />
          </div>

          <button className="submit_button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}