# weekday-project
Thank you for visiting my project. This project is a part of the selection process for SDE-1(Frontend) profile at Weekday. I have added detailed comments in the logic used wherever required.

# Tech Stack Used:
This project has been built solely using:
1. React.js
2. Material UI
3. CSS

# In order to run this project on your local system: 
1. Download the zip file from github and extract it in a folder.
2. Open the terminal. Inside the terminal move to the newly created folder.
3. Run npm i to install all the dependencies.
4. Type npm start to start the project.

# Assumptions: I have made the following assumptions for a few unclear points in order to execute this task.
1. The text "Posted 3 days ago" is a static text common for all the job cards as there was not field in the api to tell us when the job was posted but was there in the image/extension.
2. Some of the fields such as experience had null values. I have omitted the section which has null values from the UI and filters.
     i. There is also a sub-case for this as few fields such as min salary and max salary also had null values. I have omitted the field if it is missing. In this case Estimated salary shows only the value that is not null. However, filters are applied to minimum estimated salary. So, if the UI shows estimated salary with maxValue, it gets filtered out even if it is in range as minimum salary didn't have any value and the documentation specified that we were supposed to omit those results. 
3. The following filters have been implemented in this project:
     i. Roles
     ii. Experience
     iii. Remote
     iv. Location
     v. Minimum estimted salary
     vi. Company Name
   Under Remote/On-site, I have considered all the locations except for Remote to be on-site. Since there was no particular field in the api to let us know about Remote/On-site.
   There was another filter termed "Tech Stack" in the document/extension. Since, we don't have any information about the tech stack in the api, it wouldn't have been possible to categorize tech stacks on the basis of job. So, I have not added that filter.
4. All the filters list have been hardcoded and stored in a file named filtersList.js as there was no api to get the filters list. I could have used a set to get only the unique elments from the api but since we are implementing data with offsets, every time an entry with new specifications would have come, it would have to be added in the filters list. So, I have stored hardcoded filters list in a separate file.
5. API calls:
     i. Whenever the user reaches the bottom of the page, I call the api to fetch more data.
     ii. I have restricted fetching new data if the user is already at the bottom and filters have been applied as per the requirement: to not call the api(when filters are applied) until and unless the user scrolls to the bottom. Now, if the user scrolls up and then to the bottom, it calls the api to fetch more data and filters get automatically applied.
     iii. The above point is not applicable in case no filters are applied. In that case, it keeps on fetching the data till the page becomes scrollable. Afterwards it gets called when user scrolls to the bottom of the page.
6. Card CSS: I have taken max-width 100px more than the extension as I had to fill up the empty space as there is no sidebar. There is still some empty space towards the right but it wouldn't have looked nice if I would have increased the width further and adding another card would have made the page cluttered. I have tried to match most of the things as per the extension/image and have used a sample image for Referral button. 


Thank you so much for checking this project. I hope you like it and am eagerly waiting for the result and next round.

