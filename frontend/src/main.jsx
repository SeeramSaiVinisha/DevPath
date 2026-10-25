import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity, ArrowRight, Award, BookOpen, BrainCircuit, BriefcaseBusiness,
  CheckCircle2, ChevronRight, CircleHelp, Code2, GraduationCap, LayoutDashboard,
  Menu, PlayCircle, Search, Target, TerminalSquare, Trophy, X, Zap
} from 'lucide-react';
import './style.css';

const API_BACKEND = '';
const API_QUIZ = '/quiz-api';

const fallbackCourses = [
  { id: 'C101', title: 'C Programming Basics', level: 'Beginner' },
  { id: 'J201', title: 'Java and Object-Oriented Programming', level: 'Beginner' },
  { id: 'P301', title: 'Python Programming', level: 'Beginner' },
  { id: 'DS401', title: 'Data Structures and Algorithms', level: 'Intermediate' },
  { id: 'INT501', title: 'Technical Interview Preparation', level: 'Intermediate' }
];

const fallbackQuestions = [
  { id: 1, topic: 'Java', question: 'Which keyword is used to inherit a class in Java?', options: ['implements', 'extends', 'inherits', 'instanceof'] },
  { id: 2, topic: 'Data Structures', question: 'Which data structure follows FIFO?', options: ['Stack', 'Queue', 'Tree', 'Graph'] },
  { id: 3, topic: 'DevOps', question: 'Which tool automates CI/CD pipelines in this project?', options: ['Jenkins', 'Notepad', 'Paint', 'Calculator'] }
];

const practiceQuestionBank = [
  { id: 101, course: "C Programming", topic: "C Programming", question: "Which function is the entry point of a C program?", options: ["main()", "start()", "printf()", "run()"], answer: "main()", explanation: "Execution of a standard C program begins in main()." },
  { id: 102, course: "C Programming", topic: "C Programming", question: "Which format specifier is used for an int in printf?", options: ["%f", "%d", "%c", "%s"], answer: "%d", explanation: "%d prints an integer; %f is commonly used for floating-point values." },
  { id: 103, course: "C Programming", topic: "C Programming", question: "Which operator gets the address of a variable?", options: ["*", "&", "%", "#"], answer: "&", explanation: "The address-of operator & returns a variable’s memory address." },
  { id: 104, course: "C Programming", topic: "C Programming", question: "Which loop is best when the number of repetitions is known?", options: ["for", "if", "switch", "goto"], answer: "for", explanation: "A for loop keeps initialization, condition, and update together." },
  { id: 105, course: "C Programming", topic: "C Programming", question: "Array indexing in C starts at which number?", options: ["0", "1", "-1", "Depends on size"], answer: "0", explanation: "The first element is at index 0, so an array of 5 items uses indexes 0 through 4." },
  { id: 106, course: "C Programming", topic: "C Programming", question: "Which keyword sends a value back from a function?", options: ["break", "return", "continue", "case"], answer: "return", explanation: "return ends the function and can provide a value to the caller." },
  { id: 107, course: "C Programming", topic: "C Programming", question: "What does == do in C?", options: ["Assigns a value", "Compares equality", "Adds values", "Declares a variable"], answer: "Compares equality", explanation: "== compares two values; a single = assigns a value." },
  { id: 108, course: "C Programming", topic: "C Programming", question: "Which header declares printf?", options: ["stdlib.h", "string.h", "stdio.h", "math.h"], answer: "stdio.h", explanation: "printf and scanf are declared in the standard input/output header stdio.h." },
  { id: 109, course: "C Programming", topic: "C Programming", question: "What does a pointer store?", options: ["A memory address", "Only a decimal number", "A loop", "A file name"], answer: "A memory address", explanation: "A pointer holds the address of an object or function." },
  { id: 110, course: "C Programming", topic: "C Programming", question: "Which keyword defines a structure?", options: ["class", "struct", "object", "record"], answer: "struct", explanation: "C uses struct to group related fields under one type." },
  { id: 111, course: "Java", topic: "Java", question: "Which keyword inherits a class in Java?", options: ["implements", "extends", "inherits", "instanceof"], answer: "extends", explanation: "extends defines class inheritance; implements is used for interfaces." },
  { id: 112, course: "Java", topic: "Java", question: "Which method is the usual Java application entry point?", options: ["start()", "main()", "runApp()", "init()"], answer: "main()", explanation: "The JVM looks for public static void main(String[] args) to start a basic application." },
  { id: 113, course: "Java", topic: "Java", question: "Which type stores true or false?", options: ["int", "boolean", "char", "double"], answer: "boolean", explanation: "boolean has two values: true and false." },
  { id: 114, course: "Java", topic: "Java", question: "Which keyword creates an object?", options: ["class", "new", "this", "static"], answer: "new", explanation: "new allocates and constructs an object." },
  { id: 115, course: "Java", topic: "Java", question: "What is a class?", options: ["A blueprint for objects", "A loop", "A package manager", "A primitive value"], answer: "A blueprint for objects", explanation: "A class defines the fields and methods that its objects can have." },
  { id: 116, course: "Java", topic: "Java", question: "Which access modifier allows access from anywhere, subject to class visibility?", options: ["private", "public", "protected only", "local"], answer: "public", explanation: "public members can be accessed from other classes where the containing type is accessible." },
  { id: 117, course: "Java", topic: "Java", question: "Which collection stores unique elements?", options: ["ArrayList", "HashSet", "Array", "StringBuilder"], answer: "HashSet", explanation: "A HashSet stores unique elements and does not preserve insertion order by default." },
  { id: 118, course: "Java", topic: "Java", question: "Which keyword prevents a class from being subclassed?", options: ["static", "final", "super", "void"], answer: "final", explanation: "A final class cannot be extended." },
  { id: 119, course: "Java", topic: "Java", question: "What does method overloading mean?", options: ["Same method name with different parameter lists", "Deleting a method", "Changing package name", "Calling a method twice"], answer: "Same method name with different parameter lists", explanation: "Overloaded methods share a name but differ in their parameter lists." },
  { id: 120, course: "Java", topic: "Java", question: "Which block handles an exception?", options: ["try-catch", "if-else only", "for-next", "class-object"], answer: "try-catch", explanation: "A catch block handles a matching exception thrown from the associated try block." },
  { id: 121, course: "Python", topic: "Python", question: "Which function displays output in Python?", options: ["echo()", "print()", "printf()", "writeLine()"], answer: "print()", explanation: "print() writes values to the output stream." },
  { id: 122, course: "Python", topic: "Python", question: "What is the first index of a Python list?", options: ["0", "1", "-1 only", "10"], answer: "0", explanation: "Python sequences use zero-based indexing." },
  { id: 123, course: "Python", topic: "Python", question: "Which symbol begins a single-line comment?", options: ["//", "#", "<!--", "**"], answer: "#", explanation: "Python comments begin with #." },
  { id: 124, course: "Python", topic: "Python", question: "Which type stores key-value pairs?", options: ["list", "tuple", "dict", "set"], answer: "dict", explanation: "A dictionary maps keys to values." },
  { id: 125, course: "Python", topic: "Python", question: "What does len([4, 7, 9]) return?", options: ["2", "3", "4", "9"], answer: "3", explanation: "The list contains three elements, so len returns 3." },
  { id: 126, course: "Python", topic: "Python", question: "Which keyword defines a function?", options: ["func", "define", "def", "function"], answer: "def", explanation: "Python function definitions begin with def." },
  { id: 127, course: "Python", topic: "Python", question: "What values does range(3) produce?", options: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "3 only"], answer: "0, 1, 2", explanation: "The stop value is excluded, so range(3) produces 0, 1, and 2." },
  { id: 128, course: "Python", topic: "Python", question: "Which collection is immutable?", options: ["list", "dict", "set", "tuple"], answer: "tuple", explanation: "A tuple cannot be changed after it is created." },
  { id: 129, course: "Python", topic: "Python", question: "Which keyword starts a conditional branch?", options: ["when", "if", "select", "check"], answer: "if", explanation: "if evaluates a condition and runs its block when the condition is true." },
  { id: 130, course: "Python", topic: "Python", question: "How do you import the math module?", options: ["include math", "using math", "import math", "require(math)"], answer: "import math", explanation: "Python uses the import statement to load a module." },
  { id: 131, course: "Data Structures & Algorithms", topic: "Data Structures & Algorithms", question: "Which data structure follows FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Queue", explanation: "FIFO means first in, first out, which is the queue rule." },
  { id: 132, course: "Data Structures & Algorithms", topic: "Data Structures & Algorithms", question: "Which data structure follows LIFO?", options: ["Queue", "Stack", "Graph", "Array only"], answer: "Stack", explanation: "LIFO means last in, first out." },
  { id: 133, course: "Data Structures & Algorithms", topic: "Data Structures & Algorithms", question: "What is the typical time complexity of accessing an array element by index?", options: ["O(1)", "O(n)", "O(n²)", "O(log n)"], answer: "O(1)", explanation: "Direct index access takes constant time for a typical array." },
  { id: 134, course: "Data Structures & Algorithms", topic: "Data Structures & Algorithms", question: "Which traversal visits left subtree, root, then right subtree?", options: ["Preorder", "Inorder", "Postorder", "Level order"], answer: "Inorder", explanation: "Inorder traversal follows left, root, right." },
  { id: 135, course: "Data Structures & Algorithms", topic: "Data Structures & Algorithms", question: "Which algorithm repeatedly splits a sorted search range in half?", options: ["Linear search", "Binary search", "Bubble sort", "DFS"], answer: "Binary search", explanation: "Binary search halves the remaining sorted search interval each step." },
  { id: 136, course: "Data Structures & Algorithms", topic: "Data Structures & Algorithms", question: "Which structure is commonly used for function-call tracking?", options: ["Stack", "Queue", "Graph", "Hash set"], answer: "Stack", explanation: "Function calls and return locations are managed using a call stack." },
  { id: 137, course: "Data Structures & Algorithms", topic: "Data Structures & Algorithms", question: "In a singly linked list, each node normally stores data and what?", options: ["Next pointer", "Two array indexes", "Only a priority", "A matrix"], answer: "Next pointer", explanation: "The next pointer links a node to the following node." },
  { id: 138, course: "Data Structures & Algorithms", topic: "Data Structures & Algorithms", question: "Which sorting algorithm repeatedly swaps adjacent out-of-order values?", options: ["Merge sort", "Bubble sort", "Quick sort only", "Binary search"], answer: "Bubble sort", explanation: "Bubble sort compares adjacent values and swaps them when they are out of order." },
  { id: 139, course: "Data Structures & Algorithms", topic: "Data Structures & Algorithms", question: "A tree with each node having at most two children is called what?", options: ["Binary tree", "Queue tree", "Hash tree always", "Linear tree"], answer: "Binary tree", explanation: "A binary tree limits each node to at most two children." },
  { id: 140, course: "Data Structures & Algorithms", topic: "Data Structures & Algorithms", question: "What does Big-O describe?", options: ["Growth of resource use", "Variable type", "Program author", "Only exact runtime in seconds"], answer: "Growth of resource use", explanation: "Big-O describes how time or space requirements grow as input size increases." },
  { id: 141, course: "Technical Interview & DevOps", topic: "Technical Interview & DevOps", question: "Which tool automates CI/CD pipelines in this project?", options: ["Jenkins", "Notepad", "Paint", "Calculator"], answer: "Jenkins", explanation: "Jenkins automates build, test, and deployment workflows." },
  { id: 142, course: "Technical Interview & DevOps", topic: "Technical Interview & DevOps", question: "What is the main purpose of Git?", options: ["Version control", "Image editing", "Database hosting only", "CPU scheduling"], answer: "Version control", explanation: "Git records changes to files and helps teams collaborate on code." },
  { id: 143, course: "Technical Interview & DevOps", topic: "Technical Interview & DevOps", question: "What does API stand for?", options: ["Application Programming Interface", "Applied Program Internet", "Automated Process Index", "Application Private Input"], answer: "Application Programming Interface", explanation: "An API defines how software components communicate." },
  { id: 144, course: "Technical Interview & DevOps", topic: "Technical Interview & DevOps", question: "Which HTTP method is commonly used to retrieve data?", options: ["GET", "POST", "PATCH", "DELETE"], answer: "GET", explanation: "GET requests a representation of a resource." },
  { id: 145, course: "Technical Interview & DevOps", topic: "Technical Interview & DevOps", question: "What is Docker mainly used for?", options: ["Packaging apps in containers", "Writing SQL only", "Designing slides", "Replacing all testing"], answer: "Packaging apps in containers", explanation: "Docker packages an application and its dependencies into a container image." },
  { id: 146, course: "Technical Interview & DevOps", topic: "Technical Interview & DevOps", question: "Which SQL command retrieves rows?", options: ["SELECT", "DROP", "UPDATE", "DELETE"], answer: "SELECT", explanation: "SELECT queries data from tables or other queryable sources." },
  { id: 147, course: "Technical Interview & DevOps", topic: "Technical Interview & DevOps", question: "What does DNS do?", options: ["Resolves domain names", "Encrypts every file", "Compiles Java", "Schedules CPU tasks"], answer: "Resolves domain names", explanation: "DNS maps domain names to records such as IP addresses." },
  { id: 148, course: "Technical Interview & DevOps", topic: "Technical Interview & DevOps", question: "Which protocol provides reliable, ordered transport?", options: ["UDP", "TCP", "ARP", "ICMP only"], answer: "TCP", explanation: "TCP provides reliable, ordered byte-stream delivery." },
  { id: 149, course: "Technical Interview & DevOps", topic: "Technical Interview & DevOps", question: "What should a good project explanation include?", options: ["Your role and contribution", "Only the logo", "Features you did not build", "Unrelated stories"], answer: "Your role and contribution", explanation: "Interviewers need a truthful account of the problem, your work, decisions, and outcome." },
  { id: 150, course: "Technical Interview & DevOps", topic: "Technical Interview & DevOps", question: "What does STAR stand for in behavioral interviews?", options: ["Situation, Task, Action, Result", "Study, Test, Answer, Repeat", "System, Tool, App, Runtime", "Start, Think, Apply, Review"], answer: "Situation, Task, Action, Result", explanation: "STAR helps structure a behavioral example into situation, task, action, and result." }
];

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'courses', label: 'My learning', icon: BookOpen },
  { id: 'practice', label: 'Coding practice', icon: Code2 },
  { id: 'placement', label: 'Placement prep', icon: BriefcaseBusiness },
  { id: 'profile', label: 'Student profile', icon: Activity }
];

