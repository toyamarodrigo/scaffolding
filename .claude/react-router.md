TITLE: Converting FormData to Object with Object.fromEntries
DESCRIPTION: Illustrates a common pattern for converting `FormData` directly into a plain JavaScript object using `Object.fromEntries`. This is useful when an API expects a simple object structure for updates, as shown with accessing `updates.first` and `updates.last`.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_36

LANGUAGE: tsx
CODE:
```
const updates = Object.fromEntries(formData);
updates.first; // "Some"
updates.last; // "Name"
```

----------------------------------------

TITLE: Create Home Index Route File
DESCRIPTION: This command creates a new file for the home index route, which will serve as the default component for the root path when no other child routes match.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_12

LANGUAGE: shellscript
CODE:
```
touch app/routes/home.tsx
```

----------------------------------------

TITLE: Accessing URLSearchParams in React Router Loader Function
DESCRIPTION: This TypeScript/React snippet demonstrates how to access `URLSearchParams` within a React Router `loader` function. It retrieves the 'q' parameter from the `request.url` and uses it to filter contacts, showcasing data filtering based on URL queries.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_47

LANGUAGE: tsx
CODE:
```
// existing imports & exports

export async function loader({
  request,
}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts };
}

// existing code
```

----------------------------------------

TITLE: Implementing Global Pending UI with React Router useNavigation Hook
DESCRIPTION: This example illustrates how to use React Router's `useNavigation` hook to provide global feedback during data loading. By checking the `navigation.state` property, typically 'loading', a CSS class can be conditionally applied to a parent element, preventing the app from feeling unresponsive during navigation.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_40

LANGUAGE: tsx
CODE:
```
import {
  Form,
  Link,
  NavLink,
  Outlet,
  useNavigation,
} from "react-router";

export default function SidebarLayout({
  loaderData,
}: Route.ComponentProps) {
  const { contacts } = loaderData;
  const navigation = useNavigation();

  return (
    <>
      {/* existing elements */}
      <div
        className={
          navigation.state === "loading" ? "loading" : ""
        }
        id="detail"
      >
        <Outlet />
      </div>
    </>
  );
}
```

----------------------------------------

TITLE: Render React Router Outlet for Nested Routes
DESCRIPTION: Demonstrates how to integrate the `Outlet` component into a parent layout component (`app/root.tsx`). Placing `Outlet` allows child routes to render their content within the parent's defined structure, enabling nested routing in React Router applications.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_6

LANGUAGE: tsx
CODE:
```
import {
  Form,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";

// existing imports & exports

export default function App() {
  return (
    <>
      <div id="sidebar">{/* other elements */}</div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
```

----------------------------------------

TITLE: Define Index Route in React Router Configuration
DESCRIPTION: This configuration snippet adds an index route for the home page, ensuring that a default component is rendered when the parent route's path is matched and no specific child route is active. It uses `index` and `route` functions from `@react-router/dev/routes`.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_13

LANGUAGE: ts
CODE:
```
import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("contacts/:contactId", "routes/contact.tsx"),
] satisfies RouteConfig;
```

----------------------------------------

TITLE: Styling Active Navigation Links with React Router NavLink
DESCRIPTION: This snippet demonstrates how to use React Router's `NavLink` component to apply dynamic CSS classes to navigation links. It leverages the `isActive` and `isPending` properties provided by `NavLink`'s render prop to style links based on their current navigation state, improving user feedback.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_39

LANGUAGE: tsx
CODE:
```
import { Form, Link, NavLink, Outlet } from "react-router";

// existing imports and exports

export default function SidebarLayout({
  loaderData,
}: Route.ComponentProps) {
  const { contacts } = loaderData;

  return (
    <>
      <div id="sidebar">
        {/* existing elements */}
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive
                    ? "active"
                    : isPending
                    ? "pending"
                    : ""
                }
                to={`contacts/${contact.id}`}
              >
                {/* existing elements */}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* existing elements */}
      </div>
      {/* existing elements */}
    </>
  );
}
```

----------------------------------------

TITLE: React Router Root Route Component (`app/root.tsx`)
DESCRIPTION: The comprehensive root route component for a React Router application, defined in `app/root.tsx`. This file includes the main `App` component for global UI elements like a sidebar with search and navigation, the `Layout` component for defining the HTML document structure, and an `ErrorBoundary` for handling application-wide errors. It serves as the foundational UI shell for all other routes.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_2

