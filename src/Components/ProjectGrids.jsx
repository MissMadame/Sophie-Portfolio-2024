import React, { useState, useEffect } from "react";
import sanityClient from "./client";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./ProjectGrids.css";

// Assume placeholder.png is a lightweight, generic image stored in your public folder
const placeholderImage = "/loading.gif";

const ProjectGrids = ({ selectedLabels }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const query = `*[_type == "project"] | order(_createdAt asc) {
        title,
        slug,
        "mainImageUrl": mainImage.asset->url,
        labels
      }`;
      const fetchedProjects = await sanityClient.fetch(query);
      setProjects(fetchedProjects);
      setIsLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="px-[12vw] pt-[5vh] text-sm text-black flex flex-wrap justify-center gap-x-[8vw] gap-y-[5vh]">
          {projects
            .filter(
              (project) =>
                selectedLabels.length === 0 ||
                selectedLabels.every((label) => project.labels.includes(label))
            )
            .map((project, index) => (
              <div key={index} className="bg-transparent overflow-hidden w-72">
                <Link to={`/project/${project.slug.current}`}>
                  <div className="image-container outline-block hover:cursor-customHover hover:border-2 border-black">
                    <LazyLoadImage
                      alt={project.title}
                      effect="blur"
                      src={project.mainImageUrl}
                      placeholderSrc={project.mainImageUrl} // Use generic placeholder
                      onError={(e) => {
                        e.target.src = placeholderImage;
                      }} // Fallback to placeholder if the image fails to load
                    />
                  </div>
                  <h3 className="pt-2 pl-3 font-BugrinoBold block hover:cursor-customHover">
                    {project.title}
                  </h3>
                </Link>
                <div className="text-sm flex flex-wrap pl-3">
                  {project.labels.map((label, labelIndex) => (
                    <span key={labelIndex} className="mr-2">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default ProjectGrids;
