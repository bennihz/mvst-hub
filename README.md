# MVST Hub - github repo searcher

MVST Hub is a React TypeScript application developed within a week to address a coding challenge. Here's an overview of the project and its key features:

## Rapid Development Highlights

- **Deployment Efficiency:** Explore the live application on [Render](https://mvst-hub.onrender.com/).

- **GitHub API Integration:** Utilized the GitHub v4 API with a proxy at [mvst-hub-proxy.onrender.com](https://mvst-hub-proxy.onrender.com/) to safeguard the personal access token in the frontend.

- **Client-Side Pagination Strategy:** Overcame limitations in GitHub's v4 GraphQL API by implementing client-side pagination. Repositories are asynchronously fetched, enabling an early display of initial results.

- **Tailwind CSS Styling:** The project embraces Tailwind CSS for styling, with select components adapted from Wind-UI, a Tailwind component library.

- **User Information Display:** Beyond repositories, MVST Hub showcases user information for a comprehensive user experience.

- **Theme Preferences:** Users have the flexibility to choose between light and dark themes. A manual switch in the navbar allows for real-time theme changes.

- **Storybook Component Exploration:** Developers can leverage Storybook to view components independently. Execute `npm run storybook` to initiate Storybook while concurrently updating Tailwind CSS.

## Getting Started Locally

1. **Clone & Install:**
    ```bash
    git clone https://github.com/bennihz/mvst-hub.git
    cd mvst-hub
    npm install
    ```

2. **Run the Application:**
    ```bash
    npm start
    ```

3. **Local Exploration:**
    Open [http://localhost:3000](http://localhost:3000) in your browser to explore the application locally.

## Future Development Opportunities

While the initial version was developed swiftly, there are areas for future improvement:

- **Test Implementation:** Enhance the project's reliability by adding a comprehensive test suite.

- **Code Refactoring:** Consider refining the code structure by implementing low coupling and high cohesion. This could involve separating and creating hooks from the `App.tsx` file.

- **Detailed Repository View:** Explore the possibility of implementing a detailed view for repositories, offering users more in-depth information upon clicking a repository in the list.
