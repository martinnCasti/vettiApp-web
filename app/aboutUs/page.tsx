"use client";
import React from "react";
import { TEAM_MEMBERS } from "@/constants/index";

const AboutUs = () => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const getImagePosition = (name: string) => {
    switch (name) {
      case "Camila Caruso":
        return "object-center";
      case "Juan Manuel Luzzi":
        return "object-top";
      case "Martin Castiñeira":
        return "object-[center_20%]";
      case "Paloma Menendez":
        return "object-[center_20%]";
      default:
        return "object-center";
    }
  };

  return (
    <section className="max-container padding-container lg:flex flex-row size-full py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 py-10">
          Nuestro Equipo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 m-2">
          {TEAM_MEMBERS.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-full aspect-[4/5] relative overflow-hidden rounded-lg shadow-md bg-gray-100">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-full object-cover ${getImagePosition(
                      member.name
                    )}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 text-4xl font-bold">
                    {getInitials(member.name)}
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
