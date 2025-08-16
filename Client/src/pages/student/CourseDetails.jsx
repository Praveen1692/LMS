import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";

function CourseDetails() {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);

  const { allCourses } = useContext(AppContext);

  const fetchCourseData = async () => {
    const course = await allCourses.find((course) => course._id === id);
    console.log("Seelcted Course", course);

    setCourseData(course);
  };

  useEffect(() => {
    fetchCourseData();
    console.log("Course Details", courseData);
    console.log("All COurses", allCourses);
  }, [id]);

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start bg-gradient-to-b from-cyan-100/70  justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
        <div className="absolute top-0 left-0 w-full h-full -z-10"></div>
        {/* Left Column */}

        <div>
          <h1>{courseData.courseTitle}</h1>
          <p>{courseData.courseDescription}</p>
        </div>

        {/* Right Column */}

        <div></div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default CourseDetails;
