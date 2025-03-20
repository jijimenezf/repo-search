# React + TypeScript + Vite + Shadcn + Tailwind

This project is based on an idea shared here (https://reactpractice.dev/exercise/build-a-github-repositories-search-page-with-sorting-and-pagination/)

If you already check the proposed solution, you realized they are using React Query and other stuff related to in order to achieve the goal.

I worked on a different approach. 
- I decided to work with Shadcn and Tailwind and not include React Query
- The package for making request to GitHub API (I used fetch)
- Instead, I'm taking advantage of shadcn components like input, pagination and dropdowns.

Currently, the most recent version of some shadcn components are Canary so you have to run these commands:

```js
npm install --legacy-peer-deps

npm run dev
```

It is important to notice that solution proposed is based on React Query but my solution is using shadcn components


I added some screenshots of the result

![alt text](https://res.cloudinary.com/dzhfwgpoy/image/upload/v1742487649/v1_jwixoy.png)

![alt text](https://res.cloudinary.com/dzhfwgpoy/image/upload/v1742487649/v2_h1tavx.png)

![alt text](https://res.cloudinary.com/dzhfwgpoy/image/upload/v1742487649/v3_guee75.png)