LANGUAGE: tsx
CODE:
```
import {
  Form,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";
import type { Route } from "./+types/root";

import appStylesHref from "./app.css?url";

export default function App() {
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              aria-label="Search contacts"
              id="q"
              name="q"
              placeholder="Search"
              type="search"
            />
            <div
              aria-hidden
              hidden={true}
              id="search-spinner"
            />
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`/contacts/1`}>Your Name</a>
            </li>
            <li>
              <a href={`/contacts/2`}>Your Friend</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

// The Layout component is a special export for the root route.
// It acts as your document's "app shell" for all route components, HydrateFallback, and ErrorBoundary
// For more information, see https://reactrouter.com/explanation/special-files#layout-export
export function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="stylesheet" href={appStylesHref} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// The top most error boundary for the app, rendered when your app throws an error
// For more information, see https://reactrouter.com/start/framework/route-module#errorboundary
export function ErrorBoundary({
  error,
}: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (
    import.meta.env.DEV &&
    error &&
    error instanceof Error
  ) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main id="error-page">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
```

----------------------------------------

TITLE: Submit React Router Form on Change with useSubmit
DESCRIPTION: This snippet demonstrates how to automatically submit a React Router `Form` component whenever its content changes. It utilizes the `useSubmit` hook, passing `event.currentTarget` (the form DOM node) to trigger a submission, enabling real-time filtering or search as the user types.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_51

LANGUAGE: tsx
CODE:
```
import {
  Form,
  Link,
  NavLink,
  Outlet,
  useNavigation,
  useSubmit,
} from "react-router";
// existing imports & exports

export default function SidebarLayout({
  loaderData,
}: Route.ComponentProps) {
  const { contacts, q } = loaderData;
  const navigation = useNavigation();
  const submit = useSubmit();

  // existing code

  return (
    <>
      <div id="sidebar">
        {/* existing elements */}
        <div>
          <Form
            id="search-form"
            onChange={(event) =>
              submit(event.currentTarget)
            }
            role="search"
          >
            {/* existing elements */}
          </Form>
          {/* existing elements */}
        </div>
        {/* existing elements */}
      </div>
      {/* existing elements */}
    </>
  );
}
```

----------------------------------------

TITLE: React Router Route Configuration for Destroy Action
DESCRIPTION: This TypeScript snippet demonstrates how to configure a new route in a React Router application. It maps the URL pattern `contacts/:contactId/destroy` to the `routes/destroy-contact.tsx` module, enabling the application to handle delete requests for specific contact IDs.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_43

LANGUAGE: tsx
CODE:
```
export default [
  // existing routes
  route(
    "contacts/:contactId/destroy",
    "routes/destroy-contact.tsx"
  ),
  // existing routes
] satisfies RouteConfig;
```

----------------------------------------

TITLE: Accessing Form Data in React Router Action Function
DESCRIPTION: Demonstrates how to extract individual form field values from the `request.formData()` object within a React Router `action` function. The `ActionFunctionArgs` type provides access to `params` and the `request` object.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_35

LANGUAGE: tsx
CODE:
```
export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const firstName = formData.get("first");
  const lastName = formData.get("last");
  // ...
};
```

----------------------------------------

TITLE: HTML Input Element for React Router Form
DESCRIPTION: This snippet shows a standard HTML input field within a React Router application. The `name` attribute is crucial as it allows the form data to be accessed by name in the `action` function via `request.formData()`.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_34

LANGUAGE: tsx
CODE:
```
<input
  aria-label="First name"
  defaultValue={contact.first}
  name="first"
  placeholder="First"
  type="text"
/>
```

----------------------------------------

TITLE: Create About Route File
DESCRIPTION: Creates a new TypeScript file named `about.tsx` within the `app/routes` directory, which will serve as the component for the 'About' page.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_15

LANGUAGE: shellscript
CODE:
```
touch app/routes/about.tsx
```

----------------------------------------

TITLE: Shell Command to Create Destroy Route Module
DESCRIPTION: This shell command creates a new TypeScript file, `app/routes/destroy-contact.tsx`, which will house the action logic for deleting contact records in a Remix/React Router application.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_42

LANGUAGE: shellscript
CODE:
```
touch app/routes/destroy-contact.tsx
```

----------------------------------------

TITLE: Implement Optimistic Favorite Button with React Router useFetcher
DESCRIPTION: This code snippet demonstrates how to create an optimistic UI for a favorite button using React Router's `useFetcher` hook. It reads the `favorite` status directly from `fetcher.formData` to update the UI immediately upon submission, providing instant feedback to the user. If the network request eventually fails, the UI would revert to the actual data. The component renders a `fetcher.Form` with a button that toggles the favorite status.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_58

LANGUAGE: tsx
CODE:
```
// existing code

function Favorite({
  contact,
}: {
  contact: Pick<ContactRecord, "favorite">;
}) {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;

  return (
    <fetcher.Form method="post">
      <button
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
```

----------------------------------------

