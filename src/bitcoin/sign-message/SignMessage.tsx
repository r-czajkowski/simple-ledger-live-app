import Form, { FormValues } from "@/bitcoin/sign-message/Form";
import { useSignMessage } from "@ledgerhq/wallet-api-client-react";

type Props = {
  addressId?: string;
};

function SignMessage({ addressId }: Props) {
  const {
    signMessage,
    signature,
    pending: isSigningMessage,
  } = useSignMessage();

  const onSubmit = async (values: FormValues) => {
    const { message } = values;

    if (!addressId) return;

    await signMessage(addressId, Buffer.from(message, "utf-8"));
  };

  return (
    <>
    <Form onSubmit={onSubmit} />
      <button
        style={{ marginTop: "1rem" }}
        type="submit"
        form="sign-bitcoin-message"
        disabled={!addressId}
      >
        Sign message
      </button>
      {isSigningMessage ? (
        <p>Signing message...</p>
      ) : signature ? (
        <p>Signed message: {signature.toString()}</p>
      ) : null}
    </>
  );
}

export default SignMessage;
