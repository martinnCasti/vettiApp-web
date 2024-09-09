import Image from "next/image";
import React from "react";

const Services = () => {
  return (
    <section className="max-container padding-container lg:flex flex-row size-full">
      <div className="flex justify-center size-full mb-5">
        <Image src="/cards.png" alt="dog&cat" width={600} height={600} />
      </div>
      <div className="p-3 m-3 regular-14 sm:regular-20">
        <div>
          <h1 className="bold-16 sm:bold-20">FEATURE1</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut porro
            sit eaque reprehenderit. Cumque veniam sapiente, repellat fuga
            fugit.
          </p>
        </div>
        <div>
          <h1 className="bold-16 sm:bold-20">FEATURE2</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio eius
            nam quae assumenda beatae.
          </p>
        </div>
        <div>
          <h1 className="bold-16 sm:bold-20">FEATURE3</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est
            perspiciatis delectus repudiandae tenetur deleniti repellendus
            beatae ratione in esse illum? Similique placeat numquam ex. A non
            illo harum voluptatibus id.
          </p>
        </div>
        <div>
          <h1 className="bold-16 sm:bold-20">FEATURE4</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumend.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