TITLE: Initialize Form Input from URL Query Parameter in Remix Loader
DESCRIPTION: This snippet demonstrates how to retrieve a query parameter ('q') from the URL within a Remix `loader` function and pass it to the component. The input field's `defaultValue` is then set using this 'q' value, ensuring the form state is synchronized with the URL upon page refresh.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_48

LANGUAGE: tsx
CODE:
```
// existing imports & exports

export async function loader({
  request,
}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export default function SidebarLayout({
  loaderData,
}: Route.ComponentProps) {
  const { contacts, q } = loaderData;
  const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">
        {/* existing elements */}
        <div>
          <Form id="search-form" role="search">
            <input
              aria-label="Search contacts"
              defaultValue={q || ""}
              id="q"
              name="q"
              placeholder="Search"
              type="search"
            />
            {/* existing elements */}
          </Form>
          {/* existing elements */}
        </div>
        {/* existing elements */}
      </div>
      {/* existing elements */}
    </>
  );
}
```

----------------------------------------

TITLE: Synchronize Form Input with URL Query using useEffect (Uncontrolled)
DESCRIPTION: This code snippet shows how to use React's `useEffect` hook to keep an uncontrolled input field's value synchronized with changes in the URL's 'q' query parameter. It directly manipulates the DOM element's `value` property when the 'q' dependency changes, addressing issues with browser back/forward navigation.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_49

LANGUAGE: tsx
CODE:
```
// existing imports
import { useEffect } from "react";

// existing imports & exports

export default function SidebarLayout({
  loaderData,
}: Route.ComponentProps) {
  const { contacts, q } = loaderData;
  const navigation = useNavigation();

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  // existing code
}
```

----------------------------------------

TITLE: Basic Route Object Definition with createBrowserRouter (TSX)
DESCRIPTION: Demonstrates the fundamental structure of a Route Object passed to `createBrowserRouter`, defining a basic route with a path and a component.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/data/route-object.md#_snippet_0

LANGUAGE: tsx
CODE:
```
createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
]);
```

----------------------------------------

TITLE: Using Route Loader for Data Provisioning (TSX)
DESCRIPTION: Shows how the `loader` property provides data to route components before they are rendered. It demonstrates an asynchronous loader function fetching data and the `useLoaderData` hook consuming it in the component.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/data/route-object.md#_snippet_2

LANGUAGE: tsx
CODE:
```
import {
  useLoaderData,
  createBrowserRouter,
} from "react-router";

createBrowserRouter([
  {
    path: "/",
    loader: loader,
    Component: MyRoute,
  },
]);

async function loader({ params }) {
  return { message: "Hello, world!" };
}

function MyRoute() {
  let data = useLoaderData();
  return <h1>{data.message}</h1>;
}
```

----------------------------------------

TITLE: Adding an Action to a Route
DESCRIPTION: This snippet demonstrates how to add an asynchronous `clientAction` to a route. This action simulates a delay, retrieves form data, updates `localStorage` with a new title, and returns a success status. This action will be called by a fetcher.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/how-to/fetchers.md#_snippet_1

LANGUAGE: tsx
CODE:
```
import { useLoaderData } from "react-router";

export async function clientLoader({ request }) {
  // ...
}

export async function clientAction({ request }) {
  await new Promise((res) => setTimeout(res, 1000));
  let data = await request.formData();
  localStorage.setItem("title", data.get("title"));
  return { ok: true };
}

export default function Component() {
  let data = useLoaderData();
  // ...
}
```

----------------------------------------

TITLE: Creating a Search Route with Loader
DESCRIPTION: This snippet defines a `clientLoader` for a search route (`/search-users`). It simulates a delay and filters a predefined list of users based on a query parameter (`q`) from the request URL, demonstrating how to load and filter data using a loader.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/how-to/fetchers.md#_snippet_6

LANGUAGE: tsx
CODE:
```
// { path: '/search-users', filename: './search-users.tsx' }
const users = [
  { id: 1, name: "Ryan" },
  { id: 2, name: "Michael" },
  // ...
];

export async function loader({ request }) {
  await new Promise((res) => setTimeout(res, 300));
  let url = new URL(request.url);
  let query = url.searchParams.get("q");
  return users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );
}
```

----------------------------------------

TITLE: Define Action for useFetcher Form in React Router
DESCRIPTION: This snippet provides the `action` function necessary to handle submissions from a `fetcher.Form`. It demonstrates how to access `formData` from the request, extract specific values (like 'favorite'), and then use them to update data, such as a contact's favorite status, without triggering a navigation.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_57

LANGUAGE: tsx
CODE:
```
// existing imports
import { getContact, updateContact } from "../data";
// existing imports

export async function action({
  params,
  request,
}: Route.ActionArgs) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

// existing code
```

----------------------------------------

