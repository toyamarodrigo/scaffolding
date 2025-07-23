import { Link, useLocation } from "react-router";

type NavigationProps = {
  className?: string;
};

export const Navigation: React.FC<NavigationProps> = ({ className = "" }) => {
  const location = useLocation();

  const navigationItems = [
    { path: "/home", label: "Home" },
  ];

  const isActive = (path: string) => {
    if (path === "/home") {
      return location.pathname === "/home" || location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={className}>
      <ul className="flex space-x-6">
        {navigationItems.map(item => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.path)
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
