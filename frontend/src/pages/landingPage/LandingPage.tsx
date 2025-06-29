import { useState, useEffect } from "react";
import {
  Play,
  TrendingUp,
  Timer,
  Trophy,
  ArrowRight,
  Github,
  User,
  Linkedin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [currentWorkout, setCurrentWorkout] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const workoutExamples = [
    { exercise: "Push-ups", reps: 15, sets: 3, weight: "Bodyweight" },
    { exercise: "Squats", reps: 12, sets: 4, weight: "135 lbs" },
    { exercise: "Deadlifts", reps: 8, sets: 3, weight: "185 lbs" },
    { exercise: "Pull-ups", reps: 6, sets: 3, weight: "Bodyweight" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWorkout((prev) => (prev + 1) % workoutExamples.length);
        setIsAnimating(false);
      }, 200);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-bounce"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-7 h-7 text-white"
            />
          </div>
          <span className="text-xl font-bold">Gainz Journal</span>
        </div>

        <div className="flex items-center space-x-4">
          {/* <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Features
          </button> */}
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Free For Now
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                Track Your
                <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-slate-300 bg-clip-text text-transparent animate-pulse">
                  Progress
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                The minimal workout tracker that focuses on what matters most -
                recording your progress, nothing more, nothing less.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/register")}
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Start Tracking
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center">
                <Play className="mr-2 w-5 h-5" />
                See Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">0</div>
                <div className="text-sm text-gray-400 mt-1">Setup Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-300">∞</div>
                <div className="text-sm text-gray-400 mt-1">Free For Now</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300">1</div>
                <div className="text-sm text-gray-400 mt-1">Core Feature</div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Demo */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Today's Workout</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Timer className="w-4 h-4" />
                  <span>Live Demo</span>
                </div>
              </div>

              {/* Animated workout display */}
              <div
                className={`transition-all duration-300 ${
                  isAnimating
                    ? "opacity-50 transform scale-95"
                    : "opacity-100 transform scale-100"
                }`}
              >
                <div className="bg-gradient-to-r from-blue-500/20 to-slate-500/20 rounded-2xl p-6 border border-blue-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">
                      {workoutExamples[currentWorkout].exercise}
                    </h4>
                    <div className="px-3 py-1 bg-white/10 rounded-full text-sm">
                      {workoutExamples[currentWorkout].weight}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">
                        {workoutExamples[currentWorkout].reps}
                      </div>
                      <div className="text-sm text-gray-400">Reps</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-300">
                        {workoutExamples[currentWorkout].sets}
                      </div>
                      <div className="text-sm text-gray-400">Sets</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                  Log Exercise
                </button>

                <div className="flex space-x-3">
                  <button className="flex-1 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors">
                    Edit Sets
                  </button>
                  <button className="flex-1 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors">
                    Add Note
                  </button>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span>+15% from last week</span>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center animate-bounce animation-delay-1000">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-7 h-7 text-white"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-slate-400 to-blue-400 rounded-full flex items-center justify-center animate-pulse">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Gainz Journal?</h2>
          <p className="text-xl text-gray-300">Simple. Minimal. Effective.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Timer className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Quick Logging</h3>
            <p className="text-gray-300">
              Record your sets, reps, and weights in seconds. No complicated
              forms or endless options.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-slate-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative">
              <TrendingUp className="w-6 h-6 text-white" />
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-400 to-slate-400 text-xs font-bold px-2 py-1 rounded-full text-black">
                SOON
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">Progress Charts</h3>
            <p className="text-gray-300">
              Visualize your improvement over time with clean, simple charts and
              statistics.{" "}
              <span className="text-blue-400 font-medium">Coming soon!</span>
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Free For Now</h3>
            <p className="text-gray-300">
              No subscriptions, no premium features, no limits. Track your
              workouts for free.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-500/20 to-slate-500/20 rounded-3xl p-12 border border-blue-500/30 backdrop-blur-xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Tracking?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who've simplified their workout tracking
            with Gainz Journal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/register")}
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Get Started Now
            </button>

            <button className="px-10 py-4 bg-white/10 backdrop-blur-sm rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center">
              <Link
                className="flex items-center justify-center"
                to="https://github.com/LoKii0007/gainz-journal"
                target="_blank"
              >
                <Github className="mr-2 w-5 h-5" />
                View on GitHub
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-7 h-7 text-white"
              />
            </div>
            <span className="font-semibold">Gainz Journal</span>
          </div>
          <div className="text-sm text-gray-400 flex items-center justify-center gap-2">
            <Link
              className="flex items-center justify-center"
              to="https://github.com/LoKii0007/gainz-journal"
              target="_blank"
            >
              <Github className="mr-2 w-5 h-5" />
            </Link>
            <Link
              className="flex items-center justify-center"
              to="https://portfolio-five-rho.vercel.app/"
              target="_blank"
            >
              <User className="mr-2 w-5 h-5" />
            </Link>
            <Link
              className="flex items-center justify-center"
              to="https://www.linkedin.com/in/yadav-lokesh/"
              target="_blank"
            >
              <Linkedin className="mr-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
