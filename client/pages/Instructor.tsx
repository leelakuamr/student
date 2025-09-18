export default function Instructor() {
  const courses = [
    { id: "c1", title: "Algebra I", students: 28, assignments: 12 },
    { id: "c2", title: "Chemistry Basics", students: 24, assignments: 10 },
  ];
  const submissions = [
    { id: "s1", student: "Rohan", assignment: "Quadratic HW", status: "submitted" },
    { id: "s2", student: "Aisha", assignment: "Lab Report 1", status: "graded" },
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Instructor Console</h1>
      <p className="mt-1 text-muted-foreground">Create courses, manage students, and review work.</p>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Your Courses</h2>
        <div className="mt-3 overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3">Course</th>
                <th className="p-3">Students</th>
                <th className="p-3">Assignments</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-3">{c.title}</td>
                  <td className="p-3">{c.students}</td>
                  <td className="p-3">{c.assignments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Recent Submissions</h2>
        <div className="mt-3 overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3">Student</th>
                <th className="p-3">Assignment</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-3">{s.student}</td>
                  <td className="p-3">{s.assignment}</td>
                  <td className="p-3">
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
