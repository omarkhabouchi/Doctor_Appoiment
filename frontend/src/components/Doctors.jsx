import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/doctors/allDoctors");
        const data = await res.json();

        console.log("DATA:", data);

        setDoctors(Array.isArray(data) ? data : data.doctors);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#008e9b]">
        Our Doctors
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {doctors?.slice(0, 3).map((doc) => (
          <div
            className="bg-white rounded-lg shadow p-4 text-center"
            key={doc?._id}
          >
            <Link to={`/doctor/${doc?._id}`}>
              <img
                className="w-32 h-32 mx-auto rounded-full object-cover border mb-4"
                src={`http://localhost:5000/uploads/${doc?.image}`}
                alt={doc?.name || "doctor image"}
              />

              <h3 className="text-xl font-semibold">{doc?.name}</h3>

              <p className="text-gray-600">{doc.specialty}</p>

              <p className="text-sm text-gray-500">
                {doc?.experienceYears} Years Of Exprerience
              </p>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex  items-center justify-center  mt-8">
        <Link
          className="bg-[#46daea] flex gap-2 items-center p-3 text-black font-bold px-6 rounded text-center hover:bg-[#43b0ba] transition "
          to="/allDoctors"
        >
          See All Doctors <ArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default Doctors;
