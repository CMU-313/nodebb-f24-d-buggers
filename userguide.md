# User Guide

## Introduction

This is the User Guide for NodeBB-F24-D-Buggers! This document will walk you through how to use and user test the new feature(s) added to this repository.

## Installation & Launch NodeBB Instance Locally
To install the project and the new features, follow these steps:
1. Clone the repositories:
    ```bash
    git clone https://github.com/CMU-313/nodebb-f24-d-buggers.git
    git clone https://github.com/CMU-313/nodebb-frontend-f24-d-buggers.git
    ```
2. In the terminal, start the Redis server:
     ```bash
    redis-server
    ```
3. In another terminal, navigate to the root directory of the repository:
    ```bash
    cd nodebb-f24-d-buggers
    ```
4. Set up NodeBB (all answers should be default except for database - redis):
    ```bash
    ./nodebb setup
    ```
    *NOTE: if this line throws an error, you might have to delete `config.json` and run `redis-cli FLUSHDB` before rerunning this line. Make sure that your redis server is running while you try to flush it.*
5. Install the template & rebuild NodeBB instance
    ```bash
    npm install ../nodebb-frontend-f24-d-buggers
    ./nodebb build tpl
    ```
6. Start NodeBB:
    ```bash
    ./nodebb start
    ```

## Usage

### Features Overview
- **Q&A Category**: A dedicated space for students to ask questions and have them categorized into relevant subcategories (Projects, Exams, Lectures, etc.)
- **Endorse Button(s)**: A way for instructors and TAs to approve a student's answer, so it gives more credibility to the answer for those who checks the topic later.
- **Edit Feature**: A way for users to edit their own topics/replies even after an hour since publishing, this feature allows users to update their posts without having to crowd the screen with replies and helps to limit the overall cognitive load placed on viewers.


## User Testing [INCOMPLETE]

### Testing Instructions
To ensure the new feature works as intended, follow these steps to test (ensure 
that you are logged in to NodeBB with your user credentials first):

**Q&A Category**:
The goal of this testing procedure is to ensure that you, as the user, are not only 
able to access the "Questions & Answers" category, but are also able to author 
topics/posts/replies that persist.
1. Click on the "Questions & Answers" category
2. Click on any subcategory within the Q&A category
3. Post a new topic and reply to it
4. Exit the subcategory entirely
5. Return to the previous subcategory to ensure that your posts persist

**Endorse Button(s)**:
The goal of this testing procedure is to ensure that you, as the TA/instructor, 
are able to endorse both topics/posts and replies as you see fit, and that these 
changes persist.
1. Click on any category
2. Click on an existing topic, or create one if there is none
3. Locate the three dots when hovering over the post & click on them
4. Click on the "Endorse" button to endorse the topic
5. Click on an existing reply, or create one if there is none
6. Locate the three dots & click on them
7. Click on the "Endorse" button to endorse the reply
8. Exit the topic entirely
9. Return to the topic to ensure that your endorsement(s) persist

**Edit Feature**:
The goal of this testing procedure is to ensure that you, as the user, are able to
edit your topics/posts/replies even after an hour has passed since publishing, and 
that these changes persist.
1. Click on the "General Discussion" category
2. Click on the "Welcome to your NodeBB!" message
3. Locate the three dots when hovering over the post & click on them
4. Click on the "Edit" button to edit the post
5. Edit the content of the post & click submit
6. Exit the welcome message entirely
7. Return to the welcome message to ensure that your edits persist

