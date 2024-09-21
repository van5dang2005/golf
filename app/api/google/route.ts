import { google } from "googleapis";
export async function POST(request: Request) {  
    try{
        const params = await request.json();
        const auth = new google.auth.GoogleAuth({credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/spreadsheets'
            ]
        });
        const sheets = google.sheets({auth,version: 'v4'});
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'A1:R1',
            valueInputOption: 'USER_ENTERED',
            requestBody:{
                values:[
                    [params.id,params.team,params.quantityUser,params.username,
                         params.arrayBall[0],params.arrayBall[1],params.arrayBall[2],
                         params.arrayBall[3],params.arrayBall[4],params.arrayBall[5],
                         params.arrayBall[6],params.arrayBall[7],params.arrayBall[8],
                         params.arrayBall[9],params.arrayBall[10],params.arrayBall[11],
                    params.sumball,params.total]
                ]
            }
        });
        return new Response(JSON.stringify(response), {
            status: 200,
          })
    }catch(e){
        return new Response(JSON.stringify(e), {
            status: 200,
          })  
    }
}
