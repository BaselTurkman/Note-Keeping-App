import Navbar from "./components/Navbar/Navbar";
import { Container, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "./Context/snackbarProvider";
import Notes from "./pages/Notes/Notes";
import { DialogProvider } from "./Context/DialogProvider";
import { SearchProvider } from "./Context/SearchProvider";

function App() {
  return (
    <SnackbarProvider>
      <SearchProvider>
        <DialogProvider>
          <CssBaseline />
          <Navbar />
          <Container>
            <Notes />
          </Container>
        </DialogProvider>
      </SearchProvider>
    </SnackbarProvider>
  );
}

export default App;
