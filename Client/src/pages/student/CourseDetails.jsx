import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import { assets } from "../../assets/assets";

function CourseDetails() {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);

  const {
    allCourses,
    calculatingRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateTotalLecture,
  } = useContext(AppContext);

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

        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="md:text-3xl text-xl font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          {/* review and rating */}

          <div className="flex items-center space-x-2 pt-3 pb-1  text-sm">
            <p>{calculatingRating(courseData)}</p>

            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(calculatingRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="starr"
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>
            <p className="text-blue-600">
              ( {courseData.courseRatings.length} {"rating"})
            </p>

            <p>
              {courseData?.enrolledStudents?.length} {"students"}
            </p>
          </div>

          <p className="text-sm">
            Course By{" "}
            <span className="text-blue-600 underline">{"GreatStack"}</span>
          </p>
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
