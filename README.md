# TECH-BLOG

## Project Description

AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions

## Acceptance Criteria

GIVEN a CMS-style blog site

1. WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
2. WHEN I click on the homepage option
THEN I am taken to the homepage
3. WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
4. WHEN I choose to sign up
THEN I am prompted to create a username and password
5. WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
6. WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
7. WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
8. WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
9. WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
10. WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
11. WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
12. WHEN I click on the logout option in the navigation
THEN I am signed out of the site
13. WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments

## Installation

run

```
mysql source schema.sql
mysql source seeds.sql
```

on mysql server

run

```
npm install
```

on the root folder. Then run

```
node server.js
```

## Deployment

My app is deployed here.
https://tech-blog-zixin.herokuapp.com/