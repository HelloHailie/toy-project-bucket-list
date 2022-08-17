import Header from "./components/Header";
import BucketListInput from "./components/BucketListInput";
import BucketListMain from "./components/BucketListMain";

import styled from "styled-components";

const Main = styled.div`
  margin: 2rem 20rem;
  padding: 10px;
`;

function App() {
  return (
    <Main>
      <Header></Header>
      <BucketListInput></BucketListInput>
      <BucketListMain></BucketListMain>
    </Main>
  );
}

export default App;
