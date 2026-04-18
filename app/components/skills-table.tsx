'use client';

import { useTheme } from '../theme-provider';

export default function SkillsTable({
  skills,
}: {
  skills: { category: string; items: string }[];
}) {
  const theme = useTheme();

  return (
    <div className={`max-w-3xl mx-auto overflow-hidden rounded-3xl ${theme.skills.container}`}>
      <table className="w-full">

        <thead>
          <tr className={`border-b ${theme.skills.border}`}>
            <th className={`px-8 py-5 text-left text-sm font-medium uppercase tracking-widest ${theme.skills.headerText}`}>
              Category
            </th>
            <th className={`px-8 py-5 text-left text-sm font-medium uppercase tracking-widest ${theme.skills.headerText}`}>
              Technologies
            </th>
          </tr>
        </thead>

        <tbody className={`divide-y ${theme.skills.divider}`}>
          {skills.map((row, index) => (
            <tr key={index} className={`transition-colors ${theme.skills.rowHover}`}>
              
              <td className={`px-8 py-6 font-medium whitespace-nowrap ${theme.skills.categoryText}`}>
                {row.category}
              </td>

              <td className={`px-8 py-6 ${theme.skills.itemsText}`}>
                {row.items}
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}