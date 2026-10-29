import SkillsTable, { type Skill } from "../skills-table";

export default function TechSection({ skills }: { skills: Skill[] }) {
  return (
    <section className="mt-16 md:mt-24">
      <h2 className="mb-8 text-center text-2xl font-semibold text-primary sm:text-3xl">
        Tech &amp; Tools Used
      </h2>
      <SkillsTable skills={skills} />
    </section>
  );
}
