import React from "react"
import { useSelector } from "react-redux";
import Container from "../components/Container";
import Sidebar from "../components/Sidebar";
import SurveyMinature from "../components/SurveyMinature";

const Surveys: React.FC = () => {

  const user = useSelector((state: any) => state.user);
  console.log(user);
  

  return (
    <Container className="bg-body-text w-screen h-screen">
      <Sidebar>

      </Sidebar>
      
      <div className="h-[90%] w-[90%] m-10 py-6 px-12 shadow-lg border-0 border-[#bbbbbb] bg-white rounded-2xl">
        <div className="mb-6">
          <div className="text-4xl font-bold mb-2">
            My Surveys
          </div>
          <div className="text-xl font-normal">
            Lorem ipsum dolr sit maet
          </div>
        </div>
        <div className="flex content-evenly">
            <SurveyMinature title="Test survey">

            </SurveyMinature>
        </div>
      </div>

    </Container>
  );
}

export default Surveys;