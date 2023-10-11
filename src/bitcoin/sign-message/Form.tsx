import { ChangeEvent, FormEvent, useState } from "react";

export type FormValues = {
  message: string;
};

type Props = {
  onSubmit: (values: FormValues) => void;
  formId?: string
};

function Form({ onSubmit, formId="sign-bitcoin-message"}: Props) {
  const [message, setMessage] = useState("");

  const _onSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ message });
  };
  return (
    <form id={formId} onSubmit={_onSubmit}>
      <input
        value={message}
        name="message"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setMessage(event.target.value)
        }
      />
    </form>
  );
}

export default Form
