# Next-Blog-App
Simple Blog Application where user can create, update, and delete blogs. The application also supports switching between light and dark modes.
# Technologies/Libraries Used
      1. NextJS
      2. TypeScript
      3. Apollo Client for graphQL
      4. Contentful for content management (Contentful Management API and Contentful GraphQL API)
      5. react-quill to display and render rich text
      6. react-toastify to display toasts
      7. react-spinners for loading spinners
      8. material-ui for modals, light and dark themes
# How to run
1. This application is build upon node version 17.9.1, make sure to use this version, otherwise it might cause backward compatibility issues
2. Run npm i
3. Create a Content Model named blog on Contenful with the following fields:
      Title -> Short Text
      Author -> Short Text
      Description -> Long Text
4. Create an .env.local file to save the Contentful tokens and IDs in the format:
      NEXT_PUBLIC_CMA_TOKEN = <your contentful management API personal access token>
      NEXT_PUBLIC_SPACE_TOKEN = <your space ID>
      NEXT_PUBLIC_ENV_ID = <your environment ID e.g. master>
      NEXT_PUBLIC_CONTENT_TYPE = <the name of content model e.g.blog>
      NEXT_PUBLIC_GQL_API_TOKEN = <your Contentful GQL API Token, note that it is different from the above CMA personal access token>
      NEXT_PUBLIC_GQL_URI = "https://graphql.contentful.com/content/v1/spaces/<your space id>"
4. Then run npm run dev, and then Voila :)

# Note
eslint might raise some errors based on the TypeScript version, but it will block the running of app
