import nomeDaImagem from "../imagens/leaf.jpg";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";
type props = {
  data: [propsData];
};

interface propsData {
  img: string;
  porcentagem: string;
}

export default function ScrollLateral({ data }: props) {
  const [clicked, setClicked] = useState(0);

  const [max, setMax] = useState(5);
  const [min, setMin] = useState(0);

  return (
    <div className="w-full dark:bg-black justify-center flex">
      <div className="bg-black dark:bg-white w-[30rem] h-[5rem] items-center justify-center flex relative  overflow-auto">
        <AiOutlineArrowLeft
          className={`text-black absolute left-0 ${
            data.length <= 5 ? "hidden" : ""
          }`}
          size={24}
          onClick={() => {
            min > 0 ? (setMax(max - 1), setMin(min - 1)) : "";
          }}
        />
        {data.map((e, i) => (
          <div
            className={`rounded-full ${
              i != clicked ? "bg-blue-200" : "bg-blue-500"
            } h-16 w-16 ml-2 cursor-pointer ${
              i >= min && i < max ? "" : "hidden"
            }`}
            onClick={() => setClicked(i)}
            key={i}
          >
            <img src={e.img} />
          </div>
        ))}

        <AiOutlineArrowRight
          className={`text-black absolute right-0    ${
            data.length <= 5 ? "hidden" : ""
          }`}
          size={24}
          onClick={() => {
            setMax(max + 1), setMin(min + 1);
          }}
        />
      </div>
    </div>
  );
}
