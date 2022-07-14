import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Index from "./client/pages/index";

import "./client/styles/alpha.css";

// const httpLink = createHttpLink({
//    uri: "http://localhost:5000/graphql"
// });
const client = new ApolloClient({
   uri: "http://localhost:5000/graphql",
   cache: new InMemoryCache()
});

function App() {
   return (
      <ApolloProvider client={client}>
         <Index />
      </ApolloProvider>
   );
}

export default App;
