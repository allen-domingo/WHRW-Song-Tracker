# WHRW-Song-Tracker
Song Tracker for charting @ WHRW Radio Station.

This application was built for WHRW to provide capabilities to easily access the music played by the DJs on air, with a new look and some extra capabilities. The use by the DJs is simply to enter the song in the input field at the top, and with the metadata stored grabbed, displayed, and simultaneously stored in a Google Spreadsheet.

### Card View (Light Mode)

<img width="959" alt="Screenshot 2024-02-01 163201" src="https://github.com/allen-domingo/WHRW-Song-Tracker/assets/112440034/a618e8f0-ba08-49f5-b958-5adaff26abc7">

### List View (Dark Mode)

<img width="960" alt="Screenshot 2024-02-08 124223" src="https://github.com/allen-domingo/WHRW-Song-Tracker/assets/112440034/5720a9ee-46d7-4a45-8c8f-5cc9d940e3a9">


The application uses the Spotify TypeScript SDK to get the data for the album cover and the autocorrect. TailwindCSS is used for the front end design, while GoogleAPI authentication is handled by the Jose library, getting a temporary JSON web token using a service account and getting a temporary key for the fetch call to enter to the sheet.
