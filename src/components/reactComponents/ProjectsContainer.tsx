import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ProjectsStore } from "../../stores/projectsStore";
import { ProjectItem } from "./ProjectItem";

import styles from "../../styles/ProjectSection.module.css";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export function ProjectsContainer() {
  const projects = useMemo(() => ProjectsStore, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const totalProjects = projects.length;
  const activeProject = projects[activeIndex];

  useEffect(() => {
    if (totalProjects < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((currentIndex) => (currentIndex + 1) % totalProjects);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, totalProjects]);

  const goToProject = (nextIndex: number) => {
    if (nextIndex === activeIndex) {
      return;
    }

    const normalizedIndex = (nextIndex + totalProjects) % totalProjects;
    setDirection(
      normalizedIndex > activeIndex ||
        (activeIndex === totalProjects - 1 && normalizedIndex === 0)
        ? 1
        : -1,
    );
    setActiveIndex(normalizedIndex);
  };

  return (
    <div className={styles.carousel_shell}>
      <div className={styles.carousel_viewport}>
        <div className={styles.carousel_track}>
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={activeProject.title}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className={styles.carousel_slide}
            >
              <ProjectItem project={activeProject} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div
        className={styles.carousel_progress}
        aria-label="Progreso del carrusel"
      >
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            className={`${styles.carousel_progress_item} ${index === activeIndex ? styles.carousel_progress_item_active : ""}`}
            onClick={() => goToProject(index)}
            aria-label={`Ir al proyecto ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
