import { useEffect, useState } from "react";
import styled from "styled-components";
import BucketListInput from "./BucketListInput";
import Modal from "./Modal";

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  display: grid;
  place-items: center;
`;

export const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: "dialog",
}))`
  border-radius: 10px;
  background-color: #ffffff;
  /* width: 900px;
  height: 430px; */

  border-radius: 5px;
  box-shadow: 1px 2px 5px 1px skyblue;

  > span.close-btn {
    margin-top: 50px;
    cursor: pointer;
  }

  > div.desc {
    margin-top: 10px;
    color: black;
  }
`;

const Section = styled.div`
  border: 1px solid black;
  margin: 5px;
  padding: 5px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Li = styled.li`
  border: 1px solid black;
  margin: 5px;
  padding: 5px;
  width: 300px;
  /* display: flex; */
`;

const City = styled.div``;
const Doing = styled.div``;
const Photo = styled.img`
  // border: 1px solid black;
  width: 100%;
  height: 200px;
`;

const BucketListMain = () => {
  const [data, setData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/data/")
      .then((response) => response.json())
      .then((item) => setData(item))
      .catch((err) => {
        alert(err);
      });
  }, ["http://localhost:3001/data/"]);

  const deleteHandler = (dataId) => {
    fetch(`http://localhost:3001/data/${dataId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const openToggleHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const updateHandler = async (dataId) => {
    setModalData(data.filter((el) => el.id === dataId.id)[0]);
  };

  return (
    <Section>
      {Array.isArray(data)
        ? data.map((item) => {
            return (
              <Li key={item.id}>
                <City>{item.city}</City>
                <Doing>{item.doing}</Doing>
                <Photo className='photo' src={item.photo} alt='' />
                <button
                  onClick={() => {
                    updateHandler(item);
                    openToggleHandler();
                  }}
                >
                  revise
                </button>
                <button onClick={() => deleteHandler(item.id)}>delete</button>
                {isOpen === true ? (
                  <ModalBackdrop onClick={openToggleHandler}>
                    <ModalView onClick={(e) => e.stopPropagation()}>
                      <span onClick={openToggleHandler} className='close-btn'>
                        &times;
                      </span>
                      <div className='desc'>
                        <Modal
                          data={modalData}
                          setData={setData}
                          openToggleHandler={openToggleHandler}
                        />
                      </div>
                    </ModalView>
                  </ModalBackdrop>
                ) : null}
              </Li>
            );
          })
        : null}
    </Section>
  );
};
export default BucketListMain;
