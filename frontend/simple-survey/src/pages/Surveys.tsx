import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Sidebar from "../components/Sidebar";
import SurveyMinature from "../components/SurveyMinature";
import { getUserSurveys } from "../services/BackendService";
import { ReduxState } from "../types/Types";

interface Survey {
  active: boolean;
  closeDate: Date;
  title: string;
  description: string;
  id: number;
  ownerId: number;
}

const Surveys: React.FC = () => {
  const [userSurveys, setUserSurveys] = useState<Survey[]>([]);
  const navigate = useNavigate();
  const user = useSelector((state: ReduxState) => state.user);

  useEffect(() => {
    getUserSurveys(user.id, user.jwt)
      .then(res => {
        console.log(res.data.surveys);
        
        setUserSurveys([...res.data.surveys]);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Container className="bg-body-text w-screen h-screen">
      <Sidebar />
      
      <div className="h-[90%] w-[90%] m-10 py-6 px-12 shadow-lg border-0 border-[#bbbbbb] bg-white rounded-2xl">
        <div className="mb-6">
          <div className="text-4xl font-bold mb-2">
            My Surveys
          </div>
          <div className="text-xl font-normal">
            Lorem ipsum dolr sit maet
          </div>
        </div>
        <div className="flex gap-x-4">
          {userSurveys.map(survey => 
            // TODO: proper navigate
            <SurveyMinature title={survey.title} description={survey.description} closeDate={survey.closeDate} onClick={() => navigate("/surveys")}/>  
          )}
        </div>
      </div>

    </Container>
  );
}

export default Surveys;