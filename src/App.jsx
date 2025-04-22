import Navbar from "./components/Navbar/Navbar";
import { Container, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "./Context/snackbarProvider";
import Notes from "./pages/Notes/Notes";
import { DialogProvider } from "./Context/DialogProvider";

function App() {
  return (
    <SnackbarProvider>
      <DialogProvider>
        <Navbar />
        <CssBaseline />
        <Container>
          <Notes />
        </Container>
      </DialogProvider>
    </SnackbarProvider>
  );
}

export default App;
