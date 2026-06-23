import { Brain, Code, Shield, Cloud, Database, Globe } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextValue";

const categories = [
  {
    icon: Brain,
    title: "Artificial Intelligence",
  },
  {
    icon: Code,
    title: "Programming",
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
  },
  {
    icon: Shield,
    title: "Cyber Security",
  },
  {
    icon: Database,
    title: "Data Science",
  },
  {
    icon: Globe,
    title: "Web Development",
  },
];

function Categories() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCategoryClick = (title) => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate(`/search?q=${encodeURIComponent(title)}`);
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-white text-center mb-16">
          Explore Domains
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <button
                type="button"
                key={index}
                onClick={() => handleCategoryClick(category.title)}
                className="
                  text-left
                  bg-slate-900/50
                  backdrop-blur-xl
                  border
                  border-slate-800
                  rounded-3xl
                  p-8
                  hover:border-indigo-500
                  transition-all
                  hover:-translate-y-1
                  "
              >
                <Icon
                  className="
                    text-indigo-400
                    mb-4
                    "
                  size={32}
                />

                <h3 className="text-white text-xl font-semibold">
                  {category.title}
                </h3>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;
