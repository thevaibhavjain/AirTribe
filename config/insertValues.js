
function insertIntoInstructor(con,InstructorID,name,email,password){
    var query=`INSERT INTO Instructors VALUES (${InstructorID},"${name}","${email}","${password}");`
      con.query(query,(err, result) => {
      if (err) throw err;
      console.log('Course inserted:', result);
  });
}

function insertIntoCourses(con,CourseID,InstructorID,title,StartDate,EndDate,max_seats){
    var query=`INSERT INTO Courses VALUES (${CourseID},${InstructorID},"${title}","${StartDate}","${EndDate}",${max_seats});`
      con.query(query,(err, result) => {
      if (err) throw err;
      console.log('Course inserted:', result);
  });
}

function insertIntoLeads(con,LeadID,CourseID,name,email,phone,status){
    var query=`INSERT INTO Leads VALUES (${LeadID},${CourseID},"${name}","${email}","${phone}","${status}");`
    con.query(query,(err, result) => {
      if (err) throw err;
      console.log('Course inserted:', result);
    });
}

function insertIntoComment(con,CommentID,LeadID,InstructorID,comment,CommentDate){
    var query=`INSERT INTO Comments VALUES (${CommentID},${LeadID},${InstructorID},"${comment}","${CommentDate}");`
    con.query(query,(err, result) => {
      if (err) throw err;
      console.log('Comment inserted:', result);
    });
}


module.exports ={insertIntoInstructor,insertIntoCourses,insertIntoLeads,insertIntoComment};