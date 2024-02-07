export default async function EnterSheets(title, artist, album, time, releaseDate, key) {

  //function to enter into Google Sheets

  //id for spreadsheet
  let SHEET_ID = "ID";
  //token
    let KEY = key;

  //fetch request to get 
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY}`,
      },
      body: JSON.stringify({

        requests: [{

          appendCells: {
            sheetId: 0,
            rows: [{
              values:
             [{ userEnteredValue: {
                "stringValue": artist
              },
            }, 
            {
              userEnteredValue: {
                "stringValue": title
              },
            },
            {
              userEnteredValue: {
                "stringValue": album
              },
            },
            {
              userEnteredValue: {
                "stringValue": time
              },
            },
            {
              userEnteredValue: {
                "stringValue": releaseDate
            }
          }
          ],
            }],
            fields: "*"
          }
        }]

      })
    })
  

};
