import "@/App.css";
import { LedgerWalletAPIProvider } from "@/providers";
import Bitcoin from "@/bitcoin";

function App() {

  return (
    <LedgerWalletAPIProvider>
      <>
        <h1>Simple Ledger Live App</h1>
        <div className="card">
          <Bitcoin />
        </div>
      </>
    </LedgerWalletAPIProvider>
  );
}

export default App;
