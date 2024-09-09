import React from "react";
import Image from "next/image";
import Button from "./Button";

const Home = () => {
  return (
    <section className="max-container padding-container gap-20 py-10 pb-32 md:gap-28 lg:py-40 ">
      <div className="main-container text-wrap ">
        <h1 className="bold-20 align aling-center lg:bold-40 text-center">
          VettiApp - Lorem ipsum dolor
        </h1>
        <p className="text-center py-10 px-20">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque ab
          quam at eaque pariatur ex aliquid, hic impedit explicabo illo id
          magnam molestias odit corporis similique odio optio fugiat reiciendis?
        </p>
      </div>
      <div className="flex flex-col w-full ml-5 py-5 gap-3 sm:flex-row">
        <Button type="button" title="Descargar App" variant="btn_blue" />
        <Button
          type="button"
          title="Que es VettiApp?"
          icon="/play.png"
          variant="btn_bluegray"
        />
      </div>
    </section>
  );
};

export default Home;
