import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [adopterName, setAdopterName] = useState("");

  const confirmAppointment = async () => {
    try {
      await axios.post("http://localhost:8000/api/appointments", {
        animalId: id,
        date: selectedDate,
        adopterName,
      });
      await axios.patch(`http://localhost:8000/api/adopt-animal/${id}`);
      alert("Appointment booked successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div className="container my-4">
      <h2>Book an Appointment</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={adopterName}
        onChange={(e) => setAdopterName(e.target.value)}
        className="form-control my-3"
      />
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="form-control"
        minDate={new Date()}
      />
      <button className="btn btn-success my-4" onClick={confirmAppointment}>
        Confirm Adoption
      </button>
    </div>
  );
}

export default BookAppointment;