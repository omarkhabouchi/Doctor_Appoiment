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
                  <h3 className="font-bold text-[#02e2f6] mb-2 text-2xl">{dep?.name}</h3>
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
