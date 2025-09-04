/**array of course objects */
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]


/*changing the completed property to true*/
const completedCourses = [111, 210, 110, 130, 131];

courses.forEach(course => {
    if (completedCourses.includes(course.number)){
        course.completed = true;
    }
});

/*display all the courses */
const certificateSection = document.querySelector(".certificates");
function displayCourses(list) {
    certificateSection.innerHTML = "";

    //title ____
    const title = document.createElement("h2");
    title.textContent = "Web Certificate Courses";
    certificateSection.appendChild(title);

    // button ____
    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttons-div";

    ["All", "CSE", "WDD"].forEach(type => {
        const btn = document.createElement("button");
        btn.textContent = type;

        btn.addEventListener("click", () => {
            if (type === "All"){
                displayCourses(courses);
            } 
            else {
                const filtered = courses.filter(c => c.subject === type);
                displayCourses(filtered);
            }
        });
        buttonsDiv.appendChild(btn);
    });

    certificateSection.appendChild(buttonsDiv);

    //  certioficate list
    const courseList = document.createElement("div");
    let total = 0;

    list.forEach(course => {
        const div = document.createElement("div");
        div.className = "course";
        div.textContent = `${course.subject} ${course.number} ${course.completed ? "✔" : ""}`;
        courseList.appendChild(div);

        //change color
        if (course.completed) {
            div.style.backgroundColor = "#534B52";
            div.style.color = "#fff";
        }
        else {
            div.style.backgroundColor = "#fff";
        }

        total += course.credits;
    });

    certificateSection.appendChild(courseList);

    //credits total
    const credits = document.createElement("p");
    credits.textContent = `The total credits for courses listed above is ${total}.`;
    certificateSection.appendChild(credits);
};

displayCourses(courses);
