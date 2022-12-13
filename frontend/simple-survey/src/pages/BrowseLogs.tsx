import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "../components/Container";
import DropDownMenu from "../components/DropDownMenu";
import Sidebar from "../components/Sidebar";
import { getLogs } from "../services/BackendService";
import { Log, ReduxState } from "../types/Types";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

enum LogType {
    ALL_LOGS = "All Logs",
    LOGIN_LOGS = "Login Logs"
}

const BrowseLogs: React.FC = () => {
    const [loginLogs, setLoginLogs] = useState<Log[]>([]);
    const [allLogs, setAllLogs] = useState<Log[]>([]);
    const [chosenLogs, setChosenLogs] = useState<LogType>(LogType.LOGIN_LOGS);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const user = useSelector((state: ReduxState) => state.user);

    const onLogSelect = (log: string) => {
        switch(log) {
            case LogType.ALL_LOGS: {
                setChosenLogs(log);
            } break;
            case LogType.LOGIN_LOGS: {
                setChosenLogs(log);
            } break;
        }
    }

    const showLogs = () => {
        if(chosenLogs == LogType.ALL_LOGS)
            setAllLogs([{message: "ALL LOGS", timestamp: "timestamp", level: "INFO"}]);
        else if( chosenLogs == LogType.LOGIN_LOGS)
            setLoginLogs([{message: "LOGIN LOGS", timestamp: "timestamp", level: "INFO"}]);
    }

    const downloadLogs = () => {
        
    }

    const mapLogs = (logs: Log[]) => {
        return logs.map(log => {
            return <div>{log.timestamp} - [{log.level}] - {log.message}</div>
        })
    }

    return (    
    <Container className="bg-body-text w-screen h-screen">
        <Sidebar />
        <div className="flex flex-col gap-y-6 h-[90%] w-[90%] m-10 py-6 px-12 shadow-lg border-0 border-[#bbbbbb] bg-white rounded-2xl">
            <div className="flex flex-row gap-x-5">
                <DropDownMenu className="w-24" items={[LogType.LOGIN_LOGS, LogType.ALL_LOGS]} 
                    onChange={onLogSelect}/>
                <div className="text-center p-1">FROM: </div> 
                <div className="content-center p-1">
                    <DatePicker className="outline outline-1 outline-light-gray p-1" selected={startDate} onChange={(date:Date) => setStartDate(date)} />
                </div>
                <div className="text-center p-1">TO: </div> 
                <div className="content-center p-1">
                    <DatePicker className="outline outline-1 outline-light-gray p-1" selected={endDate} onChange={(date:Date) => setEndDate(date)} />
                </div>
                <div className="border border-solid border-1 cursor-pointer text-center p-1" onClick={showLogs}>SHOW</div>
                <div className="border border-solid border-1 cursor-pointer text-center p-1" onClick={downloadLogs}>DOWNLOAD</div>
            </div>
            <div className="border-solid border-b border-light-gray"></div>
            <div className="h-full bg-[#222222] text-[#FFFFFF] overflow-scroll p-2 whitespace-nowrap">
                {
                    (chosenLogs == LogType.LOGIN_LOGS) && mapLogs(loginLogs) || mapLogs(allLogs)
                }
            </div>
        </div>
    </Container>
    );
}

export default BrowseLogs;