import { ContainerScroll } from "./ui/ContainerScroll";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextValue";

function CourseShowcase() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <ContainerScroll
      titleComponent={
        <>
          <h2 className="text-6xl font-bold text-white">
            Learn With Real Resources
          </h2>

          <p className="text-slate-400 mt-4">
            Videos, Notes, Roadmaps and Projects.
          </p>
        </>
      }
    >
      <div className="relative h-full flex items-center justify-center overflow-hidden rounded-2xl">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
          alt="Learning"
          className="
          w-full
          h-full
          object-cover
          rounded-2xl
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

        <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-3xl font-bold text-white">
              Build one focused path
            </h3>
            <p className="mt-2 max-w-xl text-slate-200">
              Sign in, search a topic, save a roadmap, and track every step.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(user ? "/dashboard" : "/login")}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-indigo-100"
          >
            Open Dashboard
          </button>
        </div>
      </div>
    </ContainerScroll>
  );
}

export default CourseShowcase;
