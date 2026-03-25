
import http from 'http';
import * as SpotAPI from "./spotify";
import { exec } from 'child_process';
import url from 'url';

http.createServer(async(req, res)=>{
    const queryObj = url.parse(req.url || '', true).query;
    if(req.url?.startsWith("/callback")){
        const code = queryObj.code as string;
        try {
            const reqeust = await SpotAPI.getAccessToken(code);
            console.log(reqeust.refresh_token);
            res.end('Success! You can close this tab and check your terminal.');
            process.exit(0)
        } catch (err) {
            res.end('Error while fetching token.');
            console.log(err);
        }
    }
}).listen(8787)


const start = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';

exec(`${start} "${SpotAPI.getLoginURL()}"`);
