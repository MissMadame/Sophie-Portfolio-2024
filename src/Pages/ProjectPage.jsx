import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import sanityClient from "../Components/client";
import LoadingComponent from "../Components/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProjectPage = () => {
  const [project, setProject] = useState(null);
  const [prevProject, setPrevProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setIsLoading(true);
      const query = `{
        "project": *[_type == "project" && slug.current == $slug][0] {
          title,
          description,
          date,
          "mainImageUrl": mainImage.asset->url,
          "otherImagesUrls": otherImages[].asset->url,
          "video": video[].asset->url,
          orderRank
        },
      }`;
      const params = { slug };
      const result = await sanityClient.fetch(query, params);
      setProject(result.project);
    };

    fetchProjectDetails();
  }, [slug]);

  useEffect(() => {
    if (project) {
      const fetchPrevAndNextProjects = async () => {
        const prevProjectQuery = `*[_type == "project" && orderRank < $orderRank] | order(orderRank desc)[0] {
          "slug": slug.current,
          title
        }`;
        const nextProjectQuery = `*[_type == "project" && orderRank > $orderRank] | order(orderRank asc)[0] {
          "slug": slug.current,
          title
        }`;
        const params = { orderRank: project.orderRank };
        const prevProjectResult = await sanityClient.fetch(
          prevProjectQuery,
          params
        );
        const nextProjectResult = await sanityClient.fetch(
          nextProjectQuery,
          params
        );
        setPrevProject(prevProjectResult);
        setNextProject(nextProjectResult);
        setIsLoading(false);
      };

      fetchPrevAndNextProjects();
    }
  }, [project]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="w-full h-auto bg-white">
      <div className="flex flex-col md:flex-row px-[6vw] py-[5vh] font-BugrinoRegular">
        <div className="w-full md:w-1/4 md:fixed md:h-screen overflow-auto ">
          <div className="text-base mb-4">
            <Link to="/" className="hover:cursor-customHover text-lg">
              ←
            </Link>
          </div>
          <div className="flex items-start underline gap-5 ">
            {prevProject && (
              <Link
                to={`/project/${prevProject.slug}`}
                className=" hover:bg-black hover:text-white hover:px-1 hover:cursor-customHover"
              >
                Previous Projects
              </Link>
            )}
            {nextProject && (
              <Link
                to={`/project/${nextProject.slug}`}
                className=" hover:bg-black hover:text-white hover:px-1 hover:cursor-customHover"
              >
                Next Projects
              </Link>
            )}
          </div>
          <h1 className="font-BugrinoBold mt-[10vh] text-lg ">
            {project.title}
          </h1>
          <h1 className="mb-4 text-lg ">{project.date}</h1>
          <p className="text-lg">{project.description}</p>
        </div>
        <div className=" min-h-screen  w-full md:w-8/12 md:ml-[40%]">
          <div className=" overflow-auto ">
            {project.video &&
              project.video.map((vi, index) => (
                <div key={index} className="mt-[1vh] video-container">
                  <video controls className="w-full">
                    <source src={vi} type="video/mp4" />
                    Your browser does not support this video format.
                  </video>
                </div>
              ))}
            {project.otherImagesUrls?.map((url, index) => (
              <div key={index} className="mt-[1vh]">
                <LazyLoadImage
                  src={url}
                  alt={`Detail ${index}`}
                  effect="blur"
                  className="w-full object-cover fade-in"
                  placeholderSrc={url} // Use generated low-quality image URL
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
