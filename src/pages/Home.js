import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/DLogo.png";

export default function Home() {
  const [dogs, setDogs] = useState([]);
  const [text, setText] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const res = await fetch("https://api.thedogapi.com/v1/breeds");
        const data = await res.json();
        setDogs(data);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    setSearched(false);
    fetchDogData();
  }, []);

  const searchForDog = async () => {
    try {
      const res = await fetch(
        `https://api.thedogapi.com/v1/breeds/search?q=${text}`
      );
      const data = await res.json();
      setDogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    searchForDog();
    setSearched(true);
  };
  return (
    <>
      {!dogs ? (
        <h1
          className="flex items-center justify-center text-white text-center px-5
    text-3xl h-screen font-bold uppercase"
        >
          Loading...
        </h1>
      ) : (
        <>
          <section className="p-8 max-w-7 xl mx-auto">
            <div className="text-center ">
              <div>
                <div className="flex  items-center justify-center">
                <img src={Logo} alt="logo" className="h-32 w-32" />
                <h1
                  className="flex items-center justify-center text-white
              text-center  text-3xl font-extrabold font-poppins lg:text-5xl"
                >
                  The BREED SAVVY
                </h1>
                </div>
                <h2 className="text-white my-5 font-bold">Your Guide to Dog Breeds</h2>
                {/* <p className="my-5 text-white">
                  This application is powered by{" "}
                  <a
                    href="https://thedogapi.com"
                    className="text-red-400 underline active:text-orange-400"
                  >
                    The Dog Api
                  </a>
                </p> */}

                <form
                  onSubmit={handleSubmit}
                  className="max-w-xl mx-auto"
                  autoComplete="off"
                >
                  <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search for a dog / breed"
                    className="py-4 px-4 rounded shadow w-full text-black bg-white
                placeholder-black"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </form>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 my-10 lg:my-20">
                {!searched ? (
                  dogs.map((dog) => (
                    <Link
                      to={`/${dog.name}`}
                      key={dog.id}
                      className="bg-slate-700 p-4 rounded hover:bg-slate-600 transition-all duration-200"
                    >
                      <article>
                        <img
                          src={dog.image.url}
                          alt={dog.name}
                          loading="lazy"
                          className="rounded md:h-72 w-full object-cover"
                        />
                        <h3 className="text-white text-lg font-bold mt-4">
                          {dog.name}
                        </h3>
                        <p className="text-slate-400">
                          Bred For: {dog.bred_for}
                        </p>
                      </article>
                    </Link>
                  ))
                ) : (
                  <>
                    {dogs.map((dog) => (
                      <Link
                        to={`/${dog.name}`}
                        key={dog.id}
                        className="bg-slate-700 p-4 rounded hover:bg-black transition-all duration-200"
                      >
                        <article>
                          <img
                            src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                            alt={dog.name}
                            className="rounded md:h-72 w-full object-cover"
                          />
                          <h3 className="text-white text-lg font-bold mt-4">
                            {dog.name}
                          </h3>
                          <p className="text-slate-400">
                            Bred For: {dog.bred_for}
                          </p>
                        </article>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
