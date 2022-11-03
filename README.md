# marvel-initiative
 Project that seeks to show part of my skills as a frontend developer

The purpose of this project is to make my skills in web development known. To do so, I prototyped with figma. You can visit the following link to visualize the design of the different views. Based on mockups made on paper:
https://www.figma.com/file/umbkrtjDlsxdarS51ZwBmp/marvelPrototype?node-id=0%3A1

The web technologies present in the project are:
HTML5 and CSS3 used for fully responsive structuring and design. This is achieved using the flexbox and css grid technologies in addition to the semantic tags that correspond to each type of content.

For the functionality of the site, Javascript is used in its pure form without the use of frameworks.
The architecture of the project is MVC (model view controller)
SPA operation
Welcome to my version of the Marvel comics universe through its different sections you can learn about the 1562 characters that are part of said universe. This is achieved through 4 sections (home, characters, Project, contact) that we can see as follows:

Home: You find the welcome, features with their respective description and a component that by using the official Marvel API randomly brings 3 characters and shows them on the screen (whenever you enter the website these 3 characters will be different)
This is achieved through a function present in the randomView.js file in the js folder that is part of the application files.
Using the javascript function math.random we generate 3 random numbers from 0 to 1561 (they are 1562 counting from zero) and then the request is made to the Marvel API to be able to fetch the information of these characters.

Characters: This section puts us in a view all the characters arranged in alphabetical order and paginated from 25 to the 1562 Marvel characters. This is achieved by fetching in order the data whose work is done by the model.js file present in the application's js folder, then delivers the information to the controller.js so that it tells the charactersView.js file that it is in the views folder that renders the characters on screen.

Project: In this section we can see how the planning process of the entire project was, it also has a gallery component that is in charge of showing in a more comfortable way the creation of mockups and prototyping in figma that are part of our SPA, ending its navigation we find a pattern z for the explanation of each part of the process.

Contact: Finally we have a contact form in which we can send a name, email and a message, what I do is store this data in an object and then capture it in the local storage. When sending the data, the user sees a message to know that the data was sent and proceeds to clean the form boxes.