TITLE: Define Route Actions in React Router
DESCRIPTION: Route actions are defined on the `action` property of a route object. They handle data mutations, and upon completion, all loader data on the page is automatically revalidated to keep the UI synchronized with the updated data without requiring additional code.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/data/actions.md#_snippet_0

LANGUAGE: tsx
CODE:
```
import { createBrowserRouter } from "react-router";
import { someApi } from "./api";

let router = createBrowserRouter([
  {
    path: "/projects/:projectId",
    Component: Project,
    action: async ({ request }) => {
      let formData = await request.formData();
      let title = formData.get("title");
      let project = await someApi.updateProject({ title });
      return project;
    },
  },
]);
```

----------------------------------------

TITLE: Exporting React Router Action Function for New Contact Creation
DESCRIPTION: This TypeScript/TSX code snippet defines an asynchronous `action` function within `app/root.tsx`. This function serves as the handler for form submissions, specifically designed to create a new empty contact by calling `createEmptyContact()`. After creating the contact, it returns an object containing the new contact, which signals React Router to automatically revalidate and update the UI.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/tutorials/address-book.md#_snippet_29

LANGUAGE: tsx
CODE:
```
// existing imports

import { createEmptyContact } from "./data";

export async function action() {
  const contact = await createEmptyContact();
  return { contact };
}

// existing code
```

----------------------------------------

TITLE: Rendering Pending State with Fetcher
DESCRIPTION: This snippet demonstrates how to display a pending UI (e.g., 'Saving...') based on the fetcher's `state` property. It shows a message when the fetcher is actively performing an asynchronous operation, providing immediate feedback to the user.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/how-to/fetchers.md#_snippet_3

LANGUAGE: tsx
CODE:
```
export default function Component() {
  let data = useLoaderData();
  let fetcher = useFetcher();
  return (
    <div>
      <h1>{data.title}</h1>

      <fetcher.Form method="post">
        <input type="text" name="title" />
        {fetcher.state !== "idle" && <p>Saving...</p>}
      </fetcher.Form>
    </div>
  );
}
```

----------------------------------------

TITLE: Implementing Route Actions for Data Mutations (TSX)
DESCRIPTION: Explains the `action` property for server-side data mutations with automatic revalidation. It includes an example of an action handling form submissions, a loader fetching items, and a component displaying the list with a form.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/data/route-object.md#_snippet_3

LANGUAGE: tsx
CODE:
```
import {
  createBrowserRouter,
  useLoaderData,
  useActionData,
  Form,
} from "react-router";
import { TodoList } from "~/components/TodoList";

createBrowserRouter([
  {
    path: "/items",
    action: action,
    loader: loader,
    Component: Items,
  },
]);

async function action({ request }) {
  const data = await request.formData();
  const todo = await fakeDb.addItem({
    title: data.get("title"),
  });
  return { ok: true };
}

// this data will be revalidated after the action completes...
async function loader() {
  const items = await fakeDb.getItems();
  return { items };
}

// ...so that the list here is updated automatically
export default function Items() {
  let data = useLoaderData();
  return (
    <div>
      <List items={data.items} />
      <Form method="post" navigate={false}>
        <input type="text" name="title" />
        <button type="submit">Create Todo</button>
      </Form>
    </div>
  );
}
```

----------------------------------------

TITLE: Configure Advanced Routes with Index, Layout, and Prefix
DESCRIPTION: This example showcases more sophisticated route configuration options available in React Router. It illustrates the use of `index` for default routes, `layout` for shared UI structures, and `prefix` for grouping routes under a common path, enabling complex routing hierarchies.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/framework/routing.md#_snippet_1

LANGUAGE: ts
CODE:
```
import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./home.tsx"),
  route("about", "./about.tsx"),

  layout("./auth/layout.tsx", [
    route("login", "./auth/login.tsx"),
    route("register", "./auth/register.tsx"),
  ]),

  ...prefix("concerts", [
    index("./concerts/home.tsx"),
    route(":city", "./concerts/city.tsx"),
    route("trending", "./concerts/trending.tsx"),
  ]),
] satisfies RouteConfig;
```

----------------------------------------

TITLE: Implement Nested Routes in React Router
DESCRIPTION: Illustrates how to define nested routes, where child routes inherit the parent's path, creating hierarchical URLs like `/dashboard` and `/dashboard/settings` for organized navigation.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/declarative/routing.md#_snippet_2

LANGUAGE: tsx
CODE:
```
<Routes>
  <Route path="dashboard" element={<Dashboard />}>
    <Route index element={<Home />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>
```

----------------------------------------

TITLE: Render Nested Routes using React Router Outlet
DESCRIPTION: This example demonstrates the use of the `<Outlet />` component within a parent route module (`dashboard.tsx`). The `Outlet` acts as a placeholder where child routes will be rendered, allowing for shared layouts and dynamic content based on the current nested route.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/framework/routing.md#_snippet_5

