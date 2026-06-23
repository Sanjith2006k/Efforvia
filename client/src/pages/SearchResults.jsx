import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { searchTopic } from "../services/searchService";
import { saveLearningPath } from "../services/learningService";
import Navbar from "../components/Navbar";
import PageTransition from "../components/ui/PageTransition";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get("q");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!query) {
      navigate("/dashboard");
      return;
    }

    const fetchData = async () => {
      try {
        const result = await searchTopic(query);

        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, query]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load resources
      </div>
    );
  }

  const handleSave = async () => {
    try {
      await saveLearningPath(data.topic, data.roadmap);
      setMessage("Learning path saved. You can add another course or continue learning.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not save this path.");
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen text-white px-8 py-24">
        <Navbar />
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-8">{data.topic}</h1>
          <div className="mb-6 flex flex-wrap gap-3">
            <button
              onClick={handleSave}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-[0_8px_0_#312e81] transition-all hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-[0_12px_0_#312e81] active:translate-y-1 active:shadow-[0_4px_0_#312e81]"
            >
              Save Learning Path
            </button>

            <Link
              to="/dashboard"
              className="rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Search Another Topic
            </Link>
          </div>

          {message && (
            <p className="mb-8 rounded-xl border border-indigo-400/30 bg-indigo-500/10 px-4 py-3 text-indigo-100">
              {message}
            </p>
          )}
          {/* ROADMAP */}

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Learning Roadmap</h2>

            <div className="grid md:grid-cols-3 gap-4">
              {data.roadmap?.map((step, index) => (
                <div
                  key={index}
                  className="
                  bg-slate-900/60
                  border
                  border-slate-800
                  rounded-2xl
                  p-4
                  "
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* NOTES */}

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Notes</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {data.notes?.map((note, index) => (
                <a
                  key={index}
                  href={note.url}
                  target="_blank"
                  rel="noreferrer"
                  className="
                  bg-slate-900/60
                  border
                  border-slate-800
                  rounded-2xl
                  p-4
                  transition
                  hover:border-indigo-500
                  "
                >
                  <h3 className="font-semibold">{note.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {note.description}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* VIDEOS */}

          <div>
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-bold">Recommended Courses</h2>
                <p className="text-slate-400">
                  Live YouTube results are shown when the API key is available;
                  otherwise these open current channel searches.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {data.videos?.map((video) => (
                <a
                  key={video.videoId || video.url}
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="
                bg-slate-900/60
                border
                border-slate-800
                rounded-2xl
                overflow-hidden
                hover:border-indigo-500
                transition
                "
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full"
                  />

                  <div className="p-4">
                    <h3 className="font-semibold">{video.title}</h3>

                    <p className="text-slate-400 mt-2">
                      {video.channel}
                      {video.source === "curated" ? " search" : ""}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {data.videos?.length === 0 && (
              <p className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-slate-300">
                No courses were found for this topic yet. Try a broader search
                from the dashboard.
              </p>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default SearchResults;
