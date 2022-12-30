import { FC, FormEvent, MutableRefObject, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

interface EmailDetails {
  nom: string;
  numTel: string;
  email: string;
  sujet: string;
  message: string;
}

export const Contact: FC = () => {
  const form = useRef<HTMLFormElement>() as MutableRefObject<HTMLFormElement>;
  const [emailDetails, setEmailDetails] = useState<EmailDetails>({
    nom: '',
    numTel: '',
    email: '',
    sujet: '',
    message: '',
  });
  const [isMessageSent, setIsMessageSent] = useState(false);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs.sendForm(
      'service_1y2ptv9',
      'template_zra5k9q',
      form.current,
      'arBUKtdaXbgkzqZx8'
    );

    setEmailDetails({
      nom: '',
      numTel: '',
      email: '',
      sujet: '',
      message: '',
    });
    setIsMessageSent(true);

    setTimeout(() => {
      setIsMessageSent(false);
    }, 5000);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[700px] h-auto shadow-xl shadow-gray-200/20 rounded-xl lg:p-4">
        <h1 className="text-center text-4xl italic bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          Contactez Nous
        </h1>

        <div className="p-4">
          <form ref={form} onSubmit={sendEmail}>
            <div className="grid md:grid-cols-2 gap-4 w-full py-2">
              <div className="flex flex-col">
                <label className="upper text-sm py-2">Nom</label>
                <input
                  type="text"
                  name="from_name"
                  className="border-2 rounded-lg p-3 flex border-gray-300 text-[#4b2354] contact-input"
                  value={emailDetails.nom}
                  onChange={(e) =>
                    setEmailDetails({ ...emailDetails, nom: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="upper text-sm py-2 ">Num Tel</label>
                <input
                  name="phone_number"
                  type="text"
                  className="border-2 rounded-lg p-3 flex border-gray-300 text-[#4b2354]"
                  value={emailDetails.numTel}
                  onChange={(e) =>
                    setEmailDetails({ ...emailDetails, numTel: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-col py-2">
              <label className="upper text-sm py-2">Email</label>
              <input
                type="email"
                name="user_email"
                className="border-2 rounded-lg p-3 flex border-gray-300 text-[#4b2354]"
                value={emailDetails.email}
                onChange={(e) =>
                  setEmailDetails({ ...emailDetails, email: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col py-2">
              <label className="upper text-sm py-2">Sujet</label>
              <input
                name="subject"
                type="text"
                className="border-2 rounded-lg p-3 flex border-gray-300 text-[#4b2354]"
                value={emailDetails.sujet}
                onChange={(e) =>
                  setEmailDetails({ ...emailDetails, sujet: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col py-2">
              <label className="upper text-sm py-2">Message</label>
              <textarea
                name="message"
                rows={10}
                className="border-2 rounded-lg p-3 flex border-gray-300 resize-none text-[#4b2354]"
                value={emailDetails.message}
                onChange={(e) =>
                  setEmailDetails({ ...emailDetails, message: e.target.value })
                }
                required
              />
            </div>

            <button
              disabled={isMessageSent}
              type="submit"
              className="w-full p-4 mt-2 -mb-1 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm transition duration-300"
            >
              Envoyer Message
            </button>

            {isMessageSent && (
              <p className="italic text-green-500 text-2xl mt-5">
                Votre message a ete envoye...
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
