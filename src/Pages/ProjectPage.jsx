import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import sanityClient from "../Components/client";

const ProjectPage = () => {
  const [project, setProject] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      const query = `*[_type == "project" && slug.current == $slug][0] {
        title,
        description,
        date,
        "mainImageUrl": mainImage.asset->url,
        "otherImagesUrls": otherImages[].asset->url,
        "video": video[].asset->url, // Change "video" to "videos" and make it an array
      }`;
      const fetchedProject = await sanityClient.fetch(query, { slug });
      setProject(fetchedProject);
    };
    fetchProject();
  }, [slug]);

  if (!project) {
    return <div className="text-center">Loading...</div>;
  }

  console.log(project);
  return (
    <div className="container mx-auto px-[10vw] py-[5vh] bg-white text-black text-lg font-BugrinoRegular">
      <div className="pb-[5vh] text-4xl">
        <Link to="/" className="cursor-pointer">
          ←
        </Link>
      </div>
      <div className="px-[5vw] pb-[5vh]">
        <div className="flex flex-col md:flex-row gap-4 pb-[2vh]">
          <div className="w-full md:w-1/2">
            <h1 className="font-BugrinoBold mb-4">{project.title}</h1>
            <h1 className="font-BugrinoRegular mb-4">{project.date}</h1>
          </div>
          <div className="w-full md:w-1/2 md:text-left">
            <p className="text-lg">{project.description}</p>
          </div>
        </div>

        {/* need to be mp4 */}
        {project.video &&
          project.video.map((vi, index) => (
            <div key={index} className="mt-[1vh] video-container">
              <video controls className="w-full">
                <source src={vi} type="video/mp4" />
                Your browser does not support this video format.
              </video>
            </div>
          ))}
        {/* Display other images */}
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
