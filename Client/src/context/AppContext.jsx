import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [allCourses, setAllCourses] = useState([]);

  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const navigate = useNavigate();

  // fetch user enrolled courses
  const fetchUserEnrolledCourses = async () => {
    
  };

  // Fetch All Courese
  const fetchAllCourse = async () => {
    setAllCourses(dummyCourses);
  };

  // function to calculate course chapter time;
  const calculateChapterTime = (course) => {
    let totalChapterTime = 0;
    course.chapterContent.map(
      (lecture) => (totalChapterTime += lecture.lectureDuration)
    );
    return humanizeDuration(totalChapterTime * 60 * 1000, {
      units: ["h", "m"],
    });
  };

  // function to calculate courseDuration
  const calculateCourseDuration = (course) => {
    let totalCourseDuration = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map(
        (lecture) => (totalCourseDuration += lecture.lectureDuration)
      )
    );
    return humanizeDuration(totalCourseDuration * 60 * 1000, {
      units: ["h", "m"],
    });
  };

  // function to calcuate total no. of lecture in this course
  const calculateTotalLecture = (course) => {
    let totalLecture = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLecture += chapter.chapterContent.length;
      }
    });
    return totalLecture;
  };

  // function to calculate avarage rating for courses
  const calculatingRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }

    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  useEffect(() => {
    fetchAllCourse();
  }, []);
  const value = {
    allCourses,
    navigate,
    calculatingRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateTotalLecture,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
