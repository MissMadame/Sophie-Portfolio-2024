import React from "react";
import { useEffect, useState } from "react";
import sanityClient from "./client";
import { Link } from "react-router-dom";
import "./ProjectGrids.css";

const ProjectGrids = ({ selectedLabels }) => {
  const [projects, setProjects] = useState([]);

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

  return (
    <div className="mx-[10vw] mt-[5vh] text-sm  text-black flex flex-wrap justify-center gap-x-[10vw] gap-y-[5vh] pt-20 pb-16">
      {projects
        .filter(
          (project) =>
            selectedLabels.length === 0 ||
            project.labels.some((label) => selectedLabels.includes(label))
        )
        .map((project, index) => (
          <div
            key={index}
            className="bg-transparent overflow-hidden w-64 h-auto"
          >
            <Link to={`/project/${project.slug.current}`} className="block">
              <img
                src={project.mainImageUrl}
                alt={project.title}
                className="w-64 h-64 object-cover object-center hover-effect" // Apply the custom class here
              />
              <h3 className=" pt-2 font-BugrinoBold block">{project.title}</h3>
            </Link>
            <div className="my-[1vh]">
              <div className="text-sm flex flex-wrap underline">
                {project.labels.map((label, labelIndex) => (
                  <span key={labelIndex} className="mr-2">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProjectGrids;
