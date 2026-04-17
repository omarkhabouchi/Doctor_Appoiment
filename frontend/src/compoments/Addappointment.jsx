import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function AddAppointment() {
  const { user } = useContext(AuthContext);

  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctor: "",
    date: "",
    reason: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ================= FETCH DOCTORS =================
  /* useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/doctors/allDoctors");

        if (!res.ok) throw new Error("Failed to fetch doctors");

        const data = await res.json();

        setDoctors(Array.isArray(data) ? data : data.doctors || []);
      } catch (err) {
        setError("Error loading doctors");
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  */

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:5000/doctors/allDoctors");
        const data = await res.json();

        console.log("API DOCTORS:", data);

        // 👇 IMPORTANT FIX
        setDoctors(data.doctors || data || []);
      } catch (error) {
        console.log("Error:", error);
        setError("Erreur chargement doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);
  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(
        "http://localhost:5000/appointments/createAppointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create appointment");
      }

      alert("Appointment created successfully 🎉");

      setForm({
        doctor: "",
        date: "",
        reason: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ================= NOT LOGGED IN =================
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-red-500">
        You need to login to create an appointment
      </div>
    );
  }

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading doctors...
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add Appointment</h2>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {/* DOCTOR */}
        <label className="block mb-2 text-sm font-semibold">Doctor</label>
        <select
          name="doctor"
          value={form.doctor}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        >
          <option value="">Select doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc?.name} - {doc?.specialty}
            </option>
          ))}
        </select>

        {/* DATE */}
        <label className="block mb-2 text-sm font-semibold">Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        {/* REASON */}
        <label className="block mb-2 text-sm font-semibold">Reason</label>
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded h-24 resize-none"
          placeholder="Describe your reason..."
          required
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-2 rounded text-white font-semibold ${
            submitting ? "bg-gray-400" : "bg-blue-500"
          }`}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddAppointment;
