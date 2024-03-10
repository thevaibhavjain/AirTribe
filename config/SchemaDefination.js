//Schema Defination

function createInstructor(){
    var query=`CREATE TABLE IF NOT EXISTS Instructors (
    InstructorID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) UNIQUE NOT NULL);`
    return query;
}


function createCourses(){
 var query=`CREATE TABLE IF NOT EXISTS Courses (
    CourseID INT AUTO_INCREMENT PRIMARY KEY,
    InstructorID INT,
    Title VARCHAR(255) NOT NULL,
    StartDate DATE,
    EndDate DATE,
    max_seats INT,
    FOREIGN KEY (InstructorID) REFERENCES Instructors(InstructorID)
);`
return query;
}

function createLeads(){
 var query=`CREATE TABLE IF NOT EXISTS Leads (
    LeadID INT AUTO_INCREMENT PRIMARY KEY,
    CourseID INT,
    FullName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Phone VARCHAR(20),
    Status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);`
return query;
}

function createComment(){
var query=`CREATE TABLE IF NOT EXISTS Comments (
    CommentID INT AUTO_INCREMENT PRIMARY KEY,
    LeadID INT,
    InstructorID INT,
    Comment TEXT NOT NULL,
    CommentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (LeadID) REFERENCES Leads(LeadID),
    FOREIGN KEY (InstructorID) REFERENCES Instructors(InstructorID)
);`
return query;
}
module.exports = {createInstructor,createCourses,createLeads,createComment};
