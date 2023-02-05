import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import ContainerContent from "../components/ContainerContent";
import Loading from "../components/Loading";
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
  hash: string;
}

const Surveys: React.FC = () => {
  const [userSurveys, setUserSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = useSelector((state: ReduxState) => state.user);

  useEffect(() => {
    setLoading(true);
    getUserSurveys(user?.jwt)
      .then(res => {
        setUserSurveys([...res.data.surveys]);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [user]);

  return (
    <Container>
      <ContainerContent>
        <div className="mb-6">
          <div className="text-4xl font-bold mb-2">
            My Surveys
          </div>
          <div className="text-xl font-normal">
            Lorem ipsum dolr sit maet
          </div>
        </div>
        <div className="flex gap-x-4 gap-y-4 flex-wrap">
          {loading ? 
          (<div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <Loading />
              Loading your surveys...
            </div>
          </div>) : 
          !!userSurveys.length ? userSurveys.map(survey => 
            <SurveyMinature 
              key={survey.id}
              title={survey.title}
              description={survey.description}
              closeDate={survey.closeDate}
              onClick={() => navigate(`/survey-result/${survey.hash}`)}
            />  
          ) :
          <div>You have got no open surveys</div>
        }
        </div>
      </ContainerContent>

    </Container>
  );
}

export default Surveys;