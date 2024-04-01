import React from "react";

const projects = [
  {
    title: "Dynamic Illustrations",
    labels: ["#Illustration", "#Motion Graphics"],
    imagePath: "https://picsum.photos/seed/picsum/200/300",
  },
  {
    title: "Modern Website Design",
    labels: ["#website Design"],
    imagePath: "https://picsum.photos/seed/picsum/201/301",
  },
  {
    title: "Creative Poster Collection",
    labels: ["#Poster", "#Collection"],
    imagePath: "https://picsum.photos/seed/picsum/202/302",
  },
  {
    title: "Innovative Packaging Designs",
    labels: ["#Packaging", "#Design"],
    imagePath: "https://picsum.photos/seed/picsum/203/303",
  },
  {
    title: "Publication Layout Concepts",
    labels: ["#Publication", "#Design"],
    imagePath: "https://picsum.photos/seed/picsum/204/304",
  },
  {
    title: "Complex Pattern Creations",
    labels: ["#Patterns", "#Art"],
    imagePath: "https://picsum.photos/seed/picsum/205/305",
  },
];

const scrollTo = (direction) => {
  const height = window.innerHeight;
  window.scrollBy({
    top: direction === "down" ? height : -height,
    behavior: "smooth",
  });
};

const ProjectGrids = ({ selectedLabels }) => {
  return (
    <div className="mx-[10vw] mt-[5vh] text-sm text-white flex flex-wrap justify-center gap-x-[10vw] gap-y-[5vh] pt-20 pb-16">
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
            <img
              src={project.imagePath}
              alt={project.title}
              className="w-64 h-64 object-cover object-center"
            />
            <div className="my-[1vh]">
              <h3 className="uppercase font-bold underline">{project.title}</h3>
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
