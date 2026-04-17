export default function SkillsTable({ skills }: { skills: { category: string; items: string }[] }) {
  return (
    <div className="max-w-3xl mx-auto overflow-hidden rounded-3xl border border-border bg-surface-elevated">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-8 py-5 text-left text-sm font-medium text-muted uppercase tracking-widest">
              Category
            </th>
            <th className="px-8 py-5 text-left text-sm font-medium text-muted uppercase tracking-widest">
              Technologies
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {skills.map((row, index) => (
            <tr key={index} className="hover:bg-surface transition-colors">
              <td className="px-8 py-6 font-medium text-foreground whitespace-nowrap">
                {row.category}
              </td>
              <td className="px-8 py-6 text-muted">
                {row.items}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}