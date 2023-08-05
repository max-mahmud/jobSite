import { useState, useEffect } from "react";
import axios from "axios";

const AddJobs = () => {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  const imageHandle = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formdata = new FormData();
    formdata.append("image", image);

    try {
      const data = await axios.post("http://localhost:4000/image-send", formdata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
  }, [image]);

  return (
    <div className="p-5 bg-slate-200 min-h-screen">
      <input onChange={imageHandle} type="file" name="" id="" /> <br />
      <button className="bg-slate-500 my-5 px-5 py-2 text-yellow-50" onClick={handleSubmit}>
        Submit
      </button>
      <img className="w-20 h-20 " src={preview ? preview : ""} alt="img" />
    </div>
  );
};

export default AddJobs;
