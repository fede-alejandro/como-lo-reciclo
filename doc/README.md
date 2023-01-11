# Hello App

## Intro

Is an web to donate what you no longer use, if you want to give your things a second life, publish it!. The donor decides to whom he/she wants to donate it. It also contains information on how to recycle and take care of the planet.  

![](https://media.tenor.com/yEW0bneCw30AAAAC/gif1.gif) 

## Functional Description

### Use Cases

User
- Create a post
- View all public posts
- Update a post
- Delete a post
- View profile
- Change password
- Create comment 
- Delete comment

## Technical Description

### Blocks

```
App (client-side)        API (server-side)       DB
[React > logic > xhr] -> [Express > Mongoose] -> [Mongo]
```

### Data Model

User
- name (String, required)
- email (String, required, unique)
- password (String, required)

Post
- user (ObjectId, required, ref: "User")
- title (String, required)
- text (String, required)
- image (String)
- visibility (String, required, enum: ['public', 'private])
- date (Date, required)
- comments [Comment]

Comment
- user (ObjectId, required, ref: "User")
- text (String, required)
- date (Date, required)
- answers [Comments]

### Technologies

- JavaScript
- React
- Node
- Express
- Mongo
- Mongoose
- Tailwind