LANGUAGE: tsx
CODE:
```
import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* will either be home.tsx or settings.tsx */}
      <Outlet />
    </div>
  );
}
```

----------------------------------------

TITLE: Defining Layout Routes Without Paths (TSX)
DESCRIPTION: This configuration illustrates how to create layout routes by omitting the `path` property on a parent route. This allows the parent component (e.g., `MarketingLayout`, `ProjectLayout`) to serve as a shared layout for its children without adding a URL segment, enabling flexible UI structuring.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/data/routing.md#_snippet_5

LANGUAGE: tsx
CODE:
```
createBrowserRouter([
  {
    // no path on this parent route, just the component
    Component: MarketingLayout,
    children: [
      { index: true, Component: Home },
      { path: "contact", Component: Contact },
    ],
  },

  {
    path: "projects",
    children: [
      { index: true, Component: ProjectsHome },
      {
        // again, no path, just a component for the layout
        Component: ProjectLayout,
        children: [
          { path: ":pid", Component: Project },
          { path: ":pid/edit", Component: EditProject },
        ],
      },
    ],
  },
]);
```

----------------------------------------

TITLE: Defining Optional Route Segments in React Router
DESCRIPTION: Route segments can be made optional by appending a question mark (`?`) to their end. This applies to both dynamic and static segments, allowing a single route definition to match multiple URL patterns.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/framework/routing.md#_snippet_10

LANGUAGE: TypeScript
CODE:
```
route(":lang?/categories", "./categories.tsx"),
```

LANGUAGE: TypeScript
CODE:
```
route("users/:userId/edit?", "./user.tsx");
```

----------------------------------------

TITLE: Defining a Route Loader with createBrowserRouter (TSX)
DESCRIPTION: This snippet demonstrates how to define a `loader` function within a route object in React Router. The loader fetches data asynchronously based on URL parameters (`teamId`) before the component renders, and the `useLoaderData` hook then accesses this pre-loaded data within the `Team` component.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/data/routing.md#_snippet_2

LANGUAGE: tsx
CODE:
```
import {
  createBrowserRouter,
  useLoaderData,
} from "react-router";

createBrowserRouter([
  {
    path: "/teams/:teamId",
    loader: async ({ params }) => {
      let team = await fetchTeam(params.teamId);
      return { name: team.name };
    },
    Component: Team,
  },
]);

function Team() {
  let data = useLoaderData();
  return <h1>{data.name}</h1>;
}
```

----------------------------------------

TITLE: Handling Pending Form Submission with useNavigation in React Router
DESCRIPTION: This example shows how to implement a pending state for a standard `Form` submission using the `useNavigation` hook. The button text changes to 'Submitting...' when the `navigation.formAction` matches the form's action, indicating that the form is currently being processed.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/framework/pending-ui.md#_snippet_3

LANGUAGE: tsx
CODE:
```
import { useNavigation, Form } from "react-router";

function NewProjectForm() {
  const navigation = useNavigation();

  return (
    <Form method="post" action="/projects/new">
      <input type="text" name="title" />
      <button type="submit">
        {navigation.formAction === "/projects/new"
          ? "Submitting..."
          : "Submit"}
      </button>
    </Form>
  );
}
```

----------------------------------------

TITLE: Basic Usage of React Router Form Component
DESCRIPTION: This example demonstrates how to use the `<Form>` component from `react-router` to create a simple form. It submits data to an `/events` action using the POST method and includes input fields for 'title' and 'description'.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/api/components/Form.md#_snippet_0

LANGUAGE: tsx
CODE:
```
import { Form } from "react-router";

function NewEvent() {
  return (
    <Form action="/events" method="post">
      <input name="title" type="text" />
      <input name="description" type="text" />
    </Form>
  );
}
```

----------------------------------------

TITLE: Create Basic React Router Signup Form Component
DESCRIPTION: This `Signup` component defines a simple HTML form for user registration. It utilizes `useFetcher` from `react-router` to manage form submission, including input fields for email and password, and a submit button.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/how-to/form-validation.md#_snippet_1

LANGUAGE: tsx
CODE:
```
import type { Route } from "./+types/signup";
import { useFetcher } from "react-router";

export default function Signup(_: Route.ComponentProps) {
  let fetcher = useFetcher();
  return (
    <fetcher.Form method="post">
      <p>
        <input type="email" name="email" />
      </p>

      <p>
        <input type="password" name="password" />
      </p>

      <button type="submit">Sign Up</button>
    </fetcher.Form>
  );
}
```

----------------------------------------

TITLE: Display React Router Form Validation Errors in UI
DESCRIPTION: This updated `Signup` component integrates error display by accessing validation messages from `fetcher.data?.errors`. It conditionally renders these error messages next to their corresponding input fields, providing immediate feedback to the user about validation failures.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/how-to/form-validation.md#_snippet_3

