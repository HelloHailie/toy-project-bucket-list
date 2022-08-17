import { useState } from "react";
import Resizer from "react-image-file-resizer";

import styled from "styled-components";

const Section = styled.div`
  border: 1px solid black;
  margin: 5px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
`;

const BucketListInput = () => {
  const [city, setCity] = useState("");
  const [doing, setDoing] = useState("");
  const [photo, setPhoto] = useState("");

  const cityHandler = (e) => {
    setCity(e.target.value);
  };

  const doingHandler = (e) => {
    setDoing(e.target.value);
  };

  const photoHandler = (event) => {
    let fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          150,
          150,
          "png",
          90,
          0,
          (uri) => {
            setPhoto(uri);
            alert("서버에 등록이 완료되었습니다. ");
          },
          "base64",
          180,
          180
        );
      } catch (err) {
        alert(err);
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const bucketlist = { city, doing, photo };

    fetch("http://localhost:3001/data/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bucketlist),
    });
  };

  return (
    <Section>
      <form onSubmit={submitHandler}>
        <label htmlFor='city'>CITY</label>
        <input type='text' placeholder='Enter a city' onChange={cityHandler} />
        <label htmlFor='doing'>WHAT YOU WANT TO DO</label>
        <input
          type='text'
          placeholder='Enter what you want to do'
          onChange={doingHandler}
        />
        <label htmlFor='photo'>Picture</label>
        <input
          type='file'
          placeholder='Enter what you want to do'
          onChange={photoHandler}
        />
        <button>+</button>
      </form>
    </Section>
  );
};
export default BucketListInput;
