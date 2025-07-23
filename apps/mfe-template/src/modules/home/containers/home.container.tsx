// Container - Smart component with business logic
// Entry point for /home route

import { HomeView } from "../views/home.view";

export function HomeContainer() {
  // 🧠 Business logic would go here:
  // - API calls with hooks
  // - State management
  // - Event handlers
  // - Navigation logic

  // Example: const { data, loading } = useHomeData();
  // Example: const navigate = useNavigate();

  // 🎯 Pass data and callbacks to view
  return (
    <HomeView />
  );
}
