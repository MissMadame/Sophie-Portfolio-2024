import React, { useState, useEffect } from "react";
import sanityClient from "./client";
import { Link } from "react-router-dom";
import "./ProjectGrids.css";
import Loading from "./Loading"; // Import your loading component

const ProjectGrids = ({ selectedLabels }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add this line

  useEffect(() => {
    const fetchProjects = async () => {
      const query = `*[_type == "project"] | order(_createdAt asc)
      {
        title,
        slug,
        "mainImageUrl": mainImage.asset->url,
        labels
      }
      `;
      const fetchedProjects = await sanityClient.fetch(query);
      setProjects(fetchedProjects);
    };
    fetchProjects();
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false); // Set loading to false when image is loaded
  };

  return (
    <>
      {isLoading && <Loading />}{" "}
      {/* Show loading component when isLoading is true */}
      <div className="px-[12vw] pt-[5vh] text-sm text-black flex flex-wrap justify-center gap-x-[8vw] gap-y-[5vh] ">
        {projects
          .filter(
            (project) =>
              selectedLabels.length === 0 ||
              selectedLabels.every((label) => project.labels.includes(label))
          )
          .map((project, index) => (
            <div key={index} className="bg-transparent overflow-hidden w-72 ">
              <Link to={`/project/${project.slug.current}`}>
                <div className="image-container outline-block">
                  <img
                    src={project.mainImageUrl}
                    alt={project.title}
                    className="hover:border-4 hover:border-black hover:cursor-customHover"
                    onLoad={handleImageLoad} // Add this line
                  />
                </div>
                <h3 className="pt-2 pl-3 font-BugrinoBold block hover:cursor-customHover">
                  {project.title}
                </h3>
              </Link>

              <div className="text-sm flex flex-wrap pl-3 ">
                {project.labels.map((label, labelIndex) => (
                  <span key={labelIndex} className="mr-2">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ProjectGrids;
