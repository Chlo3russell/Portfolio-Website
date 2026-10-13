import React from "react";
import Image from "next/image";
import { kebabCase } from "@/utils/utils";
import Link from "next/link";

// this is the UI for a single project card. 
// its meant to render a single item from the project list in projects.ts
// and appears in the project gallery page

// component signature
// expects a single project object from a parent component
function ProjectCard({ project }) {
  return (
    //outer card wrapper 
    //  sets the max width (max-w-sm) and centers the card horizontally (mx-auto)
    // uses flexbox to arrange the card content in a column (flex flex-col)
    // on medium screens and up (md:), it aligns the items to the start of the flex container (md:projects-start)
    // and justifies the content to the center (md:justify-center)
    // the key prop is used to uniquely identify each card in a list of cards, which helps React optimize rendering
    <div
      className="max-w-sm mx-auto flex flex-col projects-center md:projects-start md:justify-center"
      key={project.id}
    >
      <a
      // clickable content that links to the project page or github repo, opens in a new tab

      // href is set to the project link if it exists, otherwise it falls back to the github link
      // has to have one or the other, otherwise the card will not be clickable
        href={project.link || project.github}
        // opens a new tab when the link is clicked
        target="_blank"
        className={`w-full relative rounded-xl border-fun-gray border p-2 transition hover:-translate-y-2 hover:opacity-75 hover:border-fun-pink will-change-projectCard`}
      >
        <img
          // the image is wrapped within a link, so clicking the image will navigate to the project 
          className="w-full rounded-md"
          src={project.img}
        />
      </a>
      {/* Title and Icons */}
      <div className="w-full mt-5">
        <div className="flex projects-center justify-between">
          {/* Title is a clickable link */}
          <a href={project.link || project.github} target="_blank">
            <h3 className="text-lg font-bold">{project.title}</h3>
          </a>
          {/* Icons only show if the project has a link or github repo */}
          <div className="space-x-2">
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer">
                <Image
                  src="/static/icons/external-link.svg"
                  width={16}
                  height={16}
                  alt="Link Icon"
                />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer">
                <Image
                  src="/static/icons/github.svg"
                  width={16}
                  height={16}
                  alt="Github Icon"
                />
              </a>
            )}
          </div>
        </div>
        {/* Description */}
        <p className="text-fun-gray text-left text-sm">{project.desc}</p>
        {/* Tags */}
        {/* Loops through every tag in project.tags
        converts them to a URL-safe slug using kebabCase. Then ...
        creates a link like /projects/tag/{slug} . It uses
        a helper in utils.ts*/}
        <ul className="flex flex-wrap items-center mt-2 -ml-2 list-none">
          {project.tags.map((tag, index) => {
            return (
              <li key={tag}>
                <Link href={`/projects/tag/${kebabCase(tag)}`}>
                  <div className="m-1 rounded-lg text-sm bg-fun-pink-dark py-1 px-2 cursor-pointer hover:opacity-75">
                    {tag}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ProjectCard;
