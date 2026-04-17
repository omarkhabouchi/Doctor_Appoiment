import React, { useEffect, useState } from "react";

function Status() {
  const [DoctorCount, setDoctorCount] = useState(0);
  const [DepartmentCount, setDepartmentCount] = useState(0);
  useEffect(() => {
    const fetchstats = async () => {
      try {
        const doctorsStats = await fetch("http://localhost:5000/doctors/count");
        const departmentsStats = await fetch(
          "http://localhost:5000/departments/countdepa",
        );
        const doctorsData = await doctorsStats.json();
        const departmentData = await departmentsStats.json();
        setDoctorCount(doctorsData.count || 0);
        setDepartmentCount(departmentData.count || 0);
      } catch (error) {
        console.error("error fetching data ");
      }
    };
    fetchstats();
  }, []);

  const stats = [
    {
      icon: "fas fa-user-md",
      count: DoctorCount,
      label: "Doctors",
    },
    {
      icon: "far fa-hospital",
      count: DepartmentCount,
      label: "Departments",
    },
    {
      icon: "fas fa-flask",
      count: 8,
      label: "Research",
    },
    {
      icon: "fas fa-award",
      count: 8,
      label: "Awards",
    },
  ];
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {stats.map((item, index) => (
            <div
              className=" group flex items-center justify-start space-x-4 bg-white shadow-md rounded-lg p-6 hover:shadow-lg  hover:bg-[#008e9b] 
              transition-colors duration-300"
              key={index}
            >
              <i className={`${item.icon} text-[#46daea] text-4xl`}></i>
              <div>
                <span className="text-3xl font-bold block">{item.count}</span>
                <p className="group-hover:text-white">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h1>{DoctorCount}</h1>
      <h1>{DepartmentCount}</h1>
    </section>
  );
}

export default Status;

/*
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

function Status() {
  const [stats, setStats] = useState({
    doctors: 0,
    departments: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const [doctorsRes, departmentsRes] = await Promise.all([
        fetch(`${API_URL}/doctors/count`),
        fetch(`${API_URL}/departments/countdepa`),
      ]);

      if (!doctorsRes.ok || !departmentsRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const doctorsData = await doctorsRes.json();
      const departmentsData = await departmentsRes.json();

      setStats({
        doctors: doctorsData?.count ?? 0,
        departments: departmentsData?.count ?? 0,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Dashboard Status</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <div>
          <h3>Doctors</h3>
          <p>{stats.doctors}</p>
        </div>

        <div>
          <h3>Departments</h3>
          <p>{stats.departments}</p>
        </div>
      </div>
    </div>
  );
}

export default Status;*/
