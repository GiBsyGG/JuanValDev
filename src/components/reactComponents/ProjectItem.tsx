import styles from "../../styles/ProjectSection.module.css";

interface ProjectItemProps {
  project: {
    image_url: string;
    title: string;
    skillsUsed: string[];
    description: string;
    role: string;
    project_url: string;
  };
}

export function ProjectItem({ project }: ProjectItemProps) {
  const { image_url, title, skillsUsed, description, role, project_url } =
    project;

  return (
    <article className={styles.project_slide}>
      <div className={styles.project_slide_mobile_header}>
        <p className={styles.project_kicker}>Proyecto destacado</p>
        <h2>{title}</h2>
      </div>

      <div className={styles.project_slide_copy}>
        <p className={styles.project_kicker}>Proyecto destacado</p>
        <h2>{title}</h2>
        <p className={styles.project_description}>{description}</p>

        <div className={styles.project_meta}>
          <span className={styles.project_meta_label}>Mi aporte</span>
          <p>{role}</p>
        </div>

        <div
          className={styles.project_tags}
          aria-label="Tecnologías utilizadas"
        >
          {skillsUsed.map((skill) => (
            <span key={skill} className={styles.project_tag}>
              {skill}
            </span>
          ))}
        </div>

        <a
          href={project_url}
          className={styles.project_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver proyecto
        </a>
      </div>

      <div className={styles.project_slide_media}>
        <img
          src={image_url}
          alt={`Captura del proyecto ${title}`}
          loading="lazy"
        />
      </div>
    </article>
  );
}