function App() {
  const [page, setPage] = useState('overview');
  const [student, setStudent] = useState(() => {
    try { return JSON.parse(localStorage.getItem('devpath-student') || 'null'); } catch { return null; }
  });
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [courses, setCourses] = useState(fallbackCourses);
  const [questions, setQuestions] = useState(fallbackQuestions);
  const [courseStatus, setCourseStatus] = useState(() => {
    try { return JSON.parse(localStorage.getItem('devpath-course-status') || '{}'); } catch { return {}; }
  });
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState(() => {
    try { return JSON.parse(localStorage.getItem('devpath-quiz-results') || '{}'); } catch { return {}; }
  });
  const [notice, setNotice] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const [activeCourse, setActiveCourse] = useState(null);

  useEffect(() => {
    let active = true;
    async function loadData() {
      const [courseResult, questionResult] = await Promise.allSettled([
        fetch(`${API_BACKEND}/api/courses`).then(r => {
          if (!r.ok) throw new Error('Course API unavailable');
          return r.json();
        }),
        fetch(`${API_QUIZ}/api/questions`).then(r => {
          if (!r.ok) throw new Error('Quiz API unavailable');
          return r.json();
        })
      ]);
      if (!active) return;
      if (courseResult.status === 'fulfilled') setCourses(courseResult.value);
      if (questionResult.status === 'fulfilled') setQuestions(questionResult.value);
      setLoading(false);
    }
    loadData();
    return () => { active = false; };
  }, []);

  useEffect(() => { localStorage.setItem('devpath-course-status', JSON.stringify(courseStatus)); }, [courseStatus]);
  useEffect(() => { localStorage.setItem('devpath-student', JSON.stringify(student)); }, [student]);
  useEffect(() => { localStorage.setItem('devpath-quiz-results', JSON.stringify(results)); }, [results]);
  const completedCount = Object.values(courseStatus).filter(Boolean).length;
  const answeredCount = Object.keys(results).length;
  const filteredCourses = courses.filter(c =>
    `${c.title} ${c.level}`.toLowerCase().includes(search.toLowerCase())
  );

  async function submitAnswer(question) {
    const answer = selectedAnswers[question.id];
    if (!answer) {
      setNotice('Choose an option before submitting your answer.');
      return;
    }
    const correct = answer === question.answer;
    const result = { questionId: question.id, correct, explanation: question.explanation, correctAnswer: question.answer };
    setResults(old => ({ ...old, [question.id]: result }));
    setNotice(correct ? 'Correct answer! Keep going.' : `Not quite. Correct answer: ${question.answer}. Read the explanation below.`);
  }

  function startLearning(course) {
    setPage('courses');
    setActiveCourse({ ...course });
    setNotice('');
    setMobileNav(false);
  }

  function closeCourse() {
    setActiveCourse(null);
  }

  if (!student) return <div className="login-screen"><form className="login-card" onSubmit={e => { e.preventDefault(); const profile = { name: loginName.trim(), email: loginEmail.trim(), joinedAt: new Date().toISOString() }; setStudent(profile); setNotice('Welcome to DevPath! Your learning workspace is ready.'); }}><div className="login-brand"><div className="brand-mark"><TerminalSquare size={24}/></div><div><strong>DevPath</strong><span>LEARN · PRACTICE · GROW</span></div></div><div className="eyebrow">YOUR LEARNING JOURNEY</div><h1>Build skills. Track progress.</h1><p>Sign in to keep your courses, practice results, and learning activity together.</p><label>Your name<input required minLength="2" value={loginName} onChange={e=>setLoginName(e.target.value)} placeholder="e.g. Sai Vinisha"/></label><label>Email address<input required type="email" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} placeholder="you@example.com"/></label><button className="primary-btn login-submit" type="submit">Enter my workspace <ArrowRight size={16}/></button><small>Demo sign-in for this project. No password is collected.</small></form></div>;

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><TerminalSquare size={22} /></div>
          <div><strong>DevPath</strong><span>LEARN · PRACTICE · GROW</span></div>
          <button className="icon-btn mobile-close" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={18}/></button>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav>
          {navItems.map(item => {
            const Icon = item.icon;
            return <button key={item.id} className={`nav-item ${page === item.id ? 'active' : ''}`} onClick={() => { setPage(item.id); if (item.id === 'courses') setActiveCourse(null); setMobileNav(false); setNotice(''); }}>
              <Icon size={18}/><span>{item.label}</span>{page === item.id && <ChevronRight size={16} className="nav-chevron"/>}
            </button>;
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="goal-card">
            <div className="goal-icon"><Target size={18}/></div>
            <strong>Your goal</strong>
            <p>Build skills. Get placement-ready.</p>
            <div className="goal-track"><span style={{width: `${Math.min(100, completedCount * 20)}%`}} /></div>
            <small>{completedCount} of 5 courses marked complete</small>
          </div>
          <div className="profile">
            <div className="avatar">{student.name.slice(0,1).toUpperCase()}</div>
            <div><strong>{student.name}</strong><span>Student workspace</span></div>
            <span className="online-dot" />
          </div>
        </div>
      </aside>

      {mobileNav && <button className="mobile-scrim" onClick={() => setMobileNav(false)} aria-label="Close navigation"/>}

      <main className="main">
        <header className="topbar">
          <button className="icon-btn menu-toggle" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={21}/></button>
          <div className="breadcrumbs">Workspace <ChevronRight size={14}/> <strong>{navItems.find(n => n.id === page)?.label || 'Overview'}</strong></div>
          <div className="top-actions">
            <div className="api-status"><span className="status-dot"/>{loading ? 'Connecting to APIs' : 'Portal ready'}</div>
            <button className="avatar top-avatar profile-avatar-button" onClick={() => setPage("profile")} aria-label="Open student profile">{student.name.slice(0,1).toUpperCase()}</button>
          </div>
        </header>

        <div className="content">
          {notice && <div className="notice"><span>{notice}</span><button onClick={() => setNotice('')} aria-label="Dismiss"><X size={16}/></button></div>}
          {page === 'overview' && <Overview setPage={setPage} courses={courses} completedCount={completedCount} answeredCount={answeredCount} loading={loading}/>}
          {page === 'courses' && (activeCourse ? <CourseTrack course={activeCourse} onBack={closeCourse} onCourseCompleted={id => setCourseStatus(old => old[id] ? old : ({...old, [id]: true}))} /> : <Courses courses={filteredCourses} search={search} setSearch={setSearch} courseStatus={courseStatus} setCourseStatus={setCourseStatus} startLearning={startLearning}/>)}
          {page === 'practice' && <Practice questions={practiceQuestionBank} selectedAnswers={selectedAnswers} setSelectedAnswers={setSelectedAnswers} results={results} submitAnswer={submitAnswer}/>}
          {page === 'placement' && <Placement/>}
          {page === 'profile' && <StudentProfile student={student} setStudent={setStudent} courses={courses} completedCount={completedCount} answeredCount={answeredCount} courseStatus={courseStatus} results={results} setPage={setPage}/>}
          <footer>© 2026 DevPath <span>Built for learning, powered by DevOps.</span></footer>
        </div>
      </main>
    </div>
  );
}

function PageHeading({ eyebrow, title, description, action }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}

function Overview({ setPage, courses, completedCount, answeredCount, loading }) {
  return <>
    <PageHeading eyebrow="YOUR LEARNING WORKSPACE" title={<>Make progress, <span className="gradient-text">one step at a time.</span></>} description="Learn programming, practise your skills, and prepare for your next opportunity." action={<button className="primary-btn" onClick={() => setPage('courses')}>Explore courses <ArrowRight size={16}/></button>}/>
    <section className="hero">
      <div className="hero-glow glow-one"/><div className="hero-glow glow-two"/>
      <div className="hero-copy"><div className="hero-pill"><Zap size={13}/> YOUR CAREER JOURNEY STARTS HERE</div>
        <h2>Turn your learning<br/>into <span>real skills.</span></h2>
        <p>A focused path from programming fundamentals to interview confidence. Learn at your pace and keep your progress visible.</p>
        <button className="hero-btn" onClick={() => setPage('practice')}>Start practising <ArrowRight size={16}/></button>
      </div>
      <div className="hero-art" aria-hidden="true"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="code-window"><div className="window-bar"><i/><i/><i/><span>hello_world.java</span></div><div className="code-lines"><p><b>01</b> <span className="code-purple">public class</span> <span className="code-blue">DevPath</span> {'{'}</p><p><b>02</b> &nbsp;&nbsp;<span className="code-purple">public static void</span> main() {'{'}</p><p><b>03</b> &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(</p><p><b>04</b> &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-green">"Hello, future!"</span>);</p><p><b>05</b> &nbsp;&nbsp;{'}'}</p><p><b>06</b> {'}'}</p></div><div className="code-success"><CheckCircle2 size={14}/> Ready to build</div></div><div className="float-badge badge-java"><Code2 size={16}/> Java</div><div className="float-badge badge-score"><Trophy size={16}/> Skill building</div></div>
    </section>
    <div className="section-title"><div><h2>Your dashboard</h2><p>A quick view of your learning activity</p></div><span className="live-tag"><span/> {loading ? 'CONNECTING' : 'LIVE DATA'}</span></div>
    <div className="stats-grid">
      <Stat icon={<BookOpen/>} tone="blue" label="Available courses" value={courses.length} note="Across core skills"/>
      <Stat icon={<CheckCircle2/>} tone="green" label="Courses completed" value={completedCount} note="Keep your momentum"/>
      <Stat icon={<BrainCircuit/>} tone="purple" label="Quiz submissions" value={answeredCount} note="Practice makes progress"/>
      <Stat icon={<Target/>} tone="orange" label="Career readiness" value={`${Math.min(100, completedCount * 10 + answeredCount * 10)}%`} note="Starter progress score"/>
    </div>
    <div className="lower-grid">
      <section className="panel">
        <div className="panel-heading"><div><h3>Continue your journey</h3><p>Pick a skill and get moving</p></div><button className="text-btn" onClick={() => setPage('courses')}>All courses <ArrowRight size={14}/></button></div>
        {courses.slice(0, 3).map((course, i) => <div className="mini-course" key={course.id}><div className={`course-icon course-tone-${i}`}><Code2 size={19}/></div><div className="mini-course-info"><strong>{course.title}</strong><span>{course.level} · Learning track</span></div><button className="round-arrow" onClick={() => setPage('courses')} aria-label={`Open ${course.title}`}><ArrowRight size={16}/></button></div>)}
      </section>
      <section className="panel placement-panel"><div className="placement-icon"><GraduationCap size={23}/></div><div className="eyebrow">CAREER TOOLKIT</div><h3>Prepare for your next big step.</h3><p>Review technical topics, practise aptitude, and build interview confidence.</p><button className="secondary-btn" onClick={() => setPage('placement')}>Explore placement prep <ArrowRight size={15}/></button><div className="placement-decoration"><Award size={100}/></div></section>
    </div>
  </>;
}

function Stat({ icon, tone, label, value, note }) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-note">{note}</div></div>;
}

function Courses({ courses, search, setSearch, courseStatus, setCourseStatus, startLearning }) {
  return <>
    <PageHeading eyebrow="LEARNING LIBRARY" title="Build your skill stack." description="Explore structured tracks, from your first program to interview-ready problem solving."/>
    <div className="course-toolbar"><div className="search-box"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses or levels..." aria-label="Search courses"/></div><span>{courses.length} courses found</span></div>
    <div className="course-grid">{courses.map((course, i) => <article className="course-card" key={course.id}><div className={`course-card-art art-${i % 5}`}><div className="art-chip">{course.id}</div><div className="art-symbol">{i === 0 ? 'C' : i === 1 ? 'J' : i === 2 ? 'Py' : i === 3 ? 'DS' : '★'}</div><div className="art-orbit"/></div><div className="course-card-body"><div className="course-meta"><span>{course.level}</span><span>Self-paced</span></div><h3>{course.title}</h3><p>Build practical knowledge with focused topics and hands-on exercises.</p><div className="course-card-footer"><button className="secondary-btn small" onClick={() => startLearning(course)}><PlayCircle size={15}/> Open track</button><span className={`course-status-pill ${courseStatus[course.id] ? "is-complete" : ""}`}>{courseStatus[course.id] ? "✓ Completed" : "10 lessons"}</span></div></div></article>)}</div>
    {courses.length === 0 && <div className="empty-state"><Search size={28}/><h3>No courses found</h3><p>Try another course name or difficulty level.</p></div>}
  </>;
}

function Practice({ questions, selectedAnswers, setSelectedAnswers, results, submitAnswer }) {
  const [selectedCourse, setSelectedCourse] = useState('C Programming');
  const courseOptions = [...new Set(questions.map(q => q.course))];
  const visibleQuestions = questions.filter(q => q.course === selectedCourse);
  const correctCount = visibleQuestions.filter(q => results[q.id]?.correct).length;
  return <>
    <PageHeading eyebrow="CODING & KNOWLEDGE PRACTICE" title="Small questions. Strong foundations." description="Choose a course, answer 10 questions, and learn from every mistake."/>
    <div className="practice-course-picker panel">
      <label htmlFor="practice-course-select">Choose a course to practise</label>
      <select id="practice-course-select" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
        {courseOptions.map(course => <option key={course} value={course}>{course}</option>)}
      </select>
      <div className="practice-progress"><span>{visibleQuestions.length} questions</span><span>{correctCount} correct</span></div>
    </div>
    <div className="practice-intro"><div className="practice-intro-icon"><BrainCircuit size={25}/></div><div><strong>{selectedCourse} knowledge check</strong><p>Submit each answer to see whether it is correct. Wrong answers include the correct answer and an explanation.</p></div><span>{visibleQuestions.length} questions</span></div>
    <div className="question-list">{visibleQuestions.map((q, index) => <article className="question-card" key={q.id}><div className="question-top"><span className="question-number">QUESTION {String(index + 1).padStart(2, '0')} / 10</span><span className="topic-tag">{q.topic}</span></div><h3>{q.question}</h3><div className="options-grid">{q.options.map((option, optionIndex) => <label key={option} className={`answer-option ${selectedAnswers[q.id] === option ? 'selected' : ''} ${results[q.id] && option === q.answer ? 'answer-correct' : ''} ${results[q.id] && selectedAnswers[q.id] === option && !results[q.id].correct ? 'answer-wrong' : ''}`}><input type="radio" name={`question-${q.id}`} value={option} checked={selectedAnswers[q.id] === option} onChange={() => setSelectedAnswers(old => ({...old, [q.id]: option}))}/><span className="option-letter">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span></label>)}</div><div className="question-footer"><span>{results[q.id] ? <span className={results[q.id].correct ? 'result-correct' : 'result-wrong'}>{results[q.id].correct ? '✓ Correct!' : `✗ Incorrect. Correct answer: ${q.answer}.`} <br/>{q.explanation}</span> : 'Choose the best answer.'}</span><button className="primary-btn small" onClick={() => submitAnswer(q)}>{results[q.id] ? 'Check again' : 'Submit answer'} <ArrowRight size={14}/></button></div></article>)}</div>
  </>;
}


const courseLessons = {
  C101: [
    { title: 'What is C?', body: 'C is a general-purpose programming language. A C program is commonly compiled before it runs.', code: '#include <stdio.h>\nint main(void) {\n    printf("Hello, world!");\n    return 0;\n}', task: 'Which function is the usual starting point of a C program?', options: ['start()', 'main()', 'run()', 'printf()'], answer: 'main()' },
    { title: 'Variables and data types', body: 'Variables store values. Common C types include int for whole numbers, float for decimal numbers, and char for a character.', code: 'int age = 18;\nfloat marks = 92.5f;\nchar grade = \'A\';', task: 'Which type stores a whole number?', options: ['int', 'char', 'float', 'void'], answer: 'int' },
    { title: 'Conditions and loops', body: 'if/else chooses a path. Loops repeat a block while a condition or range says to continue.', code: 'for (int i = 1; i <= 3; i++) {\n    printf("%d ", i);\n}', task: 'How many times does this loop run?', options: ['2', '3', '4', 'Forever'], answer: '3' }
  ],
  J201: [
    { title: 'Java basics', body: 'Java programs are organized into classes. The main method is the entry point for a simple application.', code: 'class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello");\n  }\n}', task: 'Which keyword defines a class?', options: ['class', 'define', 'struct', 'object'], answer: 'class' },
    { title: 'Objects and classes', body: 'A class is a blueprint. An object is an instance of a class with state and behavior.', code: 'class Dog { String name; }\nDog pet = new Dog();\npet.name = "Milo";', task: 'An object is an instance of what?', options: ['A loop', 'A class', 'A package', 'A method only'], answer: 'A class' },
    { title: 'Inheritance', body: 'Inheritance lets a subclass reuse and extend accessible members of a parent class.', code: 'class Animal { void eat() {} }\nclass Dog extends Animal { }', task: 'Which keyword is used for class inheritance in Java?', options: ['implements', 'extends', 'inherits', 'superclass'], answer: 'extends' }
  ],
  P301: [
    { title: 'Python basics', body: 'Python is a high-level language with readable syntax. Indentation defines blocks of code.', code: 'name = "DevPath"\nprint("Hello", name)', task: 'Which function displays output?', options: ['echo()', 'print()', 'writeLine()', 'displayText()'], answer: 'print()' },
    { title: 'Variables and collections', body: 'Names refer to values. Lists keep ordered items and can be changed after creation.', code: 'scores = [80, 92, 75]\nprint(scores[0])', task: 'What is the first index in a Python list?', options: ['0', '1', '-1 only', '10'], answer: '0' },
    { title: 'Conditions and loops', body: 'if/elif/else selects logic. for loops can iterate through sequences such as lists and ranges.', code: 'for n in range(3):\n    print(n)', task: 'What values does range(3) produce?', options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '3 only'], answer: '0, 1, 2' }
  ],
  DS401: [
    { title: 'Arrays and complexity', body: 'Arrays store indexed elements. Accessing an element by index is typically O(1); searching an unsorted array takes O(n).', code: 'int values[3] = {4, 7, 9};\nprintf("%d", values[1]);', task: 'What is the usual time complexity of accessing an array element by index?', options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], answer: 'O(1)' },
    { title: 'Stacks and queues', body: 'A stack follows LIFO (last in, first out). A queue follows FIFO (first in, first out).', code: 'Stack: push(10), push(20), pop() -> 20', task: 'Which structure follows FIFO?', options: ['Stack', 'Queue', 'Tree', 'Heap'], answer: 'Queue' },
    { title: 'Trees and searching', body: 'A binary search tree places smaller values on the left and larger values on the right, assuming a consistent ordering.', code: '        8\n       / \\\n      3  10', task: 'In a binary search tree, smaller values are generally placed where?', options: ['Right subtree', 'Left subtree', 'At every leaf only', 'Nowhere'], answer: 'Left subtree' }
  ],
  INT501: [
    { title: 'Explain your project', body: 'Use a simple structure: problem, your role, technologies, one challenge, and the result. Be accurate about what you personally implemented.', code: 'Problem → Role → Approach → Challenge → Result', task: 'Which detail is most important when describing your role?', options: ['What you personally did', 'Only the project title', 'Unrelated hobbies', 'A guessed metric'], answer: 'What you personally did' },
    { title: 'Core technical revision', body: 'Prepare concise explanations of data structures, OOP, DBMS, operating systems, and networks. Give an example after each definition.', code: 'Definition → Why it matters → Example', task: 'A strong technical answer should usually include:', options: ['Only a memorized phrase', 'Definition and example', 'A very long unrelated story', 'No explanation'], answer: 'Definition and example' },
    { title: 'Behavioral questions', body: 'Use STAR: Situation, Task, Action, Result. Keep the example specific and explain your own contribution.', code: 'S: Situation | T: Task | A: Action | R: Result', task: 'What does the A in STAR stand for?', options: ['Answer', 'Action', 'Aim', 'Ability'], answer: 'Action' }
  ]
};


