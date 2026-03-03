import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { UniversityProvider } from "@/hooks/useUniversity";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetail from "./pages/ProductDetail";
import ServiceDetail from "./pages/ServiceDetail";
import AccommodationDetail from "./pages/AccommodationDetail";
import ListingForm from "./pages/ListingForm";
import ExploreProducts from "./pages/ExploreProducts";
import ExploreServices from "./pages/ExploreServices";
import ExploreAccommodations from "./pages/ExploreAccommodations";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <UniversityProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UniversityProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
