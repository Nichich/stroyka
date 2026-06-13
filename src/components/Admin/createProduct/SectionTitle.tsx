import React from "react";

export const SectionTitle: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({
  icon,
  children,
}) => (
  <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-800">
    <span className="flex h-5 w-5 items-center justify-center rounded border border-slate-300 text-[11px]">
      {icon}
    </span>
    {children}
  </h2>
);