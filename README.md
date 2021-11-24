# <img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186482/classroom/screengrabs/Group_1_3_olpvso.png" alt="logo"> My Class <img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186482/classroom/screengrabs/Group_1_3_olpvso.png" alt="logo">


## Contents

- [Overview](#overview)
- [Brief](#brief)
- [Tech Stack and Installs](#tech-stack-and-installs)
- [Planning Process](#planning-process)
- [Backend and Database](#backend-and-database)
- [Wireframes and Frontend](#wireframes-and-frontend)
- [Finished Product](#finished-product)
- [Project Challenges](#project-challenges)
- [Project Wins](#project-wins)


## Overview

This app was built as my final project during the General Assembly Software Engineering Immersive course. This full stack app was made entirely by me using a Django/PostgreSQL/Python backend database, with a frontend in React.js. This application is a place for teachers to upload and share their lessons with students and gain inspiration from other teachers. It is vibrant and fun and completely mobile responsive to ensure students with limited technology can access the pages.

## Brief

Our project brief was as follows:

We want a full stack application with a React front-end and a Django back-end
We want to see a fully functional RESTful api with all CRUD routes (GET, POST, PUT, DELETE)
We want you to use at least one OneToMany & one ManyToMany relationship (more lenient on this for solo projects)
Custom authentication (register/login) is a nice to have for solo projects, and a requirement for group projects.

My aim was to try and develop an app which had the full gamut of requirements - so I used the “group project” requirements as the goal for my MVP, despite working solo.

## Tech Stack and Installs

This project was built using a Django/Python backend to interact with a PostgreSQL database, and the front end was built in React.js.

### Packages

- axios
- http-proxy-middleware
- react-select
- dotenv
- react-router-dom
- bootstrap

### To Run

From root directory to run backend:

- pipenv shell
- python manage.py runserver

In parallel terminal to run frontend:

- cd client 
- yarn start

## Planning Process

I had found Trello to be really useful in group projects, so after having worked out the wireframe for my site and the key CRUD operations and database structure I would need, I created a Trello board to manage my workload over this 10 day project. I added the API requests to test, a front end and back end To Do list, and some inspirational messages to keep me positive over the project!

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186483/classroom/screengrabs/Screenshot_2021-10-21_at_10.44.53_yqxu8h.png" alt="trello board">

I started my project by building out my backend database and then added my front end React.js app.

## Backend and Database

This was my first Django project using Python as the main language to interact with a PostgreSQL database, so it was a steep learning curve to build my back end in this case, but I really enjoyed the precision of Django and the clarity of error messaging. I could see where things were going wrong and rectify mistakes very precisely. I used Tableplus to check my database, and built in populated serializers to create the relationships between my collections within the database.

As I went along I realised that I would need various versions of the User profile for different scenarios as, for example, the lesson's owner was being added as a user, but then that user profile was being populated with lessons, creating an infinite relationship loop. I fixed this by creating a non-populated User serializer to add an owner to the lessons, leaving the populated user profile just for the class page, and a non populated lesson, to ensure the classpage didn't cause an infinite loop the other way around.

I had three main collections within my database with various different connections between them:

### The User collection

Using the Django Basic User model, and building upon Django's in-built authorization functionality, I wanted a database of users, who could register, login, add/edit/delete lessons that would be shown in their class. The class is essentially a populated user profile. The user could be the owner of a lesson.

 <img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637189605/classroom/screengrabs/Screenshot_2021-11-17_at_22.41.38_d6xr8v.png" alt="user db" width="600">
 
### The Topic collection

A list of topics for a user to tag a lesson with. This would later be used to search within a list of lessons.

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637189605/classroom/screengrabs/Screenshot_2021-11-17_at_22.40.40_dxgavf.png" alt="topic db" width="600">

### The Lesson collection

A list of all lessons and the key information input through the add lesson form, with a many to one relationship with the user and a many to many relationship with the topics tagged in it.

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637189606/classroom/screengrabs/Screenshot_2021-11-17_at_22.39.45_vdlcdt.png" alt="lesson db" width="600">
<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637189605/classroom/screengrabs/Screenshot_2021-11-17_at_22.40.23_amuxa1.png" alt="topic relationships db" width="600">

### API calls

My final list of API calls that I built into the back end was as follows:
- GET all teacher classes
- GET single teacher class (user) by pk
- GET all topics
- POST (add) topic - this was for a Creatable React Select on the add lesson form, but I didn't get around to finishing this!
- GET all lessons
- POST (add) lesson (if current user is logged in)
- GET single lesson by pk
- PUT (edit) single lesson (if current user is owner)
- DELETE single lesson (if current user is owner)

## Wireframes and Frontend

I really wanted to ensure this app was visually striking in order to engage and excite the user, so I knew I wanted to give a good amount of time to how my frontend application looked. In order to do this, I used Figma to plan out the feel of the design of my site, as well as considering how the user journey would work and how the database would be accessed, edited and added to by the front end interface.

I designed the following wireframes to build the look of my site, but also ended up creating some other features that were additional to these planned pages as I actually had a bit more time than I had originally planned.

### Homepage Wireframe

As the content on this site is generated entirely by users, the homepage needed to show users that they would need to login or register to access the CRUD operations. There are read-only elements of the site, but I wanted the messaging to be to login as a teacher user!

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186934/classroom/screengrabs/Group_4_1_unaboc.png" alt="homepage wireframe" width="600">

### Register and Login Form Wireframes

These forms create post requests to the User database, and ensure the user provides the information required as a Django basic user, but also for the additional features needed to create a user profile/class, like profile picture and display name (which shows as the name for their classroom). 

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186934/classroom/screengrabs/Group_5_vapa2w.png" alt="register wireframe" width="600">

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186934/classroom/screengrabs/Group_6_mkxai3.png" alt="login wireframe" width="600">

### My Class Wireframe

This page was the core profile page, which would be linked to via the navbar for each individual user, but also could be shared by user id/pk with students. The navbar itself is only visible to logged in users, so that the Class and the Lesson page can be shared with students without any other visual fuss on to distract a learner.

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186934/classroom/screengrabs/Group_2_1_kgwr7t.png" alt="my class wireframe" width="600">

### Lesson Add/Edit Form Wireframe

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186934/classroom/screengrabs/Group_7_jd18fo.png" alt="lesson add/edit form wireframe" width="600">

### Individual Lesson Show Wireframe

This individual lesson page could also be shared by teachers with their students, and if the current logged in user is the owner of the lesson, they can also see the edit menu on the top right hand side. The top left hand button goes back to the lesson owner's class for easy use by students.

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186934/classroom/screengrabs/Group_3_zwnz7w.png" alt="individual lesson wireframe" width="600">

### Additional pages

I also developed some additional pages during the project that I didn't develop wire frames for. These were:

- All lessons inspiration page, for all lessons added by all teachers.
- A teacher index to browse through all teachers' classes.

## Finished Product

I am really pleased that the final product is very much like my plans in Figma, with some added detail like the grid pattern, built using a CSS gradient. It looks fun and engaging and feels like 90s stationary - taking me back to being a school kid!

Play with the app on the demo hosted on [Heroku](https://class-content-creator.herokuapp.com/).

### Homepage

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186483/classroom/screengrabs/Screenshot_2021-11-01_at_09.24.52_gxto9d.png" alt="homepage" width="600">

### My Class

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186483/classroom/screengrabs/Screenshot_2021-11-01_at_09.26.01_bzrfgf.png" alt="my class" width="600">

### Lesson Add/Edit Form

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186483/classroom/screengrabs/Screenshot_2021-11-01_at_09.27.05_ybtnqm.png" alt="lesson add/edit form" width="600">

### Individual Lesson Show

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186484/classroom/screengrabs/Screenshot_2021-11-01_at_09.28.57_s4gcp0.png" alt="individual lesson" width="600">

### Individual Lesson on Mobile

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186483/classroom/screengrabs/Screenshot_2021-11-01_at_09.27.56_mdvxco.png" alt="lesson mobile" width="350px">

### All Lessons Inspiration Page

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186484/classroom/screengrabs/Screenshot_2021-11-01_at_09.25.35_ob1olj.png" alt="individual lesson" width="600">

### Teacher Index

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186483/classroom/screengrabs/Screenshot_2021-11-01_at_09.26.40_xbma0y.png" alt="teacher index" width="600">

## Project Challenges

I sometimes found working on my own difficult as it was just me and Google to try and solve problems, but this was a real exercise in resilience, teaching me to trust my own knowledge and experiment and make mistakes that I eventually would fix.

## Project Wins

Generally I am really happy with the final product that I built within a limited time. I am really passionate about the subject matter so I could really build something that a teacher would find useful and that would engage students with playful and exciting design. 

I planned well so I had lots of time to make all the features I wanted to, as well as adding some new components, like the teachers index page and all lessons inspiration page. These were fairly quick wins but really made a difference to the richness of the site! I had that information within my databases so why not show it to the user!

## Bugs and Future Features

On “edit lesson” the lesson being edited is loading as placeholder text, but this is not technically editable and so doesn’t quite work. So I would like to change this so that it is loaded in as the actual value of the lesson form, with any changes just editing each input individually.

I want to add a creatable React Select on the “add lesson” form, so that the user can add new topics if they don’t see the topic they need on the list. This will involve posting to the topics API.

Eventually I would like to add a learner user database, who would be able to comment or add files to their linked (as a many to one relationship) teacher’s lessons to show the work they had created. They could also have a library of their own “comments” as a homework folder.

