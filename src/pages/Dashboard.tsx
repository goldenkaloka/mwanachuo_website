import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, MapPin, Camera, Save, ArrowLeft, Loader2,
  Package, Wrench, Bed, Plus, Wallet, Bell, Trash2,
  Settings, LayoutDashboard, CreditCard, History,
  TrendingUp, Eye, CheckCircle2, AlertCircle, Clock,
  Menu, X
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useUniversity } from "@/hooks/useUniversity";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Dashboard = () => {
  const { user, profile, signOut, updateProfile } = useAuth();
  const { selectedUniversity, universities, setUniversity } = useUniversity();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Profile Form State
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setPhoneNumber(profile.phone_number || "");
      setBio(profile.bio || "");
    }
  }, [profile]);

  const setActiveTab = (tab: string) => {
    setSearchParams({ tab });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  useEffect(() => {
    console.log('[Dashboard] State change:', {
      hasUser: !!user,
      hasProfile: !!profile,
      loading: !user && !profile
    });
  }, [user, profile]);

  const { data: myListings, isLoading: loadingListings } = useQuery({
    queryKey: ["my-listings", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const [products, services, accommodations] = await Promise.all([
        supabase.from("products").select("*").eq("seller_id", user.id),
        supabase.from("services").select("*").eq("provider_id", user.id),
        supabase.from("accommodations").select("*").eq("owner_id", user.id),
      ]);
      return {
        products: products.data || [],
        services: services.data || [],
        accommodations: accommodations.data || [],
        total: (products.data?.length || 0) + (services.data?.length || 0) + (accommodations.data?.length || 0)
      };
    },
    enabled: !!user,
  });

  const { data: wallet, refetch: refetchWallet } = useQuery({
    queryKey: ["wallet", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("wallets").select("*").eq("user_id", user?.id).maybeSingle();
      const { data: txs } = await supabase.from("wallet_transactions").select("*").eq("wallet_id", user?.id).order('created_at', { ascending: false }).limit(5);
      return { ...data, transactions: txs || [] };
    },
    enabled: !!user?.id,
  });

  const { data: notifications, refetch: refetchNotifications } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("notifications").select("*").eq("user_id", user?.id).order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!user?.id,
  });
  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", id);
      if (error) throw error;
      refetchNotifications();
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("id", id);
      if (error) throw error;
      refetchNotifications();
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };


  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsUpdating(true);
    try {
      await updateProfile({
        full_name: fullName,
        phone_number: phoneNumber,
        bio: bio,
        primary_university_id: selectedUniversity?.id
      });

      toast({
        title: "Profile updated",
        description: "Your profile changes have been saved successfully.",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: error.message || "Could not save profile changes.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) return <Navigate to="/login" replace />;

  const stats = [
    { label: "Active Listings", value: myListings?.total || 0, icon: LayoutDashboard, color: "text-blue-500" },
    { label: "Wallet Balance", value: `TSh ${wallet?.balance?.toLocaleString() || 0}`, icon: Wallet, color: "text-green-500" },
    { label: "Total Views", value: "248", icon: Eye, color: "text-teal-500" }, // Mocked for now
    { label: "New Alerts", value: notifications?.filter(n => !n.is_read).length || 0, icon: Bell, color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0B0E14] flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-midnight border-r border-white/5 h-screen sticky top-0 text-white">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <span className="font-display text-xl font-bold">
              <span className="text-primary">mwanachuo</span>
              <span className="text-white/40">shop</span>
            </span>
          </Link>

          <nav className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "listings", label: "My Listings", icon: Package },
              { id: "wallet", label: "Wallet", icon: Wallet },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "profile", label: "Profile Settings", icon: User },
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => setActiveTab(nav.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-bold transition-all ${activeTab === nav.id
                  ? "bg-primary text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <nav.icon size={18} />
                {nav.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-white/5">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 text-sm text-teal-400 font-bold hover:bg-white/5 w-full px-4 py-3 rounded-md transition-all"
          >
            <ArrowLeft size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 bg-midnight border-b border-white/5 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -ml-2 text-white/70 hover:text-white"
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="font-display text-lg font-bold">
            <span className="text-primary">mwanachuo</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setSearchParams({ tab: "notifications" })} className="relative text-white/70 hover:text-white hover:bg-white/5">
            <Bell size={20} />
            {notifications?.some(n => !n.is_read) && <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />}
          </Button>
          <Avatar className="w-8 h-8 rounded-md" onClick={() => setSearchParams({ tab: "profile" })}>
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback className="bg-primary text-white text-xs">{profile?.full_name?.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-midnight z-[101] shadow-2xl flex flex-col md:hidden text-white"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <Link to="/" className="font-display text-xl font-bold">
                  <span className="text-primary">mwanachuo</span>
                  <span className="text-white/40">shop</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-white/70 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <nav className="space-y-2">
                  {[
                    { id: "overview", label: "Overview", icon: LayoutDashboard },
                    { id: "listings", label: "My Listings", icon: Package },
                    { id: "wallet", label: "Wallet", icon: Wallet },
                    { id: "notifications", label: "Notifications", icon: Bell },
                    { id: "profile", label: "Profile Settings", icon: User },
                  ].map((nav) => (
                    <button
                      key={nav.id}
                      onClick={() => {
                        setSearchParams({ tab: nav.id });
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-bold transition-all ${activeTab === nav.id
                        ? "bg-primary text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      <nav.icon size={18} />
                      {nav.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="mt-auto p-6 border-t border-white/5">
                <div className="flex items-center gap-3 mb-6 p-2">
                  <Avatar className="w-10 h-10 rounded-md">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback className="bg-primary text-white">{profile?.full_name?.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold truncate">{profile?.full_name}</p>
                    <p className="text-[10px] text-white/40 truncate uppercase tracking-widest">{profile?.user_type}</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-bold text-teal-400 hover:bg-white/5 transition-all mt-auto"
                >
                  <ArrowLeft size={18} />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold">Welcome back, {profile?.full_name?.split(' ')[0]}!</h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">Here's what's happening with your account today.</p>
            </div>
            <Link to="/create-listing">
              <Button className="rounded-md px-6 h-12 gap-2">
                <Plus size={18} />
                Add New Listing
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <Card key={i} className="border-none transition-all">
                <CardContent className="p-6">
                  <div className={`p-2 w-10 h-10 rounded-md bg-card border border-border mb-4 flex items-center justify-center ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-xl font-bold mt-1">{stat.value}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* Recent Listings Grid */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold font-display">Recent Activity</h2>
                      <button onClick={() => setActiveTab("listings")} className="text-primary text-sm font-semibold hover:underline">View All</button>
                    </div>
                    {loadingListings ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {[...(myListings?.products || []), ...(myListings?.services || [])].slice(0, 3).map((item: any) => (
                          <div key={item.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-md transition-all group">
                            <div className="w-16 h-16 rounded-md bg-muted overflow-hidden shrink-0">
                              {item.images?.[0] ? <img src={item.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /> : <Package className="w-full h-full p-4 text-muted-foreground" />}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-sm">{item.title}</h4>
                              <p className="text-xs text-muted-foreground mb-1">{item.category}</p>
                              <Badge variant="secondary" className="text-[10px] uppercase tracking-tighter">Active</Badge>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-sm">TSh {item.price?.toLocaleString() || 0}</p>
                              <p className="text-[10px] text-muted-foreground">
                                {item.created_at ? formatDistanceToNow(new Date(item.created_at)) + " ago" : "Just now"}
                              </p>
                            </div>
                          </div>
                        ))}
                        {(!myListings || myListings.total === 0) && (
                          <div className="text-center py-8 text-muted-foreground text-sm">No recent activity</div>
                        )}
                      </div>
                    )}
                  </section>
                </div>

                <div className="space-y-8">
                  {/* Wallet Card Glassmorphism */}
                  <Card className="border-none bg-gradient-to-br from-primary to-accent text-primary-foreground overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                    <CardHeader className="relative z-10">
                      <CardTitle className="text-sm font-medium opacity-80 uppercase tracking-widest">Available Balance</CardTitle>
                      <h3 className="text-3xl font-bold mt-2">TSh {wallet?.balance?.toLocaleString() || '0'}</h3>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-[10px] opacity-70 mb-4 font-mono">**** **** **** {user?.id?.slice(-4)}</p>
                      <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-md font-bold" onClick={() => setActiveTab("wallet")}>
                        Manage Funds
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Recent Notifications */}
                  <Card className="border-none h-full">
                    <CardHeader>
                      <CardTitle className="text-sm font-bold">Recent Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {notifications?.slice(0, 3).map((notif: any) => (
                        <div key={notif.id} className="flex gap-3">
                          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${notif.is_read ? 'bg-muted' : 'bg-primary'}`} />
                          <div>
                            <p className="text-xs font-semibold">{notif.title}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{notif.message}</p>
                          </div>
                        </div>
                      ))}
                      {(!notifications || notifications.length === 0) && (
                        <p className="text-[10px] text-muted-foreground text-center py-4">No new notifications</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {activeTab === "wallet" && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold font-display">Wallet Management</h2>
                    <Card className="bg-card border border-border">
                      <CardHeader>
                        <CardTitle className="text-sm">Quick Top Up</CardTitle>
                        <CardDescription>Add funds to your account via mobile money</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 bg-muted/50 rounded-md border border-dashed flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold uppercase text-primary">M-Pesa / Tigo Pesa</p>
                            <p className="text-sm font-bold mt-1">Paybill: 400700</p>
                            <p className="text-xs text-muted-foreground">Acc: {profile?.phone_number || 'Your Phone Number'}</p>
                          </div>
                          <Button size="sm" variant="outline" className="rounded-sm">Copy</Button>
                        </div>
                        <p className="text-[10px] text-muted-foreground italic">Funds will appear automatically within 5 minutes of payment.</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold font-display mb-6">Recent Transactions</h2>
                    <div className="space-y-3">
                      {wallet?.transactions?.map((tx: any) => (
                        <div key={tx.id} className="flex items-center justify-between p-4 bg-card rounded-md border border-border">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-sm ${tx.type === 'deposit' ? 'bg-green-500/10 text-green-500' : 'bg-teal-500/10 text-teal-500'}`}>
                              {tx.type === 'deposit' ? <TrendingUp size={16} /> : <History size={16} />}
                            </div>
                            <div>
                              <p className="text-xs font-bold capitalize">{tx.description || tx.type}</p>
                              <p className="text-[10px] text-muted-foreground">{new Date(tx.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <p className={`text-xs font-bold ${tx.type === 'deposit' ? 'text-green-500' : 'text-teal-500'}`}>
                            {tx.type === 'deposit' ? '+' : '-'} {tx.amount.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "listings" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold font-display">Manage Your Listings</h2>
                  <Badge variant="outline" className="text-xs uppercase px-3">{myListings?.total} total</Badge>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...(myListings?.products || []), ...(myListings?.services || []), ...(myListings?.accommodations || [])].map((item: any) => {
                    const detailLink = item.seller_id ? `/product/${item.id}` :
                      item.provider_id ? `/service/${item.id}` :
                        `/accommodation/${item.id}`;

                    return (
                      <Card key={item.id} className="group overflow-hidden border-border hover:border-primary/50 transition-all">
                        <Link to={detailLink}>
                          <div className="aspect-video relative overflow-hidden bg-muted">
                            {item.images?.[0] ? <img src={item.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : <Package className="w-full h-full p-8 text-muted-foreground opacity-50" />}
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-white/90 text-foreground font-bold backdrop-blur-sm border-none">
                                {item.is_active ? <CheckCircle2 size={12} className="mr-1 text-green-500" /> : <AlertCircle size={12} className="mr-1 text-teal-500" />}
                                {item.is_active ? 'Visible' : 'Inactive'}
                              </Badge>
                            </div>
                          </div>
                          <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-sm font-bold line-clamp-1">{item.title || item.name}</CardTitle>
                              <p className="text-xs font-bold text-primary">TSh {item.price?.toLocaleString()}</p>
                            </div>
                            <CardDescription className="text-[10px] uppercase font-bold tracking-widest pt-1">{item.category || item.type || 'Listing'}</CardDescription>
                          </CardHeader>
                        </Link>
                        <CardContent className="p-4 pt-0 flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 rounded-sm h-8 text-[10px]">Edit</Button>
                          <Button variant="outline" size="sm" className="rounded-sm h-8 px-2 text-destructive"><Trash2 size={12} /></Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold font-display">Notifications</h2>
                  <Button variant="ghost" size="sm" className="text-xs">Mark all as read</Button>
                </div>
                {notifications?.map((notif: any) => (
                  <div key={notif.id} className={`p-4 rounded-md border transition-all flex gap-4 ${notif.is_read ? 'bg-card border-border' : 'bg-primary/5 border-primary/20'}`}>
                    <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${notif.is_read ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'}`}>
                      <Bell size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold">{notif.title}</h4>
                        <p className="text-[10px] text-muted-foreground">{formatDistanceToNow(new Date(notif.created_at))} ago</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{notif.message}</p>
                      {!notif.is_read && (
                        <button onClick={() => markAsRead(notif.id)} className="text-[10px] text-primary font-bold mt-2 hover:underline">Mark as read</button>
                      )}
                    </div>
                    <button onClick={() => deleteNotification(notif.id)} className="text-muted-foreground hover:text-destructive self-start p-1"><Trash2 size={14} /></button>
                  </div>
                ))}
                {(!notifications || notifications.length === 0) && (
                  <div className="text-center py-20 text-muted-foreground">
                    <Bell size={48} className="mx-auto mb-4 opacity-10" />
                    <p className="font-medium text-sm">You have no notifications yet.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "profile" && (
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl">
                <Card className="border-none overflow-hidden">
                  <div className="h-24 bg-gradient-to-r from-primary/10 to-accent/10" />
                  <CardContent className="p-8 -mt-12">
                    <div className="flex flex-col md:flex-row gap-6 items-end mb-8">
                      <div className="relative">
                        <Avatar className="w-24 h-24 border-4 border-card">
                          <AvatarImage src={profile?.avatar_url} />
                          <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">{profile?.full_name?.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <button className="absolute bottom-0 right-0 p-2 rounded-sm bg-primary text-primary-foreground"><Camera size={14} /></button>
                      </div>
                      <div className="flex-1 pb-1">
                        <h3 className="text-xl font-bold">{profile?.full_name}</h3>
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">{profile?.user_type}</p>
                      </div>
                    </div>

                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
                          <Input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="rounded-md h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Phone Number</label>
                          <Input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="rounded-md h-11"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">University</label>
                        <select
                          value={selectedUniversity?.id || ""}
                          onChange={(e) => {
                            const uni = universities.find(u => u.id === e.target.value);
                            if (uni) setUniversity(uni);
                          }}
                          className="w-full px-3 py-2 rounded-md bg-muted border-none text-sm focus:ring-2 focus:ring-primary/30 h-11 appearance-none"
                        >
                          <option value="">Select University</option>
                          {universities.map((uni) => (
                            <option key={uni.id} value={uni.id}>{uni.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
                        <Input value={user?.email || ""} disabled className="rounded-md h-11 opacity-50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Biography</label>
                        <Input
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Tell others about yourself..."
                          className="rounded-md h-11"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isUpdating}
                        className="w-full rounded-md h-12 font-bold mt-4"
                      >
                        {isUpdating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Profile Changes"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
