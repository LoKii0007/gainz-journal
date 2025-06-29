import { Home, User, List } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Workouts",
    href: "/workouts",
    icon: List,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
];

const BottomNav = () => {
  return (
    <div className="sticky md:hidden bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border">
      <div className="grid h-full grid-cols-3">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "inline-flex flex-col items-center justify-center px-1 hover:bg-accent group",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={cn(
                    "w-5 h-5 mb-1 transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                <span className="text-xs">{item.title}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav; 