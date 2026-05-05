import React, { useEffect, useState } from "react";

export default function Departments() {
  const [department, setdepartment] = useState([]);
  const [activeTab, setactiveTab] = useState(null);

  //console.log(department);

  // useEffect(() => {
  //   fetch("http://localhost:5000/departments/Alldepartments")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setdepartment(data);
  //       if (data.length > 0) setactivTab(data[0]._id);
  //     })
  //     .catch((err) => console.error("Failed to fetch data", err));
  // }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/departments/Alldepartments",
        );
        const data = await res.json();
        setdepartment(data);
        //if (data.length > 0) setactivTab(data[0]._id);
        setactiveTab(data?.[0]?._id || null);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    getData();
  }, []);
  console.log(department);
  const handelTabClick = (id) => {
    setactiveTab(id);
  };
  return (
    <section className="py-12 bg-white max-w-6xl mx-auto px-4">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Departments</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Explore our specialized medical departments staffed with expert
          doctors.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs List */}
        <ul className="flex md:flex-col space-x-4 md:space-x-0 border-b md:border-b-0 md:border-r border-gray-300">
          {department.map((dep) => (
            <li key={dep._id}>
              <button
                onClick={() => handelTabClick(dep._id)}
                className={`w-40 mr-4 block mt-3 px-4 py-2 rounded-t md:rounded-tr-none md:rounded-l
          ${
            activeTab === dep._id
              ? "bg-[#008e9b] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
              >
                {dep?.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex-1 bg-gray-50 p-6 rounded shadow">
          {department?.map((dep) =>
            dep?._id === activeTab ? (
              <div
                key={dep._id}
                className="flex flex-col md:flex-row items-center gap-6"
              >
                <div className="">
                  <h3 className="font-bold text-[#02e2f6] mb-2 text-2xl">
                    {dep?.name}
                  </h3>
                  <p>{dep?.description}</p>
                </div>

                <div></div>
              </div>
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}

//   *******Update image

// const updateDepartment = async (id) => {
//   const formData = new FormData();
//   formData.append("name", name);
//   formData.append("description", description);
//   formData.append("image", imageFile); // إذا موجودة

//   try {
//     const res = await fetch(
//       `http://localhost:5000/departments/update/${id}`,
//       {
//         method: "PUT",
//         body: formData,
//       }
//     );

//     const data = await res.json();
//     console.log(data);

//     // refresh list
//     setdepartment((prev) =>
//       prev.map((dep) => (dep._id === id ? data.department : dep))
//     );
//   } catch (err) {
//     console.error(err);
//   }
// };

//   *******Update complete

// import React, { useEffect, useState } from "react";

// export default function Departments() {
//   const [department, setdepartment] = useState([]);
//   const [activeTab, setactiveTab] = useState(null);

//   // ===== EDIT STATES =====
//   const [editId, setEditId] = useState(null);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageFile, setImageFile] = useState(null);

//   // ===== GET DATA =====
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:5000/departments/Alldepartments"
//         );
//         const data = await res.json();

//         setdepartment(data);
//         setactiveTab(data?.[0]?._id || null);
//       } catch (error) {
//         console.error("Failed to fetch data", error);
//       }
//     };

//     getData();
//   }, []);

//   const handelTabClick = (id) => {
//     setactiveTab(id);
//   };

//   // ===== CLICK EDIT =====
//   const handleEdit = (dep) => {
//     setEditId(dep._id);
//     setName(dep.name);
//     setDescription(dep.description);
//   };

//   // ===== UPDATE =====
//   const updateDepartment = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("description", description);
//       if (imageFile) formData.append("image", imageFile);

//       const res = await fetch(
//         `http://localhost:5000/departments/update/${editId}`,
//         {
//           method: "PUT",
//           body: formData,
//         }
//       );

//       const data = await res.json();

//       setdepartment((prev) =>
//         prev.map((dep) =>
//           dep._id === editId ? data.department : dep
//         )
//       );

//       // reset
//       setEditId(null);
//       setName("");
//       setDescription("");
//       setImageFile(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <section className="py-12 bg-white max-w-6xl mx-auto px-4">
//       <div className="mb-8 text-center">
//         <h2 className="text-3xl font-bold mb-2">Departments</h2>
//         <p className="text-gray-600 max-w-xl mx-auto">
//           Explore our specialized medical departments staffed with expert doctors.
//         </p>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Tabs */}
//         <ul className="flex md:flex-col space-x-4 md:space-x-0 border-b md:border-b-0 md:border-r border-gray-300">
//           {department.map((dep) => (
//             <li key={dep._id}>
//               <button
//                 onClick={() => handelTabClick(dep._id)}
//                 className={`w-40 mr-4 block mt-3 px-4 py-2 rounded-t md:rounded-l
//                 ${
//                   activeTab === dep._id
//                     ? "bg-[#008e9b] text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {dep?.name}
//               </button>
//             </li>
//           ))}
//         </ul>

//         {/* CONTENT */}
//         <div className="flex-1 bg-gray-50 p-6 rounded shadow">
//           {department.map((dep) =>
//             dep?._id === activeTab ? (
//               <div key={dep._id}>
//                 <h3 className="font-bold text-[#02e2f6] mb-2 text-2xl">
//                   {dep?.name}
//                 </h3>

//                 <p className="mb-4">{dep?.description}</p>

//                 {/* EDIT BUTTON */}
//                 <button
//                   onClick={() => handleEdit(dep)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded"
//                 >
//                   Edit
//                 </button>
//               </div>
//             ) : null
//           )}

//           {/* ===== EDIT FORM ===== */}
//           {editId && (
//             <div className="mt-6 p-4 bg-white border rounded">
//               <h2 className="text-xl font-bold mb-3">Edit Department</h2>

//               <input
//                 className="border p-2 w-full mb-2"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Name"
//               />

//               <textarea
//                 className="border p-2 w-full mb-2"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Description"
//               />

//               <input
//                 type="file"
//                 className="mb-3"
//                 onChange={(e) => setImageFile(e.target.files[0])}
//               />

//               <div className="flex gap-2">
//                 <button
//                   onClick={updateDepartment}
//                   className="bg-green-500 text-white px-4 py-1"
//                 >
//                   Save
//                 </button>

//                 <button
//                   onClick={() => setEditId(null)}
//                   className="bg-red-500 text-white px-4 py-1"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

//   *******Update complete Pro

// import React, { useEffect, useState } from "react";

// export default function Departments() {
//   const [department, setdepartment] = useState([]);
//   const [activeTab, setactiveTab] = useState(null);

//   // ===== EDIT STATES =====
//   const [editId, setEditId] = useState(null);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageFile, setImageFile] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // ===== GET DATA =====
//   useEffect(() => {
//     const getData = async () => {
//       const res = await fetch(
//         "http://localhost:5000/departments/Alldepartments"
//       );
//       const data = await res.json();

//       setdepartment(data);
//       setactiveTab(data?.[0]?._id || null);
//     };

//     getData();
//   }, []);

//   // ===== EDIT CLICK =====
//   const handleEdit = (dep) => {
//     setEditId(dep._id);
//     setName(dep.name);
//     setDescription(dep.description);
//     setImageFile(null);
//   };

//   // ===== UPDATE =====
//   const updateDepartment = async () => {
//     setLoading(true);
//     setMessage("");

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("description", description);
//       if (imageFile) formData.append("image", imageFile);

//       const res = await fetch(
//         `http://localhost:5000/departments/update/${editId}`,
//         {
//           method: "PUT",
//           body: formData,
//         }
//       );

//       const data = await res.json();

//       setdepartment((prev) =>
//         prev.map((dep) =>
//           dep._id === editId ? data.department : dep
//         )
//       );

//       setMessage("✅ Updated successfully!");

//       setTimeout(() => {
//         setEditId(null);
//       }, 800);
//     } catch (err) {
//       setMessage("❌ Error updating department");
//     }

//     setLoading(false);
//   };

//   return (
//     <section className="p-6 max-w-6xl mx-auto">

//       {/* MESSAGE */}
//       {message && (
//         <div className="mb-3 p-2 bg-gray-100 border rounded">
//           {message}
//         </div>
//       )}

//       <div className="flex gap-6">

//         {/* LEFT TABS */}
//         <div className="w-1/3">
//           {department.map((dep) => (
//             <button
//               key={dep._id}
//               onClick={() => setactiveTab(dep._id)}
//               className={`block w-full p-2 mb-2 rounded ${
//                 activeTab === dep._id
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200"
//               }`}
//             >
//               {dep.name}
//             </button>
//           ))}
//         </div>

//         {/* RIGHT CONTENT */}
//         <div className="flex-1 p-4 border rounded">

//           {department.map((dep) =>
//             dep._id === activeTab ? (
//               <div key={dep._id}>
//                 <h2 className="text-xl font-bold">{dep.name}</h2>
//                 <p className="mb-3">{dep.description}</p>

//                 <button
//                   onClick={() => handleEdit(dep)}
//                   className="bg-green-500 text-white px-3 py-1"
//                 >
//                   Edit
//                 </button>
//               </div>
//             ) : null
//           )}

//         </div>
//       </div>

//       {/* ================= MODAL ================= */}
//       {editId && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

//           <div className="bg-white p-5 rounded w-[400px]">

//             <h2 className="text-lg font-bold mb-3">Edit Department</h2>

//             <input
//               className="border p-2 w-full mb-2"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />

//             <textarea
//               className="border p-2 w-full mb-2"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />

//             {/* IMAGE PREVIEW */}
//             <input
//               type="file"
//               onChange={(e) => setImageFile(e.target.files[0])}
//               className="mb-2"
//             />

//             {imageFile && (
//               <img
//                 src={URL.createObjectURL(imageFile)}
//                 className="w-full h-32 object-cover mb-2"
//               />
//             )}

//             {/* BUTTONS */}
//             <div className="flex justify-between">

//               <button
//                 onClick={() => setEditId(null)}
//                 className="bg-red-500 text-white px-3 py-1"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={updateDepartment}
//                 disabled={loading}
//                 className="bg-blue-500 text-white px-3 py-1"
//               >
//                 {loading ? "Saving..." : "Save"}
//               </button>

//             </div>

//           </div>
//         </div>
//       )}

//     </section>
//   );
// }
