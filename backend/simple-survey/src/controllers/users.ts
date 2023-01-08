import { Request, Response } from "express";
import jwtDecode from "jwt-decode";
import { AppDataSource } from "../data-source";
import { User, UserRole } from "../entities/User";
import { defaultLogger, loginLogger, readLogs } from "../utils/loggerUtils";
import { userExists } from "../utils/userUtils";

const userRepository = AppDataSource.getRepository(User);

const loginUser = async (req: Request, res: Response) => {

  const token: any = jwtDecode(req.body.jwt);
  const email = token.email;
  
  if (!email) return res.status(500);

  let retUser = {
    email: email,
    username: token.name,
    imageUrl: token.picture,
    userId: 0,
    isAdmin: false
  };

  if (await userExists(email)) {
    const user = await userRepository.findOneBy({
      email: email
    });

    retUser.userId = user!.id;
    retUser.isAdmin = user!.role === UserRole.ADMIN;
  } else {
    const newUser = new User(email);
    await userRepository.save(newUser);
  }

  loginLogger.log('info', `Successfull user log in: email: ${retUser.email}, name: ${retUser.username}, id: ${retUser.userId}`);
  return res.status(200).json(retUser);
}

const getLogs = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await readLogs(req.body.from, req.body.to, req.body.allLogs ? './default-logs' : './login-logs'));
  } catch (error) {
    return res.status(500).json({error});
  }
}

const donwloadLogs = async (req: Request, res: Response) => {
  const { promises: fs } = require('fs');
  const fsSync = require('fs');
  const JSZip = require('jszip');

  const zip = new JSZip();

  const user: { email: string, name: string } = jwtDecode(req.body.jwt);
  const fileName = `${user.name}_${user.email}_logs_${new Date().toDateString()}.zip`.replaceAll(" ", "_").toLowerCase();

  try {
    const fromTs = new Date(req.body.from).getTime();
    const toTs = new Date(req.body.to).getTime();
    const logsPath = req.body.allLogs ? './default-logs' : './login-logs';

    let logFiles: string[] = await fs.readdir(logsPath);

    logFiles = logFiles.filter((file: string) => {
      const fileTs = new Date(file.split(".")[1]).getTime();

      return fileTs >= fromTs && fileTs <= toTs
    });

    for (const log of logFiles) {
      const fileData = await fs.readFile(`${logsPath}/${log}`, 'utf-8');
      zip.file(log, fileData);      
    }

    zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(fsSync.createWriteStream(fileName))
        .on('finish', function () {
            defaultLogger.log('info', `Zipped log file has been written : ${fileName}`);
        });    

    const stream = fsSync.createReadStream(`${process.cwd()}/` + fileName);
    res.set({
      'Content-Disposition': `attachment; filename='${fileName}'`,
      'Content-Type': 'application/pdf',
    });
    
    stream.pipe(res);

    // return res.download(fileName);
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({error});
  }
}

export { loginUser, getLogs, donwloadLogs };