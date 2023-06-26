import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function SingleDog() {
  const [dog, setDog] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchSingleDogData = async () => {
      try {
        const res = await fetch(
          `https://api.thedogapi.com/v1/breeds/search?q=${name}`
        );
        const data = await res.json();
        setDog(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleDogData();
  }, [name]);

  return (
    <>
      <section className="max-w-5xl mx-auto flex items-center justify-center h-screen">
        {dog.map((dog) => (
          <div key={dog.id}>
            <article className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:place-items-center">
              <img 
              src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`} 
              alt={dog.name} 
              />

           

            </article>
            <article>
              <h1 className="text-3xl font-bold text-white mb-8 lg:text-5xl">
                {dog.name}
                </h1>
              {dog.description && <p className="text-white text-sm lg:text-base leading-loose lg:leading-relaxed">
                {dog.description}
              </p>}
              <ul className="text-sm text-white leading-loose lg:text-base lg:leading-relaxed mt-5 ">
                {dog.origin && <li><span className="font-bold text-white">Origin:</span> {dog.origin}</li>}
                <li><span className="font-bold text-white">Bred for:</span> {dog.bred_for}</li>
                <li><span className="font-bold text-white">Life span:</span> {dog.life_span}</li>
                <li><span className="font-bold text-white">Temperament:</span> {dog.temperament}</li>
                {dog.breed_group && <li><span className="font-bold text-white">Breed Group:</span> {dog.breed_group}</li>}
                <li><span className="font-bold text-white">Height:</span> {dog.height.metric} cm</li>
                <li><span className="font-bold text-white">Weight:</span> {dog.weight.metric} kgs</li>

              </ul>

              <Link to="/" className="inline-block bg-slate-400 py-2 px-6 rounded mt-8
              hover:bg-white text-black transition-all duration-300">
                &larr; Back
                </Link>

            </article>
          </div>
        ))};
      </section>
    </>
  );
}
