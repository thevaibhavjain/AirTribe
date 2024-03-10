require('dotenv').config();
var express= require('express');
var bodyParser= require('body-parser');
var createTables=require('./config/createConnection');
var insertTables=require('./config/insertValues');
var cors= require('cors');
var con=require('./config/db');

var app= express();
createTables();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("server is running");
})
//...................................................................................

//create instructors.......................................................

app.post('/api/create_instructor', async (req, res) => {
    try {
        const { instructorId,name, email, password } = req.body;
        
        // Assuming `insertIntoInstructor` returns the `result` object
        await insertTables.insertIntoInstructor(con,instructorId,name, email, password);
        
        res.status(201).json({ message: 'Instructor created successfully' });
    } catch (error) {
        console.error('Error creating instructor:', error);
        res.status(500).json({ error: 'Failed to create instructor' });
    }
});

//..........................................create courses api.......................

app.post('/api/create_courses', async (req, res) => {
  try {
    const { courseId,instructorId, name, startDate, endDate, maxSeats } = req.body;

    await insertTables.insertIntoCourses(con, courseId,instructorId, name, startDate, endDate, maxSeats);

    res.status(201).json({ message: 'Course created successfully' });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
});
//...........................................................................................

//....................................update course api......................................

app.put('/api/courses/:id', (req, res) => {
  const courseId = req.params.id;
  const { name, maxSeats, startDate, endDate } = req.body;

  // MySQL query to update course details
  const query = `UPDATE Courses SET Title = ?, max_seats = ?, StartDate = ?, EndDate = ? WHERE CourseId = ?`;
  const values = [name, maxSeats, startDate, endDate, courseId];

  con.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating course details:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    res.status(200).json({ message: 'Course details updated successfully' });
  });
});

//......................................................................................

//...............................course-registration api.................................

app.post('/api/course-registration', async (req, res) => {
  try {
    const { leadId, courseId, learnerName, email, phoneNumber } = req.body;
    // Assuming `insertIntoLeads` returns the `result` object
     await insertTables.insertIntoLeads(con, leadId, courseId, learnerName, email, phoneNumber,"Pending");
    res.status(201).json({ message: 'Course registration submitted successfully' });
  } catch (error) {
    console.error('Error registering for course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//.......................................................................................  

//............................leads status update api....................................

app.put('/api/leads/:id', async (req, res) => {
  try {
    const leadId = req.params.id;
    const { status } = req.body;

    const query = `UPDATE Leads SET status = ? WHERE LeadId = ?`;
    const values = [status, leadId];

    con.query(query, values, (err, result) => {
      if (err) {
        console.error('Error updating lead status:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Lead not found' });
        return;
      }

      res.status(200).json({ message: 'Lead status updated successfully' });
    });
  } catch (error) {
    console.error('Error updating lead status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//................................................................................

//.............................leads search api...................................

app.get('/api/leads', async (req, res) => {
  try {
    const { name, email } = req.query;

    con.query("SELECT * FROM  Leads WHERE FullName = ? or Email = ?", [name, email], function (err, result, fields) {
      if (err) {
        console.error('Error searching leads:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
     // console.log(result);
      res.send(result);
    });
  } catch (error) {
    console.error('Error searching leads:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//........................put comments api........................................

app.post('/api/comments', async (req, res) => {
  try {
    const { commentId,leadId, instructorId, comment, commentDate } = req.body;

    insertTables.insertIntoComment(con,commentId,leadId, instructorId, comment, commentDate);
    res.status(201).json({message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});



