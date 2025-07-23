import { Outlet } from "react-router";
import { Navigation } from "../shared/components";

type LayoutProps = {
  children?: React.ReactNode;
  title: string;
};

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <Navigation />
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children || <Outlet />}
      </main>
    </div>
  );
}
