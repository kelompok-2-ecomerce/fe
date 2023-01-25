import { Link } from "react-router-dom";

import ButtonRegister from "../components/buttonRegister";
import InputProfil from "../components/inputProfil";
import Layout from "../components/layout";

import pic2 from "../assets/pic-2.webp";
import Navbar from "../components/Navbar";
import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const ProfilUpload = () => {
  const MySwal = withReactContent(Swal);
  const [name, setName] = useState<string>("");
  const [stok, setStok] = useState<number | null>(null);
  const [harga, setHarga] = useState<number | null>(null);
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      name,
      stok,
      harga,
      description,
      image,
    };
    console.log(body);

    axios
      .post("https://projectfebe.online/products", body, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2NzQ2NjIwMjgsInVzZXJJRCI6MjJ9.hZ6Im5HAdNv_Y1g5iS8I2EP-yOpo-IHu9EM7V33uXzQ",
        },
      })
      .then((res) => {
        const { data, message } = res.data;
        console.log(res.data);
        MySwal.fire({
          title: "Succes",
          text: message,
          showCancelButton: false,
        });
      })
      .catch((err) => {
        const { message } = err.response.data;
        MySwal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <Layout>
      <Navbar />
      <div className="flex w-full bg-[#355B3E] mt-7 py-6 px-28 gap-4">
        <img
          className="rounded-full w-24 h-24 border-2 border-zinc-50"
          src="https://placeimg.com/80/80/people"
          alt="propfilLogo.html"
        />
        <p className="inline text-[30px] text-zinc-50 font-bold leading-[96px]">
          Dianna Puspitasari
        </p>
      </div>
      <div className="flex w-full pl-28 mt-10 mb-2">
        <p className="px-5 py-1 text-[18px] text-[#355B3E] font-bold border-b border-[#355B3E]">
          <Link to="/profilUpload"> Upload </Link>
        </p>
        <p className="inline ml-10 px-5 py-1 text-[18px] text-[#355B3E] font-bold">
          <Link to="/profilProduk">Produk</Link>
        </p>
      </div>
      <div className="flex w-full px-10 py-5 mb-16">
        <div className="w-[30%] px-14 pt-6">
          <img
            className="w-[240px] h-[300px] rounded-2xl"
            src={pic2}
            alt="uploadImage"
          />
          <input
            type="file"
            className="file-input w-full max-w-xs mt-5"
            // onChange={handleFileChange}
          />
          {/* <div>{image && `${image.name} - ${image.type}`}</div>
        </div> */}
        </div>

        <div className="w-[70%] px-5">
          <p className="text-[18px] text-zinc-900 font-bold">
            Keterangan Produk :
          </p>
          <form onSubmit={(e) => handleAddProduct(e)}>
            <div className="flex mt-8">
              <p className="w-48 leading-[45px]">
                Nama Produk <span className="ml-14">:</span>
              </p>
              <InputProfil
                className="w-[60%] border border-zinc-700 p-2 rounded-xl"
                id="input_name"
                type="name"
                placeholder="Shoes Max, Naiki"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex mt-5">
              <p className="w-48 leading-[45px]">
                Harga Produk <span className="ml-14">:</span>
              </p>
              <InputProfil
                className="w-[60%] border border-zinc-700 p-2 rounded-xl"
                id="input_name"
                type="number"
                placeholder="Shoes Max, Naiki"
                onChange={(e) => setHarga(parseInt(e.target.value))}
              />
            </div>
            <div className="flex mt-5">
              <p className="w-48 leading-[45px]">
                Stok <span className="ml-14">:</span>
              </p>
              <InputProfil
                className="w-[60%] border border-zinc-700 p-2 rounded-xl"
                id="input_name"
                type="number"
                placeholder="Shoes Max, Naiki"
                onChange={(e) => setStok(parseInt(e.target.value))}
              />
            </div>

            <div className="flex mt-5">
              <p className="w-48 leading-[45px]">
                Deskripsi Produk <span className="ml-9">:</span>
              </p>
              <textarea
                className="textarea w-[60%] textarea-bordered pb-5 border-zinc-700"
                placeholder="Harga murah kualitas tidak murahan ya"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="w-[84%] text-right mt-10">
              <ButtonRegister
                className="w-40 h-12 rounded-xl bg-[#007549] text-[16px] text-zinc-50"
                label="Upload"
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default ProfilUpload;
