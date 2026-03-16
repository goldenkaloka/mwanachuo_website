import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { UniversityProvider } from "@/hooks/useUniversity";
import { ProtectedRoute } from "./components/ProtectedRoute";
import PageLoader from "./components/PageLoader";

// Lazy-load pages for better initial loading performance
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const AccommodationDetail = lazy(() => import("./pages/AccommodationDetail"));
const ListingForm = lazy(() => import("./pages/ListingForm"));
const ExploreProducts = lazy(() => import("./pages/ExploreProducts"));
const ExploreServices = lazy(() => import("./pages/ExploreServices"));
const ExploreAccommodations = lazy(() => import("./pages/ExploreAccommodations"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <UniversityProvider>
          <Toaster />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/service/:id" element={<ServiceDetail />} />
                <Route path="/accommodation/:id" element={<AccommodationDetail />} />
                <Route path="/create-listing" element={
                  <ProtectedRoute>
                    <ListingForm />
                  </ProtectedRoute>
                } />
                <Route path="/products" element={<ExploreProducts />} />
                <Route path="/services" element={<ExploreServices />} />
                <Route path="/accommodations" element={<ExploreAccommodations />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </UniversityProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
