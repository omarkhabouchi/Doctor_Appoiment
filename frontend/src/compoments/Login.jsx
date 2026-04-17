import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/user/login",
        form,
      );

      if (data.token) {
        // save token
        localStorage.setItem("token", data.token);

        // update context
        login(data.token);

        // redirect
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      // console.log(error.response?.data);
      //alert(err.response?.data?.message || "Server error");
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4 text-center font-bold">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

/*  


import React, { useState } from "react";

export default function Form() {
  const [formInputs, setFormInput] = useState({
    name: "",
    email: "",
    age: "",
    generalInfo: "",
  });

  const handleChange = (e) => {
    setFormInput({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formInputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        name="name"
        value={formInputs.name}
        onChange={handleChange}
      />

      <label>Email:</label>
      <input
        name="email"
        value={formInputs.email}
        onChange={handleChange}
      />

      <label>Age:</label>
      <input
        name="age"
        value={formInputs.age}
        onChange={handleChange}
      />

      <label>General Info:</label>
      <input
        name="generalInfo"
        value={formInputs.generalInfo}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

*/
/*

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-4 text-center font-bold">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}          // ✅ هنا زدنا value
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}       // ✅ هنا زادة
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
 */

/*


import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Validation
  const validate = () => {
    let newErrors = {};

    if (!form.email) {
      newErrors.email = "Email obligatoire";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Email invalide";
    }

    if (!form.password) {
      newErrors.password = "Password obligatoire";
    } else if (form.password.length < 6) {
      newErrors.password = "Min 6 caractères";
    }

    return newErrors;
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      await login(form); // appel API
    } catch (error) {
      setErrors({ general: "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-4 text-center font-bold">Login</h2>

        ////* Email 
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-1 p-2 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email}</p>
        )}

        /////* Password 
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-1 p-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password}</p>
        )}

        ///////* General Error 
        {errors.general && (
          <p className="text-red-500 text-center mb-2">
            {errors.general}
          </p>
        )}

        //////////* Button 
        <button
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-500"
          }`}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;

*/

/*
import React, { useState } from "react";

export default function FullForm() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    isStudent: false,
    gender: "",
    country: "",
    skills: [],
  });

  // ✅ handleChange عام
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ checklist (skills)
  const handleSkills = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setForm({
        ...form,
        skills: [...form.skills, value],
      });
    } else {
      setForm({
        ...form,
        skills: form.skills.filter((s) => s !== value),
      });
    }
  };

  // ✅ submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-[400px]"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Full Form
        </h2>

        ////////////* Name 
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        /////////////* Age 
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        /////////////*  Email 
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        /////////////* Password 
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        /////////////* Checkbox 
        <label className="flex items-center mb-3">
          <input
            type="checkbox"
            name="isStudent"
            checked={form.isStudent}
            onChange={handleChange}
            className="mr-2"
          />
          Student
        </label>

        /////////////* Radio 
        <div className="mb-3">
          <p>Gender:</p>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={form.gender === "male"}
              onChange={handleChange}
            />{" "}
            Male
          </label>
          <label className="ml-3">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={form.gender === "female"}
              onChange={handleChange}
            />{" "}
            Female
          </label>
        </div>

        /////////////* Select 
        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="">Choose country</option>
          <option value="tn">Tunisia</option>
          <option value="fr">France</option>
          <option value="us">USA</option>
        </select>

        /////////////* Checklist 
        <div className="mb-3">
          <p>Skills:</p>

          <label>
            <input
              type="checkbox"
              value="React"
              checked={form.skills.includes("React")}
              onChange={handleSkills}
            />{" "}
            React
          </label>

          <label className="ml-3">
            <input
              type="checkbox"
              value="Node"
              checked={form.skills.includes("Node")}
              onChange={handleSkills}
            />{" "}
            Node
          </label>

          <label className="ml-3">
            <input
              type="checkbox"
              value="MongoDB"
              checked={form.skills.includes("MongoDB")}
              onChange={handleSkills}
            />{" "}
            MongoDB
          </label>
        </div>

        /////////////* Button
        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
*/

//Form PRO (validation + clean)

/*

import React, { useState } from "react";

export default function Form() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    generalInfo: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ validation
    if (!form.name || !form.email) {
      alert("Name & Email required");
      return;
    }

    console.log("Form Data:", form);

    // reset form
    setForm({
      name: "",
      email: "",
      age: "",
      generalInfo: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-3">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" />
      <input name="generalInfo" value={form.generalInfo} onChange={handleChange} placeholder="Info" />

      <button type="submit">Submit</button>
    </form>
  );
}
*/

//Login PRO (real project)

/*
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("All fields required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.token) {
        login(data.token);
        navigate("/dashboard"); // ✅ redirect
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 w-96 mx-auto">
      <h2 className="text-xl mb-4">Login</h2>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full mb-2"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full mb-2"
      />

      <button disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}

export default Login;
*/

//Login.jsx (version pro)

/*
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("All fields required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/user/login",
        form
      );

      const data = res.data;

      if (data.token) {
        login(data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      // ✅ Axios error handling
      if (error.response) {
        alert(error.response.data.message || "Login failed");
      } else {
        alert("Server not responding");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 w-96 mx-auto">
      <h2 className="text-xl mb-4">Login</h2>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full mb-2"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full mb-2"
      />

      <button disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}

export default Login;



//Bonus (level supérieur)
//Axios global config (Best Practice)

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// ✅ auto add token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;

*/