LANGUAGE: tsx
CODE:
```
export default function Signup(_: Route.ComponentProps) {
  let fetcher = useFetcher();
  let errors = fetcher.data?.errors;
  return (
    <fetcher.Form method="post">
      <p>
        <input type="email" name="email" />
        {errors?.email ? <em>{errors.email}</em> : null}
      </p>

      <p>
        <input type="password" name="password" />
        {errors?.password ? (
          <em>{errors.password}</em>
        ) : null}
      </p>

      <button type="submit">Sign Up</button>
    </fetcher.Form>
  );
}
```

----------------------------------------

TITLE: Using and Understanding the useSubmit Hook in React Router
DESCRIPTION: This section provides an example of how to imperatively submit forms using the `useSubmit` hook in React Router, along with its type signature. The hook allows programmatic form submission, decoupling it from direct user interaction.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/api/hooks/useSubmit.md#_snippet_0

LANGUAGE: tsx
CODE:
```
import { useSubmit } from "react-router";

function SomeComponent() {
  const submit = useSubmit();
  return (
    <Form
      onChange={(event) => {
        submit(event.currentTarget);
      }}
    />
  );
}
```

LANGUAGE: tsx
CODE:
```
useSubmit(): SubmitFunction
```

----------------------------------------

TITLE: Implementing Optimistic UI with useFetcher in React Router
DESCRIPTION: This snippet demonstrates how to create an optimistic UI update for a task's completion status. By checking `fetcher.formData`, the UI can immediately reflect the expected new state (e.g., 'complete' or 'incomplete') even before the server response is received, providing instant user feedback.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/framework/pending-ui.md#_snippet_4

LANGUAGE: tsx
CODE:
```
function Task({ task }) {
  const fetcher = useFetcher();

  let isComplete = task.status === "complete";
  if (fetcher.formData) {
    isComplete =
      fetcher.formData.get("status") === "complete";
  }

  return (
    <div>
      <div>{task.title}</div>
      <fetcher.Form method="post">
        <button
          name="status"
          value={isComplete ? "incomplete" : "complete"}
        >
          {isComplete ? "Mark Incomplete" : "Mark Complete"}
        </button>
      </fetcher.Form>
    </div>
  );
}
```

----------------------------------------

TITLE: Handle Missing Resource with 404 Status in Remix Loader
DESCRIPTION: This `loader` function retrieves a project by ID. If the project is not found, it throws a `data` response with a 404 Not Found status, which is typically caught by an `ErrorBoundary` to render a custom error page.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/how-to/status.md#_snippet_1

LANGUAGE: tsx
CODE:
```
// route('/projects/:projectId', './project.tsx')
import type { Route } from "./+types/project";
import { data } from "react-router";
import { fakeDb } from "../db";

export async function loader({ params }: Route.ActionArgs) {
  let project = await fakeDb.getProject(params.id);
  if (!project) {
    // throw to ErrorBoundary
    throw data(null, { status: 404 });
  }
  return project;
}
```

----------------------------------------

TITLE: Programmatically Navigate with React Router useNavigate Hook
DESCRIPTION: Shows how to use the `useNavigate` hook for programmatic navigation, typically in scenarios where user interaction is not involved. This example demonstrates logging out a user after a period of inactivity.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/framework/navigating.md#_snippet_9

LANGUAGE: tsx
CODE:
```
import { useNavigate } from "react-router";

export function useLogoutAfterInactivity() {
  let navigate = useNavigate();

  useFakeInactivityHook(() => {
    navigate("/logout");
  });
}
```

----------------------------------------

TITLE: Client-Side Data Loading with clientLoader (TSX)
DESCRIPTION: Demonstrates how to use `clientLoader` to fetch data on the client-side. This function is suitable for browser-only data fetching and hydrates the component with the fetched product data. Includes a `HydrateFallback` component for displaying a loading state while the client loader runs.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/start/framework/data-loading.md#_snippet_0

LANGUAGE: tsx
CODE:
```
// route("products/:pid", "./product.tsx");
import type { Route } from "./+types/product";

export async function clientLoader({
  params,
}: Route.ClientLoaderArgs) {
  const res = await fetch(`/api/products/${params.pid}`);
  const product = await res.json();
  return product;
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Product({
  loaderData,
}: Route.ComponentProps) {
  const { name, description } = loaderData;
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}
```

----------------------------------------

TITLE: Link Prop: to - Define Target Location
DESCRIPTION: Specifies the target location for the link, which can be a string path or a partial Path object containing pathname, search, and hash properties.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/api/components/Link.md#_snippet_8

