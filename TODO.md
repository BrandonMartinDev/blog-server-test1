# REMINDER:
DO NOT FORGET NEXT TIME TO CREATE A FEATURE BRANCH!!

# GENERAL

- Implement liking blogs
- Comments on blogs


---


### LIKES

X - Change "add user like" to "modify user like". The system should check and see if the current logged in user has already liked the article. If they have, it will remove the like and if they have not liked the blog, it will add a like.

After doing some research, it has been decided that the system will not operate in this way. The client should send a delete request to remove their like instead of sending a request to the same endpoint.