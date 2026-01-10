import React from "react";

const useCases = [
  {
    title: "Project Management",
    description:
      "Create, organize, and track client projects with clear timelines and real-time status updates."
  },
  {
    title: "Task Tracking",
    description:
      "Break projects into tasks, assign responsibilities, and monitor progress efficiently."
  },
  {
    title: "Activity Logs",
    description:
      "Maintain a detailed activity history for transparency and accountability."
  },
  {
    title: "Issue Resolution",
    description:
      "Log, track, and resolve issues quickly to keep projects on schedule."
  }
];

const UseCases = () => {
  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Use Cases</h2>
        <p className="text-muted">
          Practical scenarios where <span className="text-primary">Client Project Tracker</span> adds real value
        </p>
      </div>

      <div className="row g-4">
        {useCases.map((item, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <h5 className="card-title fw-semibold">{item.title}</h5>
                <p className="card-text text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UseCases;
