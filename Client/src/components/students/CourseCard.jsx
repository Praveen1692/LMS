import React from "react";
import { assets } from "../../assets/assets";

function CourseCard({ course }) {
  console.log("Courses", course);

  return (
    <div>
      <img src={course.courseThumbnail} alt="Thumbnail" />
      <div>
        <h3>{course.courseTitle}</h3>
        <p>{course.educator.name}</p>

        <div>
          <p>4.5</p>
          <div>
            {[...Array(5)].map((_, i) => (
              <img key={i} src={assets.star} alt="Rating" />
            ))}
          </div>
          <p>22</p>
        </div>
        <p>
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default CourseCard;
