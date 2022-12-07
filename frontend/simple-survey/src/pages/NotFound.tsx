import React from "react"
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container className="bg-body-text w-screen h-screen flex flex-col">
      <div className="font-extrabold text-9xl">
        404 :(
      </div>
      <div className="hover:underline cursor-pointer mt-10 text-2xl" onClick={() => navigate("/surveys")}>
        Go back to main page
      </div>
    </Container>
  );
}

export default NotFound;