LANGUAGE: APIDOC
CODE:
```
Link Prop: to
  Type: string | Partial<Path>
  Description: Can be a string or a partial Path object.
  Examples:
    <Link to="/some/path" />

    <Link
      to={{
        pathname: "/some/path",
        search: "?query=string",
        hash: "#hash",
      }}
    />
```

----------------------------------------

TITLE: PrefetchPageLinks Component Basic Usage
DESCRIPTION: Illustrates how to import the `PrefetchPageLinks` component from `react-router` and use it to prefetch a specific page by providing its absolute path. This example shows the minimal setup for preloading page resources.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/api/components/PrefetchPageLinks.md#_snippet_0

LANGUAGE: tsx
CODE:
```
import { PrefetchPageLinks } from "react-router";

<PrefetchPageLinks page="/absolute/path" />;
```

----------------------------------------

TITLE: Control View Transitions with Render Props in React Router
DESCRIPTION: Illustrates advanced control over view transitions using render props on `NavLink`. The `isTransitioning` prop allows dynamically applying `view-transition-name` styles only when a transition is active, providing more precise animation control.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/how-to/view-transitions.md#_snippet_6

LANGUAGE: tsx
CODE:
```
<NavLink to={`/image/${idx}`} viewTransition>
  {({ isTransitioning }) => (
    <>
      <p
        style={{
          viewTransitionName: isTransitioning
            ? "image-title"
            : "none",
        }}
      >
        Image Number {idx}
      </p>
      <img
        src={src}
        style={{
          viewTransitionName: isTransitioning
            ? "image-expand"
            : "none",
        }}
      />
    </>
  )}
</NavLink>
```

----------------------------------------

TITLE: Link Prop: prefetch - Control Data and Module Prefetching
DESCRIPTION: Manages the prefetching of data and modules for the link using HTML <link rel="prefetch"> tags. Options include 'none' (default), 'intent' (on hover/focus), 'render', and 'viewport'.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/api/components/Link.md#_snippet_2

LANGUAGE: APIDOC
CODE:
```
Link Prop: prefetch
  Type: "none" | "intent" | "render" | "viewport"
  Default: "none"
  Description: Defines the data and module prefetching behavior for the link.
  Values:
    - none: No prefetching.
    - intent: Prefetches when the user hovers or focuses the link.
    - render: Prefetches when the link renders.
    - viewport: Prefetches when the link is in the viewport, useful for mobile.
  Example:
    <Link prefetch="intent" />
  Note: Prefetching is done with HTML <link rel="prefetch"> tags. If using CSS selectors like `nav :last-child`, consider `nav :last-of-type` to avoid conditional styling issues.
```

----------------------------------------

TITLE: Await resolve Prop Usage with LoaderFunction
DESCRIPTION: Explains how the `resolve` prop of `<Await>` takes a promise returned from a `LoaderFunction`. It shows a complete example of a loader returning a promise and how it's passed to `<Await>`.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/api/components/Await.md#_snippet_5

LANGUAGE: jsx
CODE:
```
import { useLoaderData, Await } from "react-router";

export async function loader() {
  let reviews = getReviews(); // not awaited
  let book = await getBook();
  return {
    book,
    reviews, // this is a promise
  };
}

export default function Book() {
  const {
    book,
    reviews, // this is the same promise
  } = useLoaderData();

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <React.Suspense fallback={<ReviewsSkeleton />}>
        <Await
          // and is the promise we pass to Await
          resolve={reviews}
        >
          <Reviews />
        </Await>
      </React.Suspense>
    </div>
  );
}
```

----------------------------------------

TITLE: Basic Await Component Usage with Loader
DESCRIPTION: Demonstrates how to use the `<Await>` component with `useLoaderData` in a React Router application. It shows a `loader` function returning both an awaited and a non-awaited promise, and how `<Await>` renders the non-awaited promise within a `React.Suspense` boundary.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/api/components/Await.md#_snippet_0

LANGUAGE: tsx
CODE:
```
import { Await, useLoaderData } from "react-router";

export async function loader() {
  // not awaited
  const reviews = getReviews();
  // awaited (blocks the transition)
  const book = await fetch("/api/book").then((res) =>
    res.json()
  );
  return { book, reviews };
}

function Book() {
  const { book, reviews } = useLoaderData();
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <React.Suspense fallback={<ReviewsSkeleton />}>
        <Await
          resolve={reviews}
          errorElement={
            <div>Could not load reviews 😬</div>
          }
          children={(resolvedReviews) => (
            <Reviews items={resolvedReviews} />
          )}
        />
      </React.Suspense>
    </div>
  );
}
```

----------------------------------------

TITLE: Blocking Navigation with useBlocker in React Router
DESCRIPTION: This code integrates the `useBlocker` hook from `react-router` into the `Contact` component. It conditionally blocks navigation based on the `isDirty` state of the form, using `useCallback` to memoize the blocking condition.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/how-to/navigation-blocking.md#_snippet_3

