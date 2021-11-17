# <img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186482/classroom/screengrabs/Group_1_3_olpvso.png" alt="logo"> My Class <img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186482/classroom/screengrabs/Group_1_3_olpvso.png" alt="logo">


## Contents

- [Introduction](#introduction)
- [Planning Process](#planning-process)
- [Backend and Database](#backend-and-database)
- [Wireframes and Frontend](#wireframes-and-frontend)
- [Tech Stack and Installs](#tech-stack-and-installs)
- [Finished Product](#finished-product)

## Introduction

This app was built as my final project during the General Assembly Software Engineering Immersive course. This full stack app was made entirely by me using a Django/PostgreSQL/Python backend database, with a frontend in React.js. This application is a place for teachers to upload and share their lessons with students and gain inspiration from other teachers. It is vibrant and fun and completely mobile responsive to ensure students with limited technology can access the pages.

## Planning Process

I had found Trello to be really useful in group projects, so after having worked out the wireframe for my site and the key CRUD operations and database structure I would need, I created a Trello board to manage my workload over this 10 day project. I added the API requests to test, a front end and back end To Do list, and some inspirational messages to keep me positive over the project!

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186483/classroom/screengrabs/Screenshot_2021-10-21_at_10.44.53_yqxu8h.png" alt="trello board">

## Backend and Database

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

### My Class

This page was the core profile page, which would be linked to via the navbar for each individual user, but also could be shared by user id/pk with students. The navbar itself is only visible to logged in users, so that the Class and the Lesson page can be shared with students without any other visual fuss on to distract a learner.

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186934/classroom/screengrabs/Group_2_1_kgwr7t.png" alt="my class wireframe" width="600">

### Lesson Add/Edit Form

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186934/classroom/screengrabs/Group_7_jd18fo.png" alt="lesson add/edit form wireframe" width="600">

### Individual Lesson Show

This individual lesson page could also be shared by teachers with their students, and if current logged in user is the owner of the lesson, they can also see the edit menu on the top right hand side. The top left hand button goes back to the lesson owner's class for easy use by students.

<img src="https://res.cloudinary.com/dysirhng8/image/upload/v1637186934/classroom/screengrabs/Group_3_zwnz7w.png" alt="individual lesson wireframe" width="600">

### Additional pages

I also developed some additional pages during the project that I didn't develop wire frames for. These were:

- All lessons inspiration page, for all lessons added by all teachers.
- A teacher index to browse through all teachers' classes.

