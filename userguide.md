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

### User Testing

### Testing Instructions

To ensure the new features work as intended, follow these testing procedures. Make sure you are logged in to your NodeBB instance with the appropriate user credentials before performing each test.

---

#### **Q&A Category**

**Objective**: Verify that users can access the "Questions & Answers" category, create topics and replies, and that these posts persist correctly.

**Steps**:

1. **Accessing the Q&A Category**:
    - Log in to your NodeBB instance.
    - From the main navigation menu, click on the **"Questions & Answers"** category.

2. **Navigating Subcategories**:
    - Within the Q&A category, select any subcategory (e.g., **Projects**, **Exams**, **Lectures**).

3. **Creating a New Topic**:
    - Click on the **"New Topic"** button.
    - Enter a relevant title and content for your question.
    - Click **"Submit"** to create the new topic.

4. **Posting a Reply**:
    - Open the newly created topic.
    - Click on the **"Reply"** button.
    - Enter your answer or follow-up question.
    - Click **"Submit"** to post the reply.

5. **Verifying Persistence**:
    - Navigate away from the subcategory by clicking on a different category in the main menu.
    - Return to the original subcategory by clicking on **"Questions & Answers"** and then the specific subcategory.
    - Confirm that both the new topic and reply are present and correctly displayed.

**Expected Results**:
- Users can successfully create new topics and replies within the Q&A category.
- All posts persist and are visible upon revisiting the subcategory.

---

#### **Endorse Button(s)**

**Objective**: Ensure that TAs and instructors can endorse topics and replies, and that endorsements persist correctly.

**Steps**:

1. **Accessing a Category**:
    - Log in as a **TA** or **Instructor**.
    - From the main navigation menu, click on any category.

2. **Endorsing a Topic**:
    - Select an existing topic or create a new one by clicking **"New Topic"**.
    - Hover over the topic post to reveal additional options (three dots **⋯**).
    - Click on the three dots and select the **"Endorse"** button.

3. **Endorsing a Reply**:
    - Open the topic containing replies.
    - Hover over a reply to reveal additional options (three dots **⋯**).
    - Click on the three dots and select the **"Endorse"** button.

4. **Verifying Persistence**:
    - Navigate away from the topic by clicking on a different category or topic.
    - Return to the endorsed topic.
    - Confirm that the endorsements are still visible and accurately reflected.

**Expected Results**:
- TAs and instructors can successfully endorse both topics and replies.
- Endorsements persist and are accurately displayed upon revisiting the topic.

---

#### **Edit Feature**

**Objective**: Confirm that users can edit their own topics and replies even after an hour has passed since publishing, and that these edits persist.

**Steps**:

1. **Accessing a Topic**:
    - Log in as a **regular user**.
    - From the main navigation menu, click on the **"General Discussion"** category.
    - Open the **"Welcome to your NodeBB!"** topic.

2. **Editing a Post**:
    - Hover over your post to reveal additional options (three dots **⋯**).
    - Click on the three dots and select the **"Edit"** button.
    - Modify the content of your post as desired.
    - Click **"Submit"** to save the changes.

3. **Verifying Persistence**:
    - Navigate away from the topic by clicking on a different category or topic.
    - Return to the **"Welcome to your NodeBB!"** topic.
    - Ensure that your edits are correctly displayed and saved.

**Expected Results**:
- Users can edit their own posts at any time, regardless of how much time has passed since publication.
- Edited content persists and is accurately displayed upon revisiting the post.

---

### Additional Testing Scenarios

To ensure comprehensive coverage, perform the following additional tests:

#### **Permission and Access Control**

**Objective**: Verify that only authorized users (e.g., TAs, instructors) can perform specific actions like endorsing posts.

**Steps**:

1. **Attempting Endorsement as a Regular User**:
    - Log in as a **regular user**.
    - Navigate to any topic or reply.
    - Attempt to locate and click the **"Endorse"** button.

**Expected Results**:
- Regular users should **not** see the **"Endorse"** button.
- If the button is visible due to a bug, attempting to endorse should result in an error message stating insufficient privileges.

#### **Edge Case Testing**

**Objective**: Test the system's behavior under unusual or extreme conditions.

**Steps**:

1. **Editing Posts Concurrently**:
    - Log in as the **same user** from two different browsers or devices.
    - Open the same post in both instances.
    - Attempt to edit the post simultaneously in both browsers.
    - Submit changes from both instances.

2. **Endorsing Non-Existent Posts**:
    - As a **TA** or **Instructor**, attempt to endorse a post that has been deleted or does not exist.
    - This can be done by manually altering the post ID in the endorsement URL or using developer tools to simulate the action.

**Expected Results**:
- **Concurrent Edits**: The system should handle concurrent edits gracefully, preventing data conflicts. Ideally, the second edit attempt should notify the user of a conflict or overwrite warning.
- **Endorsing Non-Existent Posts**: The system should display an appropriate error message (e.g., "Post does not exist") without affecting overall system stability.

---

### Automated Testing

In addition to manual testing, automated tests have been implemented to ensure the reliability of new features. These tests cover various scenarios, including event logging, endorsement functionalities, and data persistence.

**Running Automated Tests**:

1. **Navigate to the Test Directory**:
    ```bash
    cd nodebb-f24-d-buggers/tests
    ```

2. **Install Test Dependencies**:
    ```bash
    npm install
    ```

3. **Execute the Test Suite**:
    ```bash
    npm test
    ```

**Interpreting Test Results**:
- Ensure all tests pass without errors.
- Review any failed tests to identify and address potential issues.

---

### Reporting Issues

If you encounter any issues during testing, please follow these steps to report them:

1. **Document the Issue**:
    - Provide a clear and concise description of the problem.
    - Include steps to reproduce the issue.
    - Attach screenshots or logs if applicable.

2. **Submit the Report**:
    - Navigate to the [GitHub Issues](https://github.com/CMU-313/nodebb-f24-d-buggers/issues) page of the repository.
    - Click on **"New Issue"** and fill in the details as documented.

3. **Follow Up**:
    - Monitor the issue for any responses from the development team.
    - Provide additional information if requested.

---

### Feedback

Your feedback is invaluable in improving the NodeBB-F24-D-Buggers project. After completing the user testing, please share your thoughts on the following:

- **Usability**: How intuitive and user-friendly are the new features?
- **Performance**: Did you experience any slowdowns or performance issues?
- **Suggestions**: Do you have any recommendations for enhancing the features or adding new functionalities?

You can provide feedback by:

- **Opening a GitHub Issue**: Use the [Issues](https://github.com/CMU-313/nodebb-f24-d-buggers/issues) section to share your feedback.
- **Contacting the Development Team**: Reach out via email or the project's communication channels.

Your contributions help ensure the success and reliability of the project. Thank you for your participation!