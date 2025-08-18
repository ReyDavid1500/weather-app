import type { PropsWithChildren } from "react";

export const ContainerWrapper = ({
  children,
  title,
  className = "",
}: PropsWithChildren<{ title: string; className?: string }>) => {
  return (
    <div className={`bg-gray-300/70 mb-5 py-4 rounded-xl ${className}`}>
      <div className="border-b border-gray-200 pb-4 mb-4 pl-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
};
