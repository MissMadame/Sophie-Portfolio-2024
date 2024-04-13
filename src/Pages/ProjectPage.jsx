import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import sanityClient from "../Components/client";
import LoadingComponent from "../Components/Loading";

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
          _createdAt
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
        const prevProjectQuery = `*[_type == "project" && _createdAt < $createdAt] | order(_createdAt desc)[0] {
          "slug": slug.current,
          title
        }`;
        const nextProjectQuery = `*[_type == "project" && _createdAt > $createdAt] | order(_createdAt asc)[0] {
          "slug": slug.current,
          title
        }`;
        const params = { createdAt: project._createdAt };
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
    <div className="flex flex-col md:flex-row px-[6vw] py-[5vh] font-BugrinoRegular">
      <div className="w-full md:w-1/4 md:fixed md:h-screen overflow-auto ">
        <div className="text-5xl mb-4">
          <Link to="/" className="cursor-pointer">
            ←
          </Link>
        </div>
        <div className="flex items-start underline gap-5 ">
          {prevProject && (
            <Link
              to={`/project/${prevProject.slug}`}
              className=" hover:bg-black hover:text-white hover:px-1`"
            >
              Previous Projects
            </Link>
          )}
          {nextProject && (
            <Link
              to={`/project/${nextProject.slug}`}
              className=" hover:bg-black hover:text-white hover:px-1`"
            >
              Next Projects
            </Link>
          )}
        </div>
        <h1 className="font-BugrinoBold mt-[10vh]">{project.title}</h1>
        <h1 className="mb-4">{project.date}</h1>
        <p className="text-sm">{project.description}</p>
      </div>
      <div className="w-full md:w-8/12 md:ml-[40%] overflow-auto ">
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
            <img
              src={url}
              alt={`Detail ${index}`}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
