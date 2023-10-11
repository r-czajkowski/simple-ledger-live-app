import SignMessage from "@/bitcoin/sign-message";
import {
  useRequestAccount,
  useWalletAPIClient,
} from "@ledgerhq/wallet-api-client-react";
import { useEffect, useState } from "react";

function Bitcoin() {
  const {
    account,
    requestAccount,
    pending: isRequestingAccount,
  } = useRequestAccount();
  const walletAPI = useWalletAPIClient();
  const [bitcoinPublicKey, setBitcoinPublicKey] = useState("");

  const requestBitcoinAccount = async () => {
    await requestAccount({ currencyIds: ["bitcoin"] });
  };

  useEffect(() => {
    if (!account?.id) return;

    const getXPub = async () => {
      try {
        const xPub = await walletAPI.client?.bitcoin.getXPub(account.id);

        if (!xPub) {
          console.log("Bitcoin Public Key not available.");
          return;
        }
        setBitcoinPublicKey(xPub);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    getXPub();
  }, [account?.id, walletAPI]);

  return (
    <>
      {!account ? (
        <button
          style={{ marginBottom: "1rem" }}
          onClick={requestBitcoinAccount}
        >
          Request Bitcoin Account
        </button>
      ) : (
        <p>
          {isRequestingAccount
            ? "Select Bitcoin Address"
            : `Selected account: ${account.address}`}
        </p>
      )}
      <p>Public key: {bitcoinPublicKey}</p>
      <SignMessage addressId={account?.id} />
    </>
  );
}

export default Bitcoin;
