import { useState } from "react";

const ImgUpload = () => {
  const [imageFile, setImageFile] = useState("");
  const handleClick = async () => {
    try {
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_present", "ei18");
      data.append("cloud_name", "aa");
      fetch("https://api.cloudinary.com", { method: "POST", body: data })
        .then((res) => res.json())
        .then((data) => {
          setImageFile(data.url);
          alert("画像アップロード成功");
        });
    } catch (err) {
      alert("画像アップロード失敗");
    }
  };
  return (
    <div className="img-input">
      <input
        type="file"
        onChange={(e: any) => setImageFile(e.target.files[0])}
        accept="image/png, image/jpg"
      />
      <button onClick={handleClick} disabled={!imageFile}>
        画像upload
      </button>
    </div>
  );
};

export default ImgUpload;
