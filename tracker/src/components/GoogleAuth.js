import * as jose from "https://esm.run/jose@5.2.0";
import file from "./credentials.json" with { type: "json" };
export default async function GoogleAuth(helperKey){


    // CREDITS TO LUCY LOERKER FOR THIS

    let credsElem = file;
    let jwtElem;    
    let accessTokenElem = "";   
 
      // See:
      //  - https://developers.google.com/identity/protocols/oauth2/service-account#httprest
      //  - https://github.com/googleapis/google-auth-library-nodejs/blob/7282af878b9c5da17d00b23f99d2f60093b313fb/src/auth/jwtaccess.ts#L23
      const alg = "RS256";
      // See:
      //  - https://developers.google.com/identity/protocols/oauth2/service-account#required-claims
      //  - https://github.com/googleapis/google-auth-library-nodejs/blob/7282af878b9c5da17d00b23f99d2f60093b313fb/src/auth/jwtaccess.ts#L88-L166
      const payload = {
        // NOTE: In your code, you probably want to replace this with an array
        // that you call `.join(" ")` on.
        scope: "https://www.googleapis.com/auth/spreadsheets",
      };
      const creds = credsElem;
      // https://github.com/googleapis/google-auth-library-nodejs/blob/a4f9f9c65853a37e6e83861c5d22533dba774037/src/auth/jwtclient.ts#L191-L199
      // See (RSA): https://github.com/panva/jose/blob/main/docs/classes/jwt_sign.SignJWT.md
      const privateKey = await jose.importPKCS8(creds.private_key, alg);
    
      const jwt = await new jose.SignJWT(payload)
        .setIssuer(creds.client_email)
        .setAudience("https://oauth2.googleapis.com/token")
        // Make the assertion expire in an hour. See:
        // https://github.com/googleapis/google-auth-library-nodejs/blob/7282af878b9c5da17d00b23f99d2f60093b313fb/src/auth/jwtaccess.ts#L168-L177
        .setExpirationTime("1h")
        .setIssuedAt()
        .setSubject(creds.client_email)
        .setProtectedHeader({ alg })
        .sign(privateKey);
    
      jwtElem = jwt;
     

      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {},
        body: new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          // NOTE: Replace this with the source of your generated JWT.
          assertion: jwtElem,
        }),
      });
      if (!response.ok) {
        throw new Error(
          `Error occurred while requesting access token: ${await response.text()}`
        );
      }
      const json = await response.json();
     
      accessTokenElem = json.access_token;
      console.log("new token found");
      helperKey(accessTokenElem);
  
}