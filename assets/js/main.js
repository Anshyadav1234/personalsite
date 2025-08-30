document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.querySelector('.contact-form');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '') {
                alert('Please enter your name.');
                return;
            }

            if (email === '') {
                alert('Please enter your email address.');
                return;
            }

            // Basic email validation regex
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            if (message === '') {
                alert('Please enter your message.');
                return;
            }

            // If all validations pass
            alert('Form submitted successfully! (This is a demo, no actual submission)');
            contactForm.reset(); // Clear the form
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Handle dropdown menu display
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            dropdown.querySelector('.dropdown-content').style.display = 'block';
        });
        dropdown.addEventListener('mouseleave', () => {
            dropdown.querySelector('.dropdown-content').style.display = 'none';
        });
    });

    // Task List Functionality
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button data-action="toggle" data-index="${index}">Toggle Complete</button>
                    <button data-action="delete" data-index="${index}">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            newTaskInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    taskList.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (index !== undefined) {
            if (e.target.dataset.action === 'toggle') {
                tasks[index].completed = !tasks[index].completed;
            } else if (e.target.dataset.action === 'delete') {
                tasks.splice(index, 1);
            }
            saveTasks();
            renderTasks();
        }
    });

    renderTasks(); // Initial render
});