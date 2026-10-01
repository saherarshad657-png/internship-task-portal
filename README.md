# TaskFlow - Internship Task Portal

TaskFlow is a small responsive internship task management portal built as an internship project.

The application allows interns to view assigned tasks, search and filter tasks, update task status, and add new tasks. Task data is stored locally in the browser using localStorage.

## Project Purpose

The purpose of this project is to demonstrate the development of a simple, responsive, and user-friendly task management interface using fundamental web development technologies.

The project focuses on:

- Clean and organized code
- Responsive design
- JavaScript-based functionality
- Form validation
- Task filtering and searching
- Local data persistence
- Simple and professional user interface

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser localStorage

## Features

### 1. Task Management

Users can view assigned tasks with:

- Task title
- Task description
- Priority
- Deadline
- Current status

### 2. Task Status Updates

Users can change the status of a task between:

- Pending
- In Progress
- Completed

The statistics section automatically updates when a task status changes.

### 3. Search

Users can search tasks by:

- Task title
- Task description

### 4. Filtering

Tasks can be filtered by:

- Status
- Priority

Users can also clear all filters.

### 5. Add New Task

Users can create a new task by entering:

- Task title
- Description
- Priority
- Deadline
- Status

### 6. Form Validation

The application performs basic validation before adding a task.

For example:

- Task title is required
- Task title must contain at least 3 characters
- Description is required
- Description must contain at least 10 characters
- Priority must be selected
- Deadline must be selected

### 7. Local Storage

Task data is stored using browser localStorage.

This means:

- Added tasks remain after refreshing the page
- Updated task statuses remain after refreshing the page
- No backend server or database is required

## Responsive Design

The interface is designed to work on different screen sizes, including:

- Desktop computers
- Laptops
- Tablets
- Mobile phones

CSS media queries are used to adapt the layout for smaller screens.

## Project Structure

```text
internship-task-portal/
│
├── index.html      # Main HTML structure
├── style.css       # Styling and responsive design
├── script.js       # Application functionality
└── README.md       # Project documentation