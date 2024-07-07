import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/navbar";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "") {
      window.alert("All fields must be filled");
    } else {
      // Handle form submission logic here
      console.log("Form submitted successfully with:", { name, email, phone });
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("phone", phone);
      window.alert("Form submitted successfully");
      setName("");
      setEmail("");
      setPhone("");
      navigate("/success");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "30ch" },
          }}
          className="w-full max-w-md flex flex-col items-center"
          noValidate
          autoComplete="off"
          onSubmit={handlesubmit}
        >
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </Box>
      </div>
    </div>
  );
}
