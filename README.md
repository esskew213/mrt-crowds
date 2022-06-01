# [How crowded are MRT platforms right now?](https://mrt-platform-crowds.vercel.app/)

### Project Objectives
A quick project created with React and Supabase to try pulling data from [LTA Data Mall](https://datamall.lta.gov.sg/content/datamall/en.html) and visualising it using Google Maps. I picked MRT platform crowds because LTA supposedly updates the data every 10 minutes, and seeing if a station is crowded could help users make a decision as to whether to go there or find alternative transport. This would in turn help to spread out peak load at the MRT.

### Thoughts and Further Work
Kudos to the developers of [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api) — it was pretty intuitive to use. I do need to fix some bugs with regards to the update frequency for platform crowd levels. At present it's set to update once every hour because LTA limits the number of API calls one can make (I think).
