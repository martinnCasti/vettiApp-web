import React from "react";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Camila Carusso",
      role: "Role/Description",
      image: "/path/to/team-member3.jpg",
    },
    {
      name: "Juan Manuel Luzzi",
      role: "Role/Description",
      image: "/path/to/team-member2.jpg",
    },
    {
      name: "Paloma Menendez",
      role: "Role/Description",
      image: "/path/to/team-member1.jpg",
    },
    {
      name: "Martin Castiñeira",
      role: "Role/Description",
      image: "/path/to/team-member4.jpg",
    },
  ];

  return (
    <section className="max-container padding-container lg:flex flex-row size-full py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 py-10">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 m-2">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-full h-64 relative overflow-hidden rounded-lg shadow-md">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold m-5">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
