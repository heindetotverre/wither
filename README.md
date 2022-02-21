# Wither

A basic page server and content builder built in Nuxt3

prereqisities

- Needs the following repo running: https://github.com/heindetotverre/gqlserver

## Setup

npm install

## Development and usage

make sure you have the graphql server from the aformentioned repo running at http://localhost:4000/gql and the mongodb instance on sai server at mongodb://127.0.0.1:27017/db (this is the standard mongod location). See the README of https://github.com/heindetotverre/gqlserver

npm run dev

create a user

create pages

enjoy your website

## Details

This is a sort of CMS/Website builder

It has the capability of creating pages and reading the components added to those pages with their content and serve pages built on those components.

SEO friendly through SSR

Once Nuxt3 supports generating static pages the project will be updated for even more SEO friendliness

## Roadmap

- DONE: User creation and token hydration
- DONE: Page creation and deletion
- DONE: GraphQL implementation
- DONE: Form from state management implementation
- DONE: Multi part forms
- DONE: Component and component content generation
- Rich component field implementation
- Styling implementation
- Unit tests
- Image gallery and image uploading
- Uploading custom HTML/Styling
