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
    *NOTE: if this line throws an error, you might have to delete `config.json` and run `redis-cli FLUSHDB` before rerunning this line.*
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
- **Endorse Button**: A way for instructors and TAs to approve a student's answer, so it gives more credibility to the answer for those who checks the topic later.

### Step-by-Step Instructions [INCOMPLETE]
1. Click on the "Questions & Answers" category
2. Click on an existing topic, or create one if there is none
3. Locate the three dots when hovering over the post & click on it
4. Click on the Endorse button
5. ...

## User Testing [INCOMPLETE]

### Testing Instructions
To ensure the new feature works as intended, follow these steps to test:
1. [Describe a specific scenario]
   - Expected Outcome: [What should happen when the feature works as intended]
2. [Describe another scenario]
   - Expected Outcome: [What should happen in this case]
