# GitHub Lookup

A Next.js application designed to explore GitHub user profiles. This tool allows you to search for a GitHub user and visualize their profile information, repositories, and contribution statistics.

## Features

- **User Search**: Easily search for any GitHub user by their username.
- **Detailed Profile View**: Access comprehensive user information, including bio, followers, following, and public repositories.
- **Repository Insights**: Browse through a user's repositories with options to filter by topics and languages.
- **Sorting Options**: Sort repositories by recently updated, size, forks, and stars to find what matters most.
- **Visualizations**: View language usage statistics and topic distribution for a user's repositories.
- **Responsive Design**: Fully responsive interface built with Tailwind CSS and Sass, providing a seamless experience across devices.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Sass](https://sass-lang.com/)
- **API Integration**: [Octokit](https://github.com/octokit/core.js) (GitHub REST API)
- **Data Visualization**: [gh-polyglot](https://github.com/IonicaBizau/gh-polyglot) & [node-polyglot](https://github.com/airbnb/polyglot.js)
- **Animations**: [animejs](https://animejs.com/)

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/t0dida00/github-lookup.git
   cd github-lookup
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up Environment Variables:**

   Create a `.env.local` file in the root directory and add your GitHub Personal Access Token to avoid API rate limits:

   ```env
   NEXT_PUBLIC_OCTOKIT=your_github_personal_access_token
   ```

   > **Note:** You can generate a Personal Access Token in your GitHub Developer Settings.

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Project Structure

- `src/app`: Main application directory (Next.js App Router).
  - `page.js`: Landing page with search functionality.
  - `user/[slug]/page.js`: Dynamic user profile page.
  - `components/`: Reusable React components (Search, UserInfo, RepoList, etc.).
- `public`: Static assets.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

[MIT](LICENSE)
