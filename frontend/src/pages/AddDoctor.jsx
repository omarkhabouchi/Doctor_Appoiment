import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

// function AddDoctor() {
//   const { user } = useContext(AuthContext);

//   const [preview, setPreview] = useState(null);

//   const [error, setError] = useState(null);
//   const [form, setForm] = useState({
//     name: "",
//     specialty: "",
//     description: "",
//     experienceYears: "",
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (files) {
//       const file = files[0];
//       setForm({ ...form, image: file });
//       setPreview(URL.createObjectURL(file));
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };
//   // const handleChange = (e) => {
//   //   setform({ ...form, [e.targed.name]: e.targed.value });
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setError(null);
//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     const formData = new FormData();

//   //     formData.append("name", form.name);
//   //     formData.append("specialty", form.specialty);
//   //     formData.append("experienceYears", form.experienceYears);
//   //     formData.append("description", form.description);
//   //     if (form.image) formData.append("image", form.image);

//   //     // const res = await fetch("http://localhost:5000/doctors/addDoctor", {
//   //     //   method: "POST",
//   //     //   headers: { Authorization: `Bearer ${token}` },
//   //     //   body: formData,
//   //     // });

//   //     const res = await axios.post(
//   //       "http://localhost:5000/doctors/addDoctor",
//   //       formData,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       },
//   //     );

//   //     const data = await res.json();
//   //     console.log("Response status:", res.status, "Response data:", data);

//   //     if (!res.ok) {
//   //       throw new Error(data.message || "Failed to add doctor");
//   //     }

//   //     toast.success("Doctor added successfully!");
//   //     setForm({
//   //       name: "",
//   //       specialty: "",
//   //       experienceYears: "",
//   //       description: "",
//   //       image: null,
//   //     });
//   //     setPreview(null);
//   //   } catch (error) {
//   //     console.error("Error submitting form", error);
//   //     setError(error.message);
//   //     toast.error(error.message);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const token = localStorage.getItem("token");

//       const formData = new FormData();
//       formData.append("name", form.name);
//       formData.append("specialty", form.specialty);
//       formData.append("experienceYears", form.experienceYears);
//       formData.append("description", form.description);

//       if (form.image) {
//         formData.append("image", form.image);
//       }

//       const res = await axios.post(
//         "http://localhost:5000/doctors/addDoctor",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       console.log("Response:", res.data);

//       toast.success("Doctor added successfully!");

//       setForm({
//         name: "",
//         specialty: "",
//         experienceYears: "",
//         description: "",
//         image: null,
//       });

//       setPreview(null);
//     } catch (error) {
//       console.error("Error submitting form", error);

//       const message = error.response?.data?.message || "Failed to add doctor";

//       setError(message);
//       toast.error(message);
//     }
//   };

//   if (!user || user.role !== "admin") {
//     return (
//       <div className="flex items-center h-screen">
//         Only admin can add doctors
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl flex gap-8"
//         encType="multipart/form-data"
//       >
//         <div className="flex flex-col items-center w-1/3">
//           <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
//             {preview ? (
//               <img src={preview} className="object-cover w-full h-full" />
//             ) : (
//               <img src="./img/doctors/avatar.png" alt="Default avatar" />
//             )}
//           </div>
//           <button
//             type="button"
//             onClick={() => document.getElementById("fileInput").click()}
//             className="mt-4 bg-[#008e9b] text-white px-4 py-1 rounded hover:bg-[#007a85]"
//           >
//             Choose Image
//           </button>
//           <input
//             id="fileInput"
//             onChange={handleChange}
//             type="file"
//             accept="image/*"
//             className="hidden"
//           />
//         </div>

//         <div className="w-2/3">
//           <h2 className="text-2xl font-bold mb-6 text-[#008e9b] text-center">
//             Add New Doctor
//           </h2>

//           {error && <p className="text-red-500">{error}</p>}

//           <label className="block mb-2 font-semibold">Name</label>
//           <input
//             value={form.name}
//             onChange={handleChange}
//             type="text"
//             name="name"
//             required
//             className="w-full mb-4 p-2 border rounded"
//           />

