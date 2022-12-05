/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

interface IProps {
  code: string;
  onClick?: () => void;
}

const QrCode: React.FC<IProps> = ({ code, ...props }: IProps) => {
  const [srcQr, setSrcQr] = useState("");
  const [modal, setModal] = useState(false);

  const qrCode = async () => {
    const qrUrl = await QRCode.toDataURL(
      `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/qr/contact/${code}`
    );
    setSrcQr(qrUrl);
  };

  useEffect(() => {
    qrCode();
  }, [code]);

  return (
    <div>
      {modal ? (
        <div
          onClick={() => setModal(false)}
          className="fixed bg-gray-900 bg-opacity-60 top-0 right-0 w-screen h-screen flex object-cover items-center justify-center z-20 cursor-pointer"
        >
          <img
            onClick={(e) => e.stopPropagation()}
            className="border border-black w-96 rounded-md cursor-default"
            src={srcQr}
            alt="qr code"
          />
        </div>
      ) : null}
      <div>
        <img
          className="border border-black w-10 rounded-md cursor-pointer"
          src={srcQr}
          alt="qr code"
          onClick={() => setModal(true)}
        />
      </div>
    </div>
  );
};

export default QrCode;
