package edu.devpath;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
public class CourseController {
    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of("status", "UP", "application", "DevPath Backend");
    }

    @GetMapping("/api/courses")
    public List<Map<String, String>> courses() {
        return List.of(
            Map.of("id", "C101", "title", "C Programming Basics", "level", "Beginner"),
            Map.of("id", "J201", "title", "Java and Object-Oriented Programming", "level", "Beginner"),
            Map.of("id", "P301", "title", "Python Programming", "level", "Beginner"),
            Map.of("id", "DS401", "title", "Data Structures and Algorithms", "level", "Intermediate"),
            Map.of("id", "INT501", "title", "Technical Interview Preparation", "level", "Intermediate")
        );
    }

    @GetMapping("/api/placement/topics")
    public List<String> placementTopics() {
        return List.of("Aptitude", "Data Structures", "Algorithms",
                       "Object-Oriented Programming", "DBMS", "Operating Systems",
                       "Computer Networks", "HR Interview");
    }
}
