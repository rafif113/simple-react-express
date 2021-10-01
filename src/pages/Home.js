import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../constants/API";

function Home() {
  const [formAdd, setFormAdd] = useState({
    title: "",
    description: "",
    nameImg: "",
    previewImg: "",
  });

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setFormAdd({
        ...formAdd,
        nameImg: e.target.files[0].name,
        previewImg: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormAdd({ ...formAdd, [name]: value });
  };

  const submitBtnHandler = (e) => {
    e.preventDefault();
    if (formAdd.previewImg) {
      let formData = new FormData();
      let obj = {
        title: formAdd.title,
        description: formAdd.description,
      };
      formData.append("data", JSON.stringify(obj));
      formData.append("file", formAdd.previewImg);
      console.log(formData.values);
      axios
        .post(`${API_URL}/album/upload`, formData)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          console.log("Gagal");
        });
    }
  };

  const btnCoba = (type) => {
    alert(`Hallo anda menekan tombol ${type}`);
  };

  return (
    <div className="w-full flex flex-row mt-10">
      <div className="w-1/2 flex flex-col items-center border-2 mx-4">
        <h2 className="font-medium text-4xl">Album Example</h2>
        <p className="text-center mt-4 text-gray-500">
          Something short and leading about the collection bellow its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don't simple skip over it entirely
        </p>
        <div className="flex flex-row mt-5">
          <button
            onClick={() => btnCoba("album")}
            className="bg-blue-800 rounded-md px-4 py-2 text-white mx-2"
          >
            Your Album
          </button>
          <button className="bg-gray-500 rounded-md px-4 py-2 text-white mx-2">
            Their Album
          </button>
        </div>
        <img
          src={formAdd.previewImg}
          alt={formAdd.nameImg}
          className="w-full mt-6"
        />
      </div>
      <div className="w-1/2 flex flex-col bg-gray-600 mx-4">
        <form onSubmit={submitBtnHandler} className="flex flex-col">
          <div className="flex flex-col mx-5 mt-5">
            <span className="text-white">Title</span>
            <input
              onChange={inputHandler}
              name="title"
              type="text"
              className="h-9 p-2 mt-2 rounded-md focus:outline-none"
              placeholder="input title here"
            />
          </div>
          <div className="flex flex-col mx-5 mt-5">
            <span className="text-white">Description</span>
            <textarea
              onChange={inputHandler}
              name="description"
              className="p-2 mt-2 rounded-md focus:outline-none"
              placeholder="input title here"
              cols="30"
              rows="4"
            ></textarea>
          </div>
          <div className="flex flex-col mx-5 mt-5">
            <span className="text-white">Image</span>
            <input
              onChange={handleImg}
              type="file"
              accept=".png, .jpg, .jpeg"
              className="h-12 p-2 my-2 rounded-md bg-white focus:outline-none"
              placeholder="input title here"
            />
          </div>
          <button
            type="submit"
            className="my-5 bg-green-600 text-white rounded-md py-2 px-10 mx-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
