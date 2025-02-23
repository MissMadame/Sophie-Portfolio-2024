import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import sanityClient from "./client";
import imageUrlBuilder from "@sanity/image-url";
import "./ProjectGrids.css";

// Setup the builder
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source).width(100).height(100).quality(5).url();
}

const ProjectGrids = ({ selectedLabels }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const query = `*[_type == "project"] |order(orderRank){
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
        <div className="mx-[10vw] pt-[5vh] text-lg text-black flex flex-wrap gap-x-[2vw] gap-y-[5vh] justify-between">
          {projects
            .filter(
              (project) =>
                selectedLabels.length === 0 ||
                selectedLabels.every((label) => project.labels.includes(label))
            )
            .map((project, index) => (
              <div key={index} className="bg-transparent w-80 ">
                <Link to={`/project/${project.slug.current}`}>
                  <div className="image-container hover:cursor-customHover hover:border-2 border-black">
                    <LazyLoadImage
                      alt={project.title}
                      src={project.mainImageUrl}
                      placeholderSrc={project.mainImageUrl} // Use generated low-quality image URL
                      effect="blur"
                      onError={(e) => {
                        e.target.src = "/path/to/fallback-image.jpg"; // Specify a fallback image if needed
                      }}
                      className="fade-in"
                    />
                  </div>
                  <h3
                    className="pt-2 font-BugrinoBold block hover:cursor-customHover"
                    style={{ lineHeight: "1.5" }}
                  >
                    {project.title}
                  </h3>
                </Link>
                <div className="text-lg flex flex-wrap ">
                  {project.labels.map((label, labelIndex) => (
                    <span
                      key={labelIndex}
                      className="mr-2 "
                      style={{ lineHeight: "1.5" }}
                    >
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
