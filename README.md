# Blog Application with Next.js, React Query, and Firebase

This is a simple blog application built with Next.js, React Query, Firebase and Mantine. It provides CRUD (Create, Read, Update, Delete) functionality for blog posts, allowing users to create, view, edit, and delete posts.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

## Features

- Create new blog posts with a title and content.
- View a list of all blog posts with pagination.
- View the full content of a single blog post.
- Edit existing blog posts.
- Delete blog posts.
- Search for posts by title.

## Demo

You can access a live demo of the application [here](#).

## Technologies Used

- **Next.js**: A React framework for building server-rendered React applications.
- **React Query**: A library for managing and caching data fetching in React.
- **Firebase**: A cloud-based platform for building web and mobile applications, including Firestore for data storage.
- **[Mantine]**: A fully featured react component library.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Degoke/next-blg.git
```

2. Install dependencies:

```bash
cd your-blog-app
npm install
```

3. Set up Firebase:

Create a Firebase project and configure Firebase Firestore.
Add your Firebase configuration details to services/firebase.js.

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and access the application at [http://localhost:3000].

### Usage

- **Creating a Blog Post:** Visit the "New Post" page and fill out the form to create a new blog post.

- **Viewing Blog Posts:** Navigate to the "All Posts" page to see a list of all blog posts with pagination. Click on a post to view its full content.

- **Editing Blog Posts:** edit existing blog posts by clicking the "Edit" button on the single post view page.

- **Deleting Blog Posts:** delete a blog post by clicking the "Delete" button on the single post view page.

- **Searching for Posts:** Use the search functionality on the "All Posts" page to search for posts by title.

### Folder Structure

- **pages/:** Containscpages that define routes.

- **components/:** Contains React components used in the application.

- **services/:** Contains services for interacting with external services (e.g., Firebase).

- **library/:** Contains utilities, hoks and types.
