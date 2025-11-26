import { ReactNode } from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
};

export function AdminTable<T extends { id?: string | number }>(
  {
    columns,
    data,
    loading = false,
    emptyMessage = "No records found.",
  }: {
    columns: Column<T>[];
    data: T[];
    loading?: boolean;
    emptyMessage?: string;
  }
) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {loading ? (
            <tr>
              <td className="px-4 py-6 text-center text-sm text-slate-500" colSpan={columns.length}>
                Loading…
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td className="px-4 py-6 text-center text-sm text-slate-500" colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={(row.id as string) ?? idx} className="hover:bg-slate-50">
                {columns.map((col) => (
                  <td key={col.header} className="px-4 py-3 text-sm text-slate-700">
                    {typeof col.accessor === "function"
                      ? col.accessor(row)
                      : (row[col.accessor] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
