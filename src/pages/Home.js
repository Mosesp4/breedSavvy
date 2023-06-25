import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [dogs, setDogs] = useState([]);

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
    fetchDogData();
  }, []);

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
            <div className="text-center">
            <div>
            <h1
              className="flex items-center justify-center text-white
              text-center px-5 text-3xl font-extrabold font-poppins lg:text-5xl"
            >
              The BREED SAVVY
            </h1>
            <p className="my-5 text-white">
              This application is powered by{" "}
              <a
                href="https://thedogapi.com"
                className="text-indigo-600 underline active:text-orange-400"
              >
                The Dog Api
              </a>
            </p>

              <form className="max-w-xl mx-auto" autoComplete="off">
                <input
                type="text"
                name="search"
                id="search"
                placeholder="Search for a dog / breed"
                className="py-4 px-4 rounded shadow w-full text-white bg-slate-400 
                placeholder-white"
                 />
              </form>
            </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 
              xl:grid-cols-3 my-10 lg:my-20">
                {dogs.map((dog) => (
                  <Link 
                  to={`/${dog.name}`} 
                  key={dog.id}
                  className="rounded hover:bg-black transition-all
                  duration-200"
                  >

                  <article className="bg-white text-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg">
                    <img src={dog.image.url} 
                    alt={dog.name}
                    loading="lazy"
                    className="rounded md:h-72 w-full object-cover"
                    />
              
                    <h3 className="text-lg font-bold mt-4">
                      {dog.name}
                    </h3>
                    <p className="text-slate-800">Bred For: {dog.bred_for}</p>
                  </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

// return <div><h1>HELLLO DOGG</h1></div>
