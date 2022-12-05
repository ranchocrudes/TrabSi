import React, { useState } from "react";
import { dataAux } from "../mockData";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineSend } from "react-icons/ai";
import api from "../config/configApi";
function App() {
  const [image, setImage] = useState<any>();
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });
  const [data, setData] = useState([]);
  const [passaImagem, setPassaImagem] = useState<any>();

  const uploadImage = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await api
      .post("/upload-image", formData, headers)
      .then((response: any) => {
        setStatus({
          type: "success",
          mensagem: response.data.mensagem,
        });
      })
      .catch((err: any) => {
        if (err.response) {
          setStatus({
            type: "error",
            mensagem: err.response.data.mensagem,
          });
        } else {
          setStatus({
            type: "error",
            mensagem: "Erro: Tente mais tarde!",
          });
        }
      });
  };

  const slideLeft = () => {
    let slider: any = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 128;
  };

  const slideRight = () => {
    let slider: any = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 128;
  };

  return (
    <>
      <div className="relative flex items-center w-full  justify-center mt-10 ">
        <MdChevronLeft
          className="opacity-50 cursor-pointer hover:opacity-100  "
          onClick={slideLeft}
          size={40}
        />
        <div
          id="slider"
          className="tablet:w-[50%] bg-[#81c784] dark:bg-gray-500 cellphone:w-[80%] h-full w-full scroll whitespace-nowrap scroll-cellphoneooth overflow-x-hidden overflow-y-hidden"
        >
          {data.length != 0
            ? data.map((item, i) => (
                <img
                  className="tablet:w-[8rem] tablet:h-[8rem] cellphone:w-[6rem] w-[5rem] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300 rounded-full"
                  src={URL.createObjectURL(item)}
                  alt="/"
                  key={i}
                  onClick={() => setImage(item)}
                />
              ))
            : dataAux.map((e, i) => (
                <div
                  key={i}
                  className="tablet:w-[8rem]  tablet:h-[8rem]  cellphone:w-[5rem] bg-slate-400 border-double border-slate-500 
                border-2 w-[4rem] inline-block m-1 cursor-pointer hover:scale-105 ease-in-out duration-300 rounded-full"
                />
              ))}
        </div>
        <MdChevronRight
          className="opacity-50 cursor-pointer hover:opacity-100 "
          onClick={slideRight}
          size={40}
        />
      </div>
      <div className=" justify-center flex mt-12 w-full h-[30rem] ">
        <div className=" inline-block ">
          <div className="bg-[#66bb6a] dark:bg-gray-600 cellphone:h-[25rem] cellphone:w-[25rem] tablet:w-[30rem] tablet:h-[30rem]  w-[20rem] h-[20rem] flex rounded-t-2xl">
            <form
              onSubmit={uploadImage}
              className={
                "justify-center relative flex w-full h-full items-center"
              }
            >
              {" "}
              <label className="bg-[#2e7d32] dark:bg-gray-800 w-[80%] flex absolute h-[80%] border-dashed border-2 justify-center items-center cursor-pointer">
                {image ? (
                  <>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Imagem"
                      width="150"
                      height="150"
                      className="w-full flex absolute h-full p-2"
                    />
                  </>
                ) : (
                  <h1 className="text-white">Coloque sua imagem aqui</h1>
                )}
                <input
                  className="hidden"
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e: any) => (
                    setImage(e?.target?.files[0]),
                    setPassaImagem(e.target.files[0])
                  )}
                />
              </label>
              <button
                disabled={passaImagem == undefined}
                type="submit"
                className={
                  passaImagem == undefined
                    ? `bg-gray-500 p-1  absolute bottom-1 right-1 sm:rounded-md rounded-full`
                    : `bg-[#1b5e20] hover:bg-[#0a310d] dark:bg-gray-500 p-1 sm:rounded-md rounded-full absolute bottom-1 right-1`
                }
                onClick={() => setData([].concat(data, passaImagem))}
              >
                <h1 className="text-white hidden cellphone:block">
                  Enviar Imagem
                </h1>
                <AiOutlineSend
                  className="opacity-50 cursor-pointer hover:opacity-100 text-white  dark:text-black block cellphone:hidden"
                  onClick={slideLeft}
                  size={20}
                />
              </button>
            </form>
          </div>
          <div className="bg-[#a5d6a7] dark:bg-gray-400 h-14 w-full pl-4 font-semibold rounded-b-2xl">
            <h1>Descrição: {"Planta podre"}</h1>
            <h1>Qualidade: {"100%"}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
