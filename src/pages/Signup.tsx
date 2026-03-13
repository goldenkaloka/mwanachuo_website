import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, Loader2, AlertCircle, User, GraduationCap, Briefcase, BookOpen } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/useToast";
import { useUniversity } from "@/hooks/useUniversity";
import { useCategories } from "@/hooks/useCategories";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { universities } = useUniversity();
  const [universityId, setUniversityId] = useState("");
  const [userType, setUserType] = useState<"student" | "business">("student");
  const [businessName, setBusinessName] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [semester, setSemester] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [courseId, setCourseId] = useState("");
  const [loadingCourses, setLoadingCourses] = useState(false);
  const { data: dynamicCategories } = useCategories();

  useEffect(() => {
    if (universityId) {
      const fetchCourses = async () => {
        setLoadingCourses(true);
        const { data, error } = await supabase
          .from("courses")
          .select("id, name, code")
          .eq("university_id", universityId)
          .order("name");

        if (!error && data) {
          setCourses(data);
        }
        setLoadingCourses(false);
      };
      fetchCourses();
    } else {
      setCourses([]);
    }
  }, [universityId]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!universityId) {
      setError("Please select your university.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const yearNum = yearOfStudy ? parseInt(yearOfStudy, 10) : NaN;
      const semNum = semester ? parseInt(semester, 10) : NaN;

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            name: fullName,
            user_type: userType,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create user profile in public.users table
        const { error: profileError } = await supabase
          .from("users")
          .insert([
            {
              id: authData.user.id,
              email: email,
              full_name: fullName,
              primary_university_id: universityId,
              user_type: userType,
              business_name: userType === "business" ? businessName : null,
              business_category: userType === "business" ? businessCategory : null,
              year_of_study: userType === "student" && Number.isInteger(yearNum) ? yearNum : null,
              current_semester: userType === "student" && Number.isInteger(semNum) ? semNum : null,
              enrolled_course_id: userType === "student" ? courseId || null : null,
              role: userType === "business" ? "seller" : "buyer",
              registration_completed: true,
            },
          ]);

        if (profileError) throw profileError;
      }

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold">
            <span className="text-primary">mwanachuo</span>
            <span className="text-foreground">shop</span>
          </h1>
          <p className="text-muted-foreground mt-2">Join the student marketplace</p>
        </div>

        <div className="bg-card p-8 rounded-md border border-border">
          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="flex bg-muted p-1 rounded-md mb-6">
              <button
                type="button"
                onClick={() => setUserType("student")}
                className={`flex-1 py-2.5 rounded-sm text-sm font-bold transition-all ${userType === "student" ? "bg-card text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`}
              >
                <GraduationCap size={16} className="inline mr-2" />
                Student
              </button>
              <button
                type="button"
                onClick={() => setUserType("business")}
                className={`flex-1 py-2.5 rounded-sm text-sm font-bold transition-all ${userType === "business" ? "bg-card text-foreground border border-border" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Briefcase size={16} className="inline mr-2" />
                Business
              </button>
            </div>

            {userType === "business" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground ml-1">Business Name</label>
                  <div className="relative">
                    <Briefcase size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-md bg-muted border-none text-sm focus:ring-2 focus:ring-primary/30"
                      placeholder="Brand Name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-business-category" className="text-sm font-semibold text-foreground ml-1">Business Category</label>
                  <select
                    id="signup-business-category"
                    required
                    value={businessCategory}
                    onChange={(e) => setBusinessCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-muted border-none text-sm focus:ring-2 focus:ring-primary/30 appearance-none"
                  >
                    <option value="">Select Category</option>
                    {dynamicCategories?.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                    <option value="other">Other</option>
                  </select>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground ml-1">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-md bg-muted border-none text-sm focus:ring-2 focus:ring-primary/30"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="signup-university" className="text-sm font-semibold text-foreground ml-1">University</label>
              <div className="relative">
                <GraduationCap size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <select
                  id="signup-university"
                  required
                  value={universityId}
                  onChange={(e) => setUniversityId(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-md bg-muted border-none text-sm focus:ring-2 focus:ring-primary/30 appearance-none"
                >
                  <option value="">Select your university</option>
                  {universities.map((uni) => (
                    <option key={uni.id} value={uni.id}>
                      {uni.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {userType === "student" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="signup-year" className="text-sm font-semibold text-foreground ml-1">Year of Study</label>
                  <select
                    id="signup-year"
                    required
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-muted border-none text-sm focus:ring-2 focus:ring-primary/30 appearance-none"
                  >
                    <option value="">Select Year</option>
                    {[1, 2, 3, 4, 5, 6, 7].map(year => (
                      <option key={year} value={year}>Year {year}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-semester" className="text-sm font-semibold text-foreground ml-1">Semester</label>
                  <select
                    id="signup-semester"
                    required
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-muted border-none text-sm focus:ring-2 focus:ring-primary/30 appearance-none"
                  >
                    <option value="">Select Semester</option>
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                  </select>
                </div>
              </div>
            )}

            {userType === "student" && (
              <div className="space-y-2">
                <label htmlFor="signup-course" className="text-sm font-semibold text-foreground ml-1">Course / Program</label>
                <div className="relative">
                  <BookOpen size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <select
                    id="signup-course"
                    required
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    disabled={loadingCourses || !universityId}
                    className="w-full pl-10 pr-4 py-3 rounded-md bg-muted border-none text-sm focus:ring-2 focus:ring-primary/30 appearance-none disabled:opacity-50"
                  >
                    <option value="">{loadingCourses ? "Loading courses..." : "Select your course"}</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name} ({course.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground ml-1">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-md bg-muted border-none text-sm focus:ring-2 focus:ring-primary/30"
                  placeholder="name@university.edu"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground ml-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-md bg-muted border-none text-sm focus:ring-2 focus:ring-primary/30"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus size={18} />}
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
