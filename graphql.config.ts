export default {
  projects: {
    app: {
      schema: ["./server/graphql/schema.graphql"],
      documents: ["**/*.{graphql,js,ts,jsx,tsx}"],
    }
  }
}