import Navbar from "./components/Navbar/Navbar";
import { Container, CssBaseline } from "@mui/material";
import Notes from "./pages/Notes/Notes";
import Providers from "./Providers";

function App() {
  return (
    <Providers>
      <CssBaseline />
      <Navbar />
      <Container>
        <Notes />
      </Container>
    </Providers>
  );
}

export default App;
