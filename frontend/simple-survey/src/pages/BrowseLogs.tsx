import React, { useState } from "react";
import { useSelector } from "react-redux";
import Container from "../components/Container";
import DropDownMenu from "../components/DropDownMenu";
import { downloadZippedLogs, getLogs } from "../services/BackendService";
import { Log, ReduxState } from "../types/Types";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import ContainerContent from "../components/ContainerContent";

enum LogType {
    ALL_LOGS = "All Logs",
    LOGIN_LOGS = "Login Logs"
}

const BrowseLogs: React.FC = () => {
    const [loginLogs, setLoginLogs] = useState<Log[]>([]);
    const [allLogs, setAllLogs] = useState<Log[]>([]);
    const [chosenLogs, setChosenLogs] = useState<LogType>(LogType.LOGIN_LOGS);
    const [startDate, setStartDate] = useState(new Date((new Date().setHours(0, 0, 0))));
    const [endDate, setEndDate] = useState(new Date(new Date().setHours(23, 59, 59)));

    const user = useSelector((state: ReduxState) => state.user);

    const onLogSelect = (log: string) => {
        setChosenLogs(log as LogType);
    }

    const showLogs = () => {
        if(chosenLogs === LogType.ALL_LOGS) {
            getLogs(user.jwt, startDate, endDate, true).then((res) => setAllLogs(res.data));
        }
        else if( chosenLogs === LogType.LOGIN_LOGS){
            getLogs(user.jwt, startDate, endDate, false).then((res) => setLoginLogs(res.data));
        }
    }

    const downloadLogs = () => {
        downloadZippedLogs(user.jwt, startDate, endDate, chosenLogs === LogType.ALL_LOGS)
        .then((res) => {
            // create file link in browser's memory
            const href = URL.createObjectURL(res.data);

            // create "a" HTML element with href to file & click
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', 'logs.zip'); //or any other extension
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        })
        .catch(err => console.error(err))
    }

    const mapLogs = (logs: Log[]) => {
        if (!logs || !logs.length) {
            return <div className="min-h-full">Sorry, no logs were found :(</div>
        }
        console.log(logs);
        return logs.map(log => {
            return <div className="flex flex-row gap-x-1 pr-4">
                <div className="text-[#ffd439]">{new Date(log.timestamp).toLocaleString()} - </div>
                <div className={log.level === "error" ? "text-[#fd3e3e]" : "text-[#3b59ff]"}>{log.level.toLocaleUpperCase()} - </div>
                <div>{log.message}</div>
            </div>
        })
    }

    return (    
    <Container>
        <ContainerContent className="flex flex-col max-h-[94vh]">
            <div className="flex flex-row gap-x-5 items-center">
                <DropDownMenu className="w-24" items={[LogType.LOGIN_LOGS, LogType.ALL_LOGS]} 
                    onChange={onLogSelect}/>
                <div className="text-center p-1">FROM: </div> 
                <div className="content-center p-1">
                    <DatePicker className="outline outline-1 outline-light-gray p-1" selected={startDate} onChange={(date: Date) => setStartDate(new Date(date.setHours(0, 0, 0)))} />
                </div>
                <div className="text-center p-1">TO: </div> 
                <div className="content-center p-1">
                    <DatePicker className="outline outline-1 outline-light-gray p-1" selected={endDate} onChange={(date: Date) => setEndDate(new Date(date.setHours(23, 59, 59)))} />
                </div>
                <div className="border border-solid border-1 cursor-pointer text-center p-1" onClick={showLogs}>SHOW</div>
                <div className="border border-solid border-1 cursor-pointer text-center p-1" onClick={downloadLogs}>DOWNLOAD</div>
            </div>
            <div className="border-solid border-b border-light-gray"></div>
            <div className="max-h-[100%] bg-[#222222] text-[#FFFFFF] overflow-scroll py-2 px-2 whitespace-nowrap flex-grow">
                {
                    (chosenLogs === LogType.LOGIN_LOGS) ? mapLogs(loginLogs) : mapLogs(allLogs)
                }
            </div>
        </ContainerContent>
    </Container>
    );
}

export default BrowseLogs;