//           <label className="block mb-2 font-semibold">Specialty</label>
//           <input
//             value={form.specialty}
//             onChange={handleChange}
//             type="text"
//             name="specialty"
//             required
//             className="w-full mb-4 p-2 border rounded"
//           />

//           <label className="block mb-2 font-semibold">Experience Years</label>
//           <input
//             value={form.experienceYears}
//             onChange={handleChange}
//             type="number"
//             name="experienceYears"
//             required
//             className="w-full mb-4 p-2 border rounded"
//           />

//           <label className="block mb-2 font-semibold">Description</label>
//           <input
//             onChange={handleChange}
//             value={form.description}
//             type="text"
//             name="description"
//             required
//             className="w-full mb-4 p-2 border rounded"
//           />

//           <button
//             type="submit"
//             className="w-full py-2 rounded bg-[#008e9b] text-white hover:bg-[#007a85]"
//           >
//             Add Doctor
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

function AddDoctor() {
  const { user } = useContext(AuthContext);

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    name: "",
    specialty: "",
    description: "",
    experienceYears: "",
    image: null,
  });

  // ✅ CORRIGÉ ICI (séparation propre image + texte)
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ❌ CORRIGÉ ICI (axios ne utilise PAS res.json ni res.ok)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("specialty", form.specialty);
      formData.append("experienceYears", form.experienceYears);
      formData.append("description", form.description);

      if (form.image) {
        formData.append("image", form.image);
      }

      // ✅ API CALL (CORRECT)
      const res = await axios.post(
        "http://localhost:5000/doctors/addDoctor",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // ❌ PAS besoin de Content-Type avec FormData
          },
        },
      );

      // ✅ CORRIGÉ ICI (axios => res.data)
      console.log("Response:", res.data);

      toast.success("Doctor added successfully!");

      // reset form
      setForm({
        name: "",
        specialty: "",
        experienceYears: "",
        description: "",
        image: null,
      });

      setPreview(null);
    } catch (error) {
      // ✅ CORRIGÉ ICI (gestion erreur axios)
      const message = error.response?.data?.message || "Failed to add doctor";

      setError(message);
      toast.error(message);
    }
  };

  // 🔒 protection admin
  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center h-screen">
        Only admin can add doctors
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl flex gap-8"
        encType="multipart/form-data"
      >
        {/* IMAGE */}
        <div className="flex flex-col items-center w-1/3">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
            {preview ? (
              <img
                src={preview}
                className="object-cover w-full h-full"
                alt="Doctor preview"
              />
            ) : (
              <img src="./img/doctors/avatar.png" alt="Default avatar" />
            )}
          </div>

          <button
            type="button"
            onClick={() => document.getElementById("fileInput").click()}
            className="mt-4 bg-[#008e9b] text-white px-4 py-1 rounded hover:bg-[#007a85]"
          >
            Choose Image
          </button>

          <input
            id="fileInput"
            onChange={handleChange}
            type="file"
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* FORM */}
        <div className="w-2/3">
          <h2 className="text-2xl font-bold mb-6 text-[#008e9b] text-center">
            Add New Doctor
          </h2>

          {error && <p className="text-red-500">{error}</p>}

          <label className="block mb-2 font-semibold">Name</label>
          <input
            value={form.name}
            onChange={handleChange}
            type="text"
            name="name"
            required
            className="w-full mb-4 p-2 border rounded"
          />

          <label className="block mb-2 font-semibold">Specialty</label>
          <input
            value={form.specialty}
            onChange={handleChange}
            type="text"
            name="specialty"
            required
            className="w-full mb-4 p-2 border rounded"
          />

          <label className="block mb-2 font-semibold">Experience Years</label>
          <input
            value={form.experienceYears}
            onChange={handleChange}
            type="number"
            name="experienceYears"
            required
            className="w-full mb-4 p-2 border rounded"
          />

          <label className="block mb-2 font-semibold">Description</label>
          <input
            value={form.description}
            onChange={handleChange}
            type="text"
            name="description"
            required
            className="w-full mb-4 p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full py-2 rounded bg-[#008e9b] text-white hover:bg-[#007a85]"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDoctor;
