import { Transport, WindowMessageTransport } from "@ledgerhq/wallet-api-client";
import { WalletAPIProvider } from "@ledgerhq/wallet-api-client-react";

function getWalletAPITransport(): Transport {
  if (typeof window === "undefined") {
    return {
      onMessage: undefined,
      send: () => {},
    };
  }

  const transport = new WindowMessageTransport();
  transport.connect();
  return transport;
}

const transport = getWalletAPITransport();

type Props = {
  children: React.ReactElement
};

export default function LedgerWalletAPIProvider({ children }: Props): JSX.Element {
  return (
    <WalletAPIProvider transport={transport}>{children}</WalletAPIProvider>
  );
}
