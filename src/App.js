import "./App.css";
import { ChatProvider } from "./Api/ChatContext";
import { SnackbarProvider } from "notistack";
import Home from "./Homepage/Homepage";

function App() {
  return (
    <div className="App">
      <ChatProvider>
        <SnackbarProvider
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <Home />
        </SnackbarProvider>
      </ChatProvider>
    </div>
  );
}

export default App;