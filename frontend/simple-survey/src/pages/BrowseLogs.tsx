import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "../components/Container";
import DropDownMenu from "../components/DropDownMenu";
import Sidebar from "../components/Sidebar";
import { getLogs } from "../services/BackendService";
import { ReduxState } from "../types/Types";

const BrowseLogs: React.FC = () => {
    const [logs, setLogs] = useState<any[]>([]);
    const user = useSelector((state: ReduxState) => state.user)

    useEffect(() => {
        getLogs(user.jwt).then(res => {setLogs(res.data); console.log(res.data);});
    }, []);

    enum LogType {
        ALL_LOGS = "All Logs",
        LOGIN_LOGS = "Login Logs"
    }

    const onLogSelect = (log: string) => {
        switch(log) {
            case LogType.ALL_LOGS: {
                setLogs([{message: log}, ...logs]);
            } break;
            case LogType.LOGIN_LOGS: {
                setLogs([{message: log}, ...logs]);
            } break;
        }
    }

    return (    
    <Container className="bg-body-text w-screen h-screen">
        <Sidebar />
        <div className="flex flex-col gap-y-6 h-[90%] w-[90%] m-10 py-6 px-12 shadow-lg border-0 border-[#bbbbbb] bg-white rounded-2xl overflow-y-scroll">
            <div className="flex flex-row">
                <DropDownMenu className="w-24" items={[LogType.LOGIN_LOGS, LogType.ALL_LOGS]} 
                    onChange={onLogSelect}/>
            </div>
            <div className="border-solid border-b border-light-gray"></div>
            <div className="h-full bg-[#222222] text-[#FFFFFF] overflow-scroll p-2 whitespace-nowrap">
                {logs.map((log: any, index: number) => <div key={index}>{log.message}</div>)}
            </div>
        </div>
    </Container>
    );
}

export default BrowseLogs;