LANGUAGE: TSX
CODE:
```
import { useBlocker } from "react-router";

export default function Contact() {
  let [isDirty, setIsDirty] = useState(false);
  let fetcher = useFetcher();
  let blocker = useBlocker(
    useCallback(() => isDirty, [isDirty])
  );

  // ... existing code
}
```

----------------------------------------

TITLE: Navigate Back or Forward in History
DESCRIPTION: Shows how to navigate relative to the current position in the history stack using positive or negative numbers. `navigate(-1)` goes back, often used for closing modals. `navigate(1)` goes forward, useful in multi-step wizards. Caution is advised as history entries may not always exist as expected.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/api/hooks/useNavigate.md#_snippet_4

LANGUAGE: tsx
CODE:
```
// back
// often used to close modals
navigate(-1);

// forward
// often used in a multi-step wizard workflows
navigate(1);
```

----------------------------------------

TITLE: Using useFormAction Hook in React Router
DESCRIPTION: Demonstrates how to import and use the `useFormAction` hook to resolve URLs relative to the closest route in a React Router application. It shows both basic usage to get the closest route URL and appending a specific action string.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/api/hooks/useFormAction.md#_snippet_0

LANGUAGE: tsx
CODE:
```
import { useFormAction } from "react-router";

function SomeComponent() {
  // closest route URL
  let action = useFormAction();

  // closest route URL + "destroy"
  let destroyAction = useFormAction("destroy");
}
```

----------------------------------------

TITLE: Replace Current History Entry
DESCRIPTION: Demonstrates how to replace the current entry in the browser's history stack with a new one using the `replace: true` option, similar to a server-side redirect.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/api/hooks/useNavigate.md#_snippet_5

LANGUAGE: tsx
CODE:
```
navigate("/some/route", { replace: true });
```

----------------------------------------

TITLE: Passing Context to Child Routes with Outlet
DESCRIPTION: Illustrates how to provide a context value from a parent route to its child routes using the `context` prop of the `Outlet` component. This context can then be consumed by child components via the `useOutletContext` hook.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/api/components/Outlet.md#_snippet_1

LANGUAGE: tsx
CODE:
```
<Outlet context={myContextValue} />
```

----------------------------------------

TITLE: Create Image Detail Route with View Transitions in React Router
DESCRIPTION: Defines the React Router route for the image detail view. It displays a single image and includes a 'Back' link that also uses `viewTransition` to enable smooth navigation back to the gallery. The elements in this view will match the `view-transition-name` properties from the list view.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/how-to/view-transitions.md#_snippet_4

LANGUAGE: tsx
CODE:
```
import { Link } from "react-router";
import { images } from "./home";
import type { Route } from "./+types/image-details";

export default function ImageDetailsRoute({
  params,
}: Route.ComponentProps) {
  return (
    <div className="image-detail">
      <Link to="/" viewTransition>
        Back
      </Link>
      <h1>Image Number {params.id}</h1>
      <img src={images[Number(params.id)]} />
    </div>
  );
}
```

----------------------------------------

TITLE: Implement React Router Server Action for Form Validation
DESCRIPTION: This `action` function, intended to run on the server, processes form submissions. It extracts email and password from the request, performs rudimentary validation checks, and returns validation errors with a 400 status code using `data()` or redirects to the dashboard on successful validation using `redirect()`.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/how-to/form-validation.md#_snippet_2

LANGUAGE: tsx
CODE:
```
import type { Route } from "./+types/signup";
import { redirect, useFetcher, data } from "react-router";

export default function Signup(_: Route.ComponentProps) {
  // omitted for brevity
}

export async function action({
  request,
}: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const errors = {};

  if (!email.includes("@")) {
    errors.email = "Invalid email address";
  }

  if (password.length < 12) {
    errors.password =
      "Password should be at least 12 characters";
  }

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  // Redirect to dashboard if validation is successful
  return redirect("/dashboard");
}
```

----------------------------------------

TITLE: Link Prop: replace - Replace History Stack Entry
DESCRIPTION: Modifies the browser's history stack by replacing the current entry with the new location instead of pushing a new one, preventing additional entries in the history.
SOURCE: https://github.com/remix-run/react-router/blob/main/docs/api/components/Link.md#_snippet_6

LANGUAGE: APIDOC
CODE:
```
Link Prop: replace
  Type: boolean
  Description: Replaces the current entry in the history stack instead of pushing a new one onto it.
  History Stack Behavior:
    # with a history stack like this
    A -> B

    # normal link click pushes a new entry
    A -> B -> C

    # but with `replace`, B is replaced by C
    A -> C
  Example:
    <Link replace />
```