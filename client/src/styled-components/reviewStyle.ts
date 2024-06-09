import styled from "styled-components";

export const Container = styled.div`
  color: black;
`;

export const Title = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  font-family: "Noto Serif KR", serif;
  font-optical-sizing: auto;
  font-style: normal;
`;

export const ReviewContainer = styled.div`
  border: solid 1px #ddd;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
  height: auto;
  display: flex;
  flex-direction: column;
`;

export const ReviewTitle = styled.div`
  font-size: 15px;
  font-family: "Noto Serif KR", serif;
  font-optical-sizing: auto;
  font-style: normal;
`;

export const StarInput = styled.input`
  display: none;
`;

export const ReviewBox = styled.input`
  width: 400px;
  height: 50px;
  border-radius: 5px;
  @media screen and (max-width: 500px) {
    width: 200px;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 15px;
  font-weight: bold;
`;

export const Rating = styled.div`
    position: absolute;
    font-size: 18px;
    top: 0px;
    right: 0px;
    background-color: rgba(0,0,0,1);
    border-radius: 10px;
    padding: 3px;
    color: white;
    @media screen and (max-width: 700px){
        font-size: 15px;
    }
`;

export const Comment = styled.div`
  margin: 10px 0;
  font-size: 16px;
  color: #555;
  line-height: 120%;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eee;
  margin: 10px 0;
`;

export const InteractionContainer = styled.div`
  display: flex;
  align-items: center;
  color: #aaa;
`;

export const InteractionItem = styled.button`
  display: flex;
  align-items: center;
  margin-right: 15px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  background: none;
  &:hover {
    color: #666;
  }

  svg {
    margin-right: 5px;
  }
`;