const lessonPlans = {
  C101: [
    ["Program structure", "A C program usually includes header files, a main function, statements, and a return value. The compiler translates source code into an executable.", "#include <stdio.h>\nint main(void) {\n    printf(\"Hello\");\n    return 0;\n}", "What is the usual entry point of a C program?", ["main()", "printf()", "include()", "start()"], "main()"],
    ["Input and output", "printf displays formatted output. scanf reads input and uses the address operator (&) for most variables.", "int age;\nprintf(\"Age: \");\nscanf(\"%d\", &age);", "Which function is commonly used to display formatted output?", ["printf()", "scanf()", "input()", "read()"], "printf()"],
    ["Operators", "Arithmetic operators perform calculations, relational operators compare values, and logical operators combine conditions.", "int total = 5 + 3;\nint is_big = total > 6;", "Which operator checks equality in C?", ["==", "=", "!=", "&&"], "=="],
    ["if and else", "Conditional statements select which block runs based on whether an expression is true or false.", "if (marks >= 40) {\n    printf(\"Pass\");\n} else {\n    printf(\"Try again\");\n}", "Which statement selects between two paths?", ["if/else", "include", "printf", "return only"], "if/else"],
    ["Loops", "for, while, and do-while repeat statements. Choose a loop based on whether the number of repetitions or stopping condition is known.", "for (int i = 1; i <= 5; i++) {\n    printf(\"%d \", i);\n}", "Which loop checks its condition before each iteration?", ["while", "do-while only after body", "switch", "typedef"], "while"],
    ["Functions", "Functions package reusable work into named blocks. Parameters pass information in, and a return value can pass a result back.", "int add(int a, int b) {\n    return a + b;\n}", "What keyword sends a value back from a function?", ["return", "break", "continue", "case"], "return"],
    ["Arrays", "An array stores multiple values of one type in contiguous positions. In C, the first element has index zero.", "int marks[3] = {70, 80, 90};\nprintf(\"%d\", marks[0]);", "What is the index of the first array element?", ["0", "1", "-1", "3"], "0"],
    ["Strings", "A C string is a character array terminated by the null character '\\0'. String functions are declared in string.h.", "#include <string.h>\nchar name[] = \"DevPath\";\nprintf(\"%zu\", strlen(name));", "What marks the end of a C string?", ["'\\0'", "'\\n'", "' '", "EOF"], "'\\0'"],
    ["Pointers", "A pointer stores a memory address. The & operator obtains an address and * dereferences a pointer to access the pointed-to value.", "int value = 10;\nint *ptr = &value;\nprintf(\"%d\", *ptr);", "What does a pointer store?", ["A memory address", "Only a character", "A loop count", "A function name always"], "A memory address"],
    ["Structures and files", "A structure groups related fields under one type. File functions such as fopen and fclose help work with stored data.", "struct Student { int id; char grade; };\nstruct Student s = {1, 'A'};", "Which keyword defines a structure in C?", ["struct", "class", "object", "record"], "struct"]
  ],
  J201: [
    ["Java program structure", "Java source is organized into classes. The main method is the entry point for a basic application and statements end with semicolons.", "class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello\");\n  }\n}", "Which keyword declares a class?", ["class", "struct", "define", "new"], "class"],
    ["Variables and types", "Variables have declared types such as int, double, char, and boolean. Local variables must be initialized before use.", "int age = 18;\ndouble average = 86.5;\nboolean ready = true;", "Which type stores true or false?", ["boolean", "int", "char", "double"], "boolean"],
    ["Operators and conditions", "Operators calculate values and compare data. if/else runs different code depending on a boolean condition.", "if (score >= 40) {\n  System.out.println(\"Pass\");\n}", "Which operator means 'greater than or equal to'?", [">=", "=>", "==", "!="], ">="],
    ["Loops", "for and while loops repeat work. Enhanced for loops are useful for visiting each item in an array or collection.", "for (int i = 0; i < 3; i++) {\n  System.out.println(i);\n}", "How many times does this loop run?", ["3", "2", "4", "Forever"], "3"],
    ["Methods", "Methods define reusable behavior. Parameters provide inputs, and a non-void method returns a value of its declared type.", "static int square(int n) {\n  return n * n;\n}", "Which keyword returns a value from a method?", ["return", "break", "void", "static"], "return"],
    ["Classes and objects", "A class is a blueprint containing fields and methods. An object is a concrete instance created from that class.", "class Dog { String name; }\nDog pet = new Dog();", "An object is an instance of what?", ["A class", "A loop", "A package", "A primitive type"], "A class"],
    ["Constructors", "A constructor initializes a new object. It has the same name as its class and has no return type.", "class Student {\n  Student() { System.out.println(\"Ready\"); }\n}", "Does a constructor declare a return type?", ["No", "Yes, always int", "Yes, void", "Only String"], "No"],
    ["Inheritance", "Inheritance lets a subclass reuse and extend accessible members from a parent class. Java uses extends for class inheritance.", "class Animal { void eat() {} }\nclass Dog extends Animal {}", "Which keyword supports class inheritance?", ["extends", "inherits", "implements only", "parent"], "extends"],
    ["Interfaces and polymorphism", "An interface describes behavior a class agrees to provide. Polymorphism lets one parent or interface reference refer to different implementations.", "interface Shape { double area(); }\nclass Circle implements Shape { public double area(){ return 0; } }", "Which keyword connects a class to an interface?", ["implements", "extends only", "interface", "instance"], "implements"],
    ["Exceptions and collections", "Exceptions represent errors or unusual conditions and can be handled with try/catch. Collections such as ArrayList store groups of objects.", "try { int n = Integer.parseInt(\"12\"); }\ncatch (NumberFormatException ex) { }", "Which block handles a matching exception?", ["catch", "throws only", "finally only", "import"], "catch"]
  ],
  P301: [
    ["Python syntax", "Python uses indentation to group statements and is designed for readable code. You can run a script with the Python interpreter.", "message = \"Hello, DevPath\"\nprint(message)", "Which function displays output?", ["print()", "echo()", "printf()", "show()"], "print()"],
    ["Variables and types", "Python names refer to objects. Common built-in types include int, float, str, and bool; Python determines types at runtime.", "age = 18\nprice = 12.5\nactive = True", "Which type represents text?", ["str", "int", "bool", "float"], "str"],
    ["Strings", "Strings are immutable sequences of characters. Indexing and slicing create access to individual characters or substrings.", "language = \"Python\"\nprint(language[0:3])", "What does language[0:3] return?", ["Pyt", "yth", "Python", "on"], "Pyt"],
    ["Lists and tuples", "Lists are ordered and mutable; tuples are ordered and immutable. Indexing begins at zero.", "scores = [80, 92, 75]\nscores.append(88)", "Which collection can be changed after creation?", ["list", "tuple", "both are immutable", "neither"], "list"],
    ["Dictionaries and sets", "Dictionaries map unique keys to values. Sets store unique elements and are useful for removing duplicates or membership checks.", "student = {\"name\": \"Mira\", \"year\": 1}\nprint(student[\"name\"])", "Which structure maps keys to values?", ["dictionary", "set", "tuple", "range"], "dictionary"],
    ["Conditions", "if, elif, and else select a path based on conditions. Comparisons produce boolean results.", "if marks >= 40:\n    print(\"Pass\")\nelse:\n    print(\"Retry\")", "Which keyword checks another condition after if?", ["elif", "repeat", "case", "next"], "elif"],
    ["Loops", "for loops iterate over items in an iterable; while loops continue as long as a condition is true.", "for number in range(3):\n    print(number)", "What values does range(3) produce?", ["0, 1, 2", "1, 2, 3", "0, 1, 2, 3", "3 only"], "0, 1, 2"],
    ["Functions", "Functions are defined with def. They can accept parameters and return a result using return.", "def add(a, b):\n    return a + b", "Which keyword defines a function?", ["def", "func", "function", "method"], "def"],
    ["Modules and packages", "Modules organize reusable code. import makes module names available, while packages group modules into a directory structure.", "import math\nprint(math.sqrt(25))", "Which statement loads a module?", ["import", "include", "using", "require"], "import"],
    ["Files and errors", "Use with open(...) to manage files safely. try/except handles selected exceptions without hiding every possible error.", "with open(\"notes.txt\", \"w\") as file:\n    file.write(\"Study\")", "Why is a with block useful for files?", ["It closes the file automatically", "It deletes every file", "It disables errors", "It compiles Python"], "It closes the file automatically"]
  ],
  DS401: [
    ["Algorithm analysis", "Time complexity describes how work grows with input size. Big-O notation expresses an upper-bound growth rate.", "for (int i = 0; i < n; i++) {\n    print(i);\n}", "What is the time complexity of one loop over n items?", ["O(n)", "O(1)", "O(log n)", "O(n²)"], "O(n)"],
    ["Arrays", "Arrays store elements by index. Index access is usually constant time, while searching an unsorted array may inspect every element.", "int values[] = {4, 7, 9};\n// values[1] is 7", "What is the usual complexity of array index access?", ["O(1)", "O(n)", "O(n log n)", "O(n²)"], "O(1)"],
    ["Linked lists", "A linked list stores nodes connected by pointers. Inserting at a known node can be efficient, but indexed access requires traversal.", "struct Node { int data; struct Node *next; };", "Which field links a singly linked-list node forward?", ["next pointer", "array index", "top variable", "priority"], "next pointer"],
    ["Stacks", "A stack follows Last In, First Out. Push adds an item and pop removes the most recently added item.", "push(10);\npush(20);\npop(); // returns 20", "Which principle does a stack follow?", ["LIFO", "FIFO", "Sorted order", "Random order"], "LIFO"],
    ["Queues", "A queue follows First In, First Out. Enqueue adds at the rear and dequeue removes from the front.", "enqueue(10);\nenqueue(20);\ndequeue(); // returns 10", "Which principle does a queue follow?", ["FIFO", "LIFO", "Reverse order", "Priority only"], "FIFO"],
    ["Searching", "Linear search checks items one by one. Binary search repeatedly halves the search range and requires sorted data.", "// binary search needs sorted data\nlow = 0; high = n - 1;", "What condition does binary search require?", ["Sorted data", "A linked list only", "No comparisons", "Duplicate values only"], "Sorted data"],
    ["Sorting", "Sorting arranges values in an order. Merge sort divides and merges in O(n log n) time; simple bubble sort is usually O(n²).", "// sort values in ascending order\n[2, 4, 7, 9]", "Which algorithm typically guarantees O(n log n) time?", ["Merge sort", "Bubble sort", "Linear search", "Selection sort"], "Merge sort"],
    ["Trees and BST", "A tree represents hierarchy. In a binary search tree, values smaller than a node are generally placed in its left subtree.", "    8\n   / \\\n  3  10", "Where do smaller values go in a BST?", ["Left subtree", "Right subtree", "Only root", "Outside tree"], "Left subtree"],
    ["Graphs and traversal", "Graphs contain vertices and edges. BFS explores neighbors level by level and commonly uses a queue.", "Queue starts with source\nVisit neighbors before next level", "Which data structure is commonly used by BFS?", ["Queue", "Stack only", "Heap only", "Array index"], "Queue"],
    ["Hashing and complexity", "Hash tables use a hash function to map keys to buckets. Average lookup can be close to O(1), though collisions must be handled.", "hash(\"student-id\") -> bucket", "What does a hash function produce?", ["A bucket/index from a key", "A sorted list always", "A tree traversal", "A loop condition"], "A bucket/index from a key"]
  ],
  INT501: [
    ["Resume fundamentals", "A resume should highlight relevant education, projects, skills, and evidence of impact. Keep it truthful and easy to scan.", "Project: Built a quiz API with Flask\nSkills: Python, REST, Docker", "What should a resume claim include?", ["Truthful, relevant evidence", "Invented experience", "Every personal detail", "Unrelated long stories"], "Truthful, relevant evidence"],
    ["Self introduction", "A concise introduction covers your current study or role, relevant skills, one strength, and the opportunity you seek.", "Present → Skills → Example → Goal", "A good self-introduction should be:", ["Relevant and concise", "Several minutes of unrelated details", "Only your marks", "A claim you cannot explain"], "Relevant and concise"],
    ["Explain a project", "Describe the problem, your contribution, architecture, one challenge, and the result. Be clear about what you personally implemented.", "Problem → Role → Approach → Challenge → Result", "Which part must you explain accurately?", ["Your own contribution", "Only the project title", "Features not implemented", "Unrelated hobbies"], "Your own contribution"],
    ["OOP revision", "Review encapsulation, inheritance, abstraction, and polymorphism. Prepare a short definition and a practical example for each.", "Class → fields + methods\nObject → instance", "Which concept hides internal state behind controlled methods?", ["Encapsulation", "Iteration", "Routing", "Compilation"], "Encapsulation"],
    ["DBMS and SQL", "Prepare keys, normalization, joins, transactions, and common SELECT queries. Explain what a query returns.", "SELECT name FROM Students WHERE marks > 80;", "Which SQL command retrieves rows?", ["SELECT", "DROP", "UPDATE", "DELETE"], "SELECT"],
    ["Operating systems", "Revise process versus thread, scheduling, memory management, deadlocks, and file systems using concise examples.", "Process → program in execution\nThread → execution path", "Which OS component chooses a process to run next?", ["Scheduler", "Compiler", "Router", "Editor"], "Scheduler"],
    ["Computer networks", "Review TCP/IP, DNS, HTTP, addressing, routing, and the difference between reliable transport and best-effort delivery.", "Browser → HTTP → TCP/IP", "Which transport protocol provides reliable ordered delivery?", ["TCP", "UDP", "ARP", "ICMP only"], "TCP"],
    ["Problem solving", "For coding questions, clarify inputs, discuss a simple approach, test edge cases, and then improve time or space complexity.", "Understand → Plan → Code → Test", "What should you do before coding?", ["Clarify the problem and examples", "Guess the output", "Skip edge cases", "Start typing without reading"], "Clarify the problem and examples"],
    ["Behavioral answers with STAR", "STAR organizes a behavioral answer into Situation, Task, Action, and Result. Focus on specific actions you took.", "S: Situation\nT: Task\nA: Action\nR: Result", "What does the A in STAR stand for?", ["Action", "Answer", "Aim", "Ability"], "Action"],
    ["Interview practice plan", "Practise aloud, review mistakes, and prepare questions for the interviewer. Track topics that need another revision.", "Daily: 1 concept + 1 problem + 1 reflection", "What is a useful practice habit?", ["Review mistakes and practise consistently", "Memorize only answers", "Avoid feedback", "Never test code"], "Review mistakes and practise consistently"]
  ]
};

function CourseTrack({ course, onBack, onCourseCompleted }) {
  // Lesson plans are stored as arrays: [title, description, example, question, options, answer].
  // Normalize them to objects before rendering so the lesson UI never reads undefined fields.
  const lessons = (lessonPlans[course.id] || lessonPlans.C101).map((item) => Array.isArray(item) ? ({
    title: item[0], body: item[1], code: item[2], task: item[3], options: item[4], answer: item[5]
  }) : item);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`devpath-lessons-${course.id}`) || '{}'); } catch { return {}; }
  });
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const lesson = lessons[lessonIndex];
  const doneCount = Object.values(completed).filter(Boolean).length;
  const courseFinished = doneCount === lessons.length;
  useEffect(() => {
    localStorage.setItem(`devpath-lessons-${course.id}`, JSON.stringify(completed));
    if (courseFinished) onCourseCompleted(course.id);
  }, [completed, courseFinished, course.id, onCourseCompleted]);
  function changeLesson(next) { setLessonIndex(next); setAnswer(''); setChecked(false); }
  return <section className="track-view">
    <button className="text-btn" onClick={onBack}><ArrowRight size={14} style={{transform:'rotate(180deg)'}}/> Back to courses</button>
    <PageHeading eyebrow={`${course.id} · ${course.level}`} title={course.title} description="Work through short lessons, study the example, and answer the practice question."/>
    <div className="track-layout">
      <aside className="panel track-sidebar"><strong>Course lessons</strong><p>{doneCount} of {lessons.length} completed</p><div className="goal-track"><span style={{width:`${doneCount / lessons.length * 100}%`}} /></div>{courseFinished && <div className="course-complete-banner"><CheckCircle2 size={20}/><div><strong>Course Completed!</strong><span>You finished all {lessons.length} lessons.</span></div><Award size={22}/></div>}
        {lessons.map((item, i) => <button key={item.title} className={`track-lesson ${lessonIndex === i ? 'active' : ''}`} onClick={() => changeLesson(i)}><span>{completed[i] ? '✓' : String(i+1).padStart(2,'0')}</span><span>{item.title}</span></button>)}
      </aside>
      <article className="panel lesson-panel"><div className="eyebrow">LESSON {lessonIndex + 1} OF {lessons.length}</div><h2>{lesson.title}</h2><p>{lesson.body}</p><pre className="lesson-code"><code>{lesson.code}</code></pre>
        <div className="lesson-check"><strong>Quick practice</strong><p>{lesson.task}</p><div className="lesson-options">{lesson.options.map(option => <label key={option} className={`lesson-option ${answer === option ? 'selected' : ''} ${checked && option === lesson.answer ? 'correct' : checked && answer === option ? 'wrong' : ''}`}><input type="radio" name={`lesson-${course.id}-${lessonIndex}`} checked={answer === option} onChange={() => {setAnswer(option);setChecked(false);}}/>{option}</label>)}</div>
          {checked && <p className={answer === lesson.answer ? 'result-correct' : 'result-wrong'}>{answer === lesson.answer ? 'Correct!' : `Not quite. Correct answer: ${lesson.answer}`}</p>}
          <div className="lesson-actions"><button className="secondary-btn small" disabled={!checked || answer !== lesson.answer || !!completed[lessonIndex]} onClick={() => {setCompleted(old=>({...old,[lessonIndex]:true})); if (lessonIndex < lessons.length - 1) changeLesson(lessonIndex + 1);}}>{completed[lessonIndex] ? 'Lesson completed ✓' : 'Complete lesson'}</button><button className="primary-btn small" disabled={!answer} onClick={() => setChecked(true)}>Check answer <ArrowRight size={14}/></button></div><p className="lesson-hint">{!checked ? 'Answer the question correctly to complete this lesson.' : answer === lesson.answer ? 'Correct! You can now complete this lesson.' : 'Review the explanation and try again.'}</p>
        </div>
        <div className="lesson-actions"><button className="secondary-btn small" disabled={lessonIndex===0} onClick={()=>changeLesson(lessonIndex-1)}>Previous lesson</button><button className="primary-btn small" disabled={lessonIndex===lessons.length-1} onClick={()=>changeLesson(lessonIndex+1)}>Next lesson <ArrowRight size={14}/></button></div>
      </article>
    </div>
  </section>;
}

function TopicLesson({ topic, group, onClose }) {
  const content = {
    'Percentages': ['A percentage means “out of 100”. To find x% of a number, multiply the number by x/100.', '20% of 150 = (20/100) × 150 = 30.', 'A price of ₹800 is discounted by 10%. What is the discount amount?', ['₹8', '₹80', '₹100', '₹180'], '₹80'],
    'Time & work': ['If a person completes a job in n days, their one-day work rate is 1/n. Combined rates are added.', 'A completes a job in 4 days and B in 4 days: together rate = 1/4 + 1/4 = 1/2 job per day.', 'A completes a job in 6 days. What fraction of the job does A complete in one day?', ['1/3', '1/4', '1/6', '6'], '1/6'],
    'Number series': ['Look for repeated differences, ratios, or alternating patterns between terms.', '2, 4, 6, 8 increases by 2 each time.', 'What comes next: 3, 6, 9, 12, ...?', ['13', '14', '15', '18'], '15'],
    'Verbal ability': ['Read the full sentence and check grammar, meaning, and context before choosing an answer.', '“She has lived here for five years” correctly uses the present perfect for a duration continuing to now.', 'Choose the correctly spelled word.', ['Recieve', 'Receive', 'Receeve', 'Receve'], 'Receive'],
    'OOP concepts': ['Object-oriented programming organizes software around objects created from classes. Core ideas include encapsulation, inheritance, polymorphism, and abstraction.', 'A BankAccount class can hide its balance field and expose deposit/withdraw methods.', 'Which concept bundles data and methods while controlling access?', ['Encapsulation', 'Compilation', 'Iteration', 'Routing'], 'Encapsulation'],
    'DBMS & SQL': ['A DBMS stores and manages data. SQL is commonly used to query and modify relational tables.', 'SELECT name FROM Students WHERE marks > 80;', 'Which SQL command retrieves rows?', ['SELECT', 'DELETE', 'DROP', 'UPDATE'], 'SELECT'],
    'Operating systems': ['An operating system manages processes, memory, files, and devices, and provides services to applications.', 'Examples include process scheduling and virtual memory.', 'Which component allocates CPU time to processes?', ['Scheduler', 'Compiler', 'Router', 'Editor'], 'Scheduler'],
    'Computer networks': ['A computer network allows devices to exchange data using protocols. TCP provides reliable, ordered delivery.', 'HTTP commonly uses TCP; DNS translates domain names to records.', 'Which protocol is connection-oriented and reliable?', ['UDP', 'TCP', 'IP only', 'ARP'], 'TCP'],
    'Arrays & strings': ['An array stores indexed elements. A string is text represented by characters or a string object, depending on the language.', 'Use a loop to visit each element in an array.', 'What is the typical index of the first element in C arrays?', ['0', '1', '-1', 'Depends on value'], '0'],
    'Linked lists': ['A linked list stores nodes; each node contains data and one or more links to other nodes.', 'A singly linked list node points to the next node.', 'Which field links a singly linked-list node to the next node?', ['next pointer', 'array index', 'priority value', 'stack top'], 'next pointer'],
    'Stacks & queues': ['A stack follows LIFO. A queue follows FIFO.', 'A stack is useful for function calls; a queue is useful for first-come-first-served processing.', 'Which structure follows LIFO?', ['Queue', 'Stack', 'Graph', 'Hash table'], 'Stack'],
    'Trees & graphs': ['A tree is a hierarchical structure. A graph contains vertices connected by edges.', 'A binary tree node has at most two children.', 'How many children can a binary tree node have at most?', ['1', '2', '3', 'Unlimited'], '2'],
    'Self introduction': ['Give your name, education, key skills, and the kind of role you are seeking. Keep it relevant and brief.', '“I am a computer science student learning Java and data structures, and I enjoy solving programming problems.”', 'A good introduction should be:', ['Relevant and concise', 'Several minutes of unrelated details', 'Only your marks', 'A memorized claim you cannot explain'], 'Relevant and concise'],
    'Strengths & goals': ['Choose a genuine strength and support it with a real example. Connect your goal to the role you want.', '“I practise coding regularly; my current goal is to improve problem-solving with data structures.”', 'What should support a claimed strength?', ['A real example', 'A guess', 'A copied slogan', 'An unrelated story'], 'A real example'],
    'Project explanation': ['Explain the problem, your role, design, technologies, challenge, and result. Be honest about what works today.', 'For DevPath, describe the React interface, Spring Boot course API, Flask quiz API, and Docker setup if you worked on those parts.', 'What should you clearly describe?', ['Your own contribution', 'Only the project logo', 'A feature not implemented', 'Unrelated details'], 'Your own contribution'],
    'Teamwork examples': ['Describe a specific situation, your responsibility, the action you took, and the outcome.', 'Use STAR: Situation, Task, Action, Result.', 'What does STAR help structure?', ['A behavioral interview answer', 'A SQL table', 'A network address', 'A loop'], 'A behavioral interview answer']
  };
  const item = content[topic] || ['Review the key definition, learn one concrete example, and practise explaining it in your own words.', `Topic: ${topic}. Start by writing a short definition and one example.`, `Which is the best way to prepare ${topic.toLowerCase()}?`, ['Understand the concept and practise', 'Memorize without understanding', 'Skip examples', 'Guess every answer'], 'Understand the concept and practise'];
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  return <article className="panel topic-lesson"><div className="panel-heading"><div><div className="eyebrow">{group}</div><h3>{topic}</h3></div><button className="secondary-btn small" onClick={onClose}>Close</button></div><div className="topic-description"><strong>Topic description</strong><p>{item[0]}</p></div><div className="topic-example"><strong>Worked example</strong><p>{item[1]}</p></div><div className="lesson-check"><strong>Practice question</strong><p>{item[2]}</p><div className="lesson-options">{item[3].map(option=><label key={option} className={`lesson-option ${answer===option?'selected':''} ${checked && option===item[4]?'correct':checked && answer===option?'wrong':''}`}><input type="radio" name={`topic-${topic}`} checked={answer===option} onChange={()=>{setAnswer(option);setChecked(false);}}/>{option}</label>)}</div>{checked && <div className={answer===item[4]?'result-correct':'result-wrong'}>{answer===item[4]?'Correct!':`Not quite. Correct answer: ${item[4]}.`}<p>{item[0]} Example: {item[1]}</p></div>}<button className="primary-btn small" disabled={!answer} onClick={()=>setChecked(true)}>Check answer <ArrowRight size={14}/></button></div></article>;
}

const placementGroups = [
  { icon: <BrainCircuit/>, title: 'Aptitude & reasoning', desc: 'Practice quantitative aptitude, logical reasoning, and verbal ability.', topics: ['Percentages', 'Time & work', 'Number series', 'Verbal ability'] },
  { icon: <Code2/>, title: 'Technical interview', desc: 'Revise core computer science topics asked in technical rounds.', topics: ['OOP concepts', 'DBMS & SQL', 'Operating systems', 'Computer networks'] },
  { icon: <TerminalSquare/>, title: 'DSA roadmap', desc: 'Strengthen problem-solving from basic structures to algorithms.', topics: ['Arrays & strings', 'Linked lists', 'Stacks & queues', 'Trees & graphs'] },
  { icon: <BriefcaseBusiness/>, title: 'HR interview', desc: 'Prepare clear, structured answers and examples from your projects.', topics: ['Self introduction', 'Strengths & goals', 'Project explanation', 'Teamwork examples'] }
];

function Placement() {
  const [opened, setOpened] = useState({});
  const [activeTopic, setActiveTopic] = useState(null);
  return <>
    <PageHeading eyebrow="CAREER READINESS" title="Your placement prep plan." description="Organize the topics that commonly appear across aptitude tests and technical interviews."/>
    <div className="placement-banner"><div className="placement-banner-icon"><Trophy size={27}/></div><div><span className="eyebrow">YOUR NEXT MILESTONE</span><h2>Consistency beats cramming.</h2><p>Pick one topic, practise a little each day, and review what you learn.</p></div></div>
    <div className="placement-grid">{placementGroups.map((group, i) => <article className="prep-card" key={group.title}><div className={`prep-icon prep-${i}`}>{group.icon}</div><h3>{group.title}</h3><p>{group.desc}</p><button className="text-btn" onClick={() => setOpened(old => ({...old, [i]: !old[i]}))}>{opened[i] ? 'Hide topics' : 'View topics'} <ChevronRight size={15} className={opened[i] ? 'rotate-down' : ''}/></button>{opened[i] && <ul className="topic-list">{group.topics.map(topic => <li key={topic}><button className="text-btn topic-open" onClick={() => setActiveTopic({title: topic, group: group.title})}><CheckCircle2 size={14}/>{topic}<ArrowRight size={13}/></button></li>)}</ul>}</article>)}</div>
    {activeTopic && <TopicLesson topic={activeTopic.title} group={activeTopic.group} onClose={() => setActiveTopic(null)} />}
    <div className="panel placement-note"><CircleHelp size={21}/><div><strong>Study tip</strong><p>Open a topic to review a short explanation, an example, and a practice question.</p></div></div>
  </>;
}


function StudentProfile({ student, setStudent, courses, completedCount, answeredCount, courseStatus, results, setPage }) {
  const correctCount = Object.values(results).filter(result => result.correct).length;
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const lessonsDone = courses.reduce((sum, course) => {
    try { return sum + Object.values(JSON.parse(localStorage.getItem(`devpath-lessons-${course.id}`) || '{}')).filter(Boolean).length; } catch { return sum; }
  }, 0);
  const activity = [
    { title: 'Lessons completed', value: lessonsDone, detail: 'Across your learning tracks', icon: <BookOpen/> },
    { title: 'Courses completed', value: completedCount, detail: 'Full tracks finished', icon: <Trophy/> },
    { title: 'Questions answered', value: answeredCount, detail: `${correctCount} correct answers`, icon: <BrainCircuit/> },
    { title: 'Learning streak', value: lessonsDone > 0 || answeredCount > 0 ? 'Active' : 'Start', detail: 'Build a daily habit', icon: <Activity/> }
  ];
  return <>
    <PageHeading eyebrow="STUDENT SPACE" title="Your profile & progress." description="Your learning activity, course achievements, and account details in one place."/>
    <div className="profile-hero panel"><div className="profile-large-avatar">{student.name.slice(0,1).toUpperCase()}</div><div className="profile-hero-copy"><div className="eyebrow">DEVPATH LEARNER</div><h2>{student.name}</h2><p>{student.email}</p><span className="profile-badge"><CheckCircle2 size={14}/> Learning profile active</span></div><button className="secondary-btn small" onClick={()=>{localStorage.removeItem('devpath-student');setStudent(null);}}>Sign out</button></div>
    <div className="stats-grid profile-stats">{activity.map((item,i)=><div className="stat-card" key={item.title}><div className={`stat-icon ${['blue','green','purple','orange'][i]}`}>{item.icon}</div><div className="stat-label">{item.title}</div><div className="stat-value">{item.value}</div><div className="stat-note">{item.detail}</div></div>)}</div>
    <div className="profile-columns"><section className="panel"><div className="panel-heading"><div><h3>Account details</h3><p>Update your learner profile</p></div></div><form className="profile-form" onSubmit={e=>{e.preventDefault();setStudent({...student,name:name.trim(),email:email.trim()});}}><label>Full name<input required value={name} onChange={e=>setName(e.target.value)}/></label><label>Email address<input required type="email" value={email} onChange={e=>setEmail(e.target.value)}/></label><button className="primary-btn small" type="submit">Save profile <CheckCircle2 size={15}/></button></form></section><section className="panel"><div className="panel-heading"><div><h3>Course activity</h3><p>Your current learning tracks</p></div><button className="text-btn" onClick={()=>setPage('courses')}>Open learning <ArrowRight size={14}/></button></div>{courses.map((course,i)=>{let count=0;try{count=Object.values(JSON.parse(localStorage.getItem(`devpath-lessons-${course.id}`)||'{}')).filter(Boolean).length;}catch{}return <div className="activity-course" key={course.id}><div className={`course-icon course-tone-${i%3}`}><Code2 size={17}/></div><div className="activity-course-main"><strong>{course.title}</strong><div className="goal-track"><span style={{width:`${count/10*100}%`}}/></div><small>{count}/10 lessons · {courseStatus[course.id]?'Completed':'In progress'}</small></div></div>})}</section></div>
    <div className="profile-tip"><Award size={21}/><div><strong>Keep your momentum</strong><p>Finish a lesson, check your understanding, and return regularly. Your progress is saved in this browser.</p></div></div>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
