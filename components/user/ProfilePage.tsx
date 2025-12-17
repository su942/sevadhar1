
import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, CreditCard, Edit2, Check, X, LogOut, Plus, Trash2, Camera, Briefcase, Home, Building2, ChevronRight } from 'lucide-react';
import { authStore } from '../../lib/store/auth-store';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  label: string;
  details: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi';
  last4?: string;
  upiId?: string;
  label: string;
  brand?: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState(authStore.currentUser || { name: '', phone: '', email: '', photo: '', addresses: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ 
    name: user.name || '', 
    phone: user.phone || '', 
    email: user.email || '' 
  });
  
  const [isProvider, setIsProvider] = useState(authStore.currentUser?.isProvider || false);

  // Address Editing State - Initialize from user profile
  const [addresses, setAddresses] = useState<Address[]>(user.addresses || []);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [tempAddress, setTempAddress] = useState<Address | null>(null);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    // Subscribe to store changes
    const unsubscribe = authStore.subscribe(() => {
        setIsProvider(authStore.currentUser?.isProvider || false);
        const currentUser = authStore.currentUser;
        if (currentUser) {
            setUser(currentUser);
            setEditForm({
                name: currentUser.name || '',
                phone: currentUser.phone || '',
                email: currentUser.email || ''
            });
            // Update local addresses if changed externally, but only if not currently editing
            if (!editingAddressId) {
                setAddresses(currentUser.addresses || []);
            }
        }
    });
    return unsubscribe;
  }, [editingAddressId]);


  const handleSaveProfile = () => {
    const updatedUser = { ...user, ...editForm };
    authStore.updateUser(updatedUser);
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleLogout = () => {
    authStore.logout();
  };

  const handleBecomePartner = () => {
      authStore.upgradeToProvider();
  };

  // Address Handlers
  const handleEditAddress = (addr: Address) => {
    setEditingAddressId(addr.id);
    setTempAddress({ ...addr });
  };

  const handleSaveAddress = () => {
    if (tempAddress) {
        const newAddresses = addresses.map(a => a.id === tempAddress.id ? tempAddress : a);
        setAddresses(newAddresses);
        authStore.updateUser({ addresses: newAddresses }); // Persist to store
        setEditingAddressId(null);
        setTempAddress(null);
    }
  };

  const handleCancelEditAddress = () => {
      setEditingAddressId(null);
      setTempAddress(null);
  };

  const handleDeleteAddress = (id: string) => {
    const newAddresses = addresses.filter(a => a.id !== id);
    setAddresses(newAddresses);
    authStore.updateUser({ addresses: newAddresses }); // Persist to store
    if (editingAddressId === id) {
        setEditingAddressId(null);
        setTempAddress(null);
    }
  };

  const handleAddAddress = () => {
    const newAddr: Address = {
        id: Math.random().toString(),
        type: 'home',
        label: 'Home',
        details: ''
    };
    const newAddresses = [...addresses, newAddr];
    setAddresses(newAddresses);
    authStore.updateUser({ addresses: newAddresses }); // Persist initial placeholder
    
    // Enter edit mode immediately
    setEditingAddressId(newAddr.id);
    setTempAddress(newAddr);
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
       {/* Header */}
       <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-sm text-gray-500">Manage your personal information</p>
         </div>
         <Button variant="ghost" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
           <LogOut size={18} className="mr-2" /> Logout
         </Button>
       </div>

       {/* Provider Switch/Register Banner */}
       {isProvider ? (
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white flex flex-col sm:flex-row justify-between items-center shadow-lg gap-4">
              <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                     <Briefcase size={24} />
                  </div>
                  <div>
                      <h3 className="font-bold text-lg">Partner Account Active</h3>
                      <p className="text-blue-100 text-sm">Switch to dashboard to manage your jobs</p>
                  </div>
              </div>
              <Button 
                onClick={() => authStore.switchRole('provider')}
                className="bg-white text-blue-800 hover:bg-blue-50 border-none font-bold shadow-sm w-full sm:w-auto"
              >
                  Go to Dashboard <ChevronRight size={16} className="ml-1" />
              </Button>
          </div>
       ) : (
          <button 
            onClick={handleBecomePartner} 
            className="w-full text-left bg-gray-900 rounded-xl p-5 text-white shadow-lg cursor-pointer hover:bg-gray-800 transition-colors group relative overflow-hidden"
          >
               <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
               <div className="flex items-center gap-4 relative z-10">
                   <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                       <Briefcase size={24} className="text-white" />
                   </div>
                   <div className="flex-1">
                       <h3 className="font-bold text-lg">Become a Partner</h3>
                       <p className="text-gray-400 text-sm">Join Sevadhar, offer services & earn money.</p>
                   </div>
                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <ChevronRight className="text-white" size={18} />
                   </div>
               </div>
          </button>
       )}

       {/* Personal Details */}
       <Card>
         <CardHeader className="flex flex-row justify-between items-center py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <User size={20} className="text-[#FF6B35]" /> Personal Details
            </h3>
            {!isEditing ? (
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)} className="text-[#FF6B35] hover:text-orange-700 hover:bg-orange-50">
                <Edit2 size={16} className="mr-2" /> Edit
              </Button>
            ) : (
               <div className="flex gap-2">
                 <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)} className="text-gray-500"><X size={18}/></Button>
                 <Button size="sm" variant="primary" onClick={handleSaveProfile} className="h-8 px-4"><Check size={18} className="mr-1"/> Save</Button>
               </div>
            )}
         </CardHeader>
         <CardContent className="p-6">
             <div className="flex flex-col md:flex-row gap-6 items-start">
                 {/* Avatar */}
                 <div className="relative group mx-auto md:mx-0">
                     <div className="w-24 h-24 rounded-full bg-orange-100 overflow-hidden border-4 border-white shadow-lg flex items-center justify-center">
                         {user.photo ? (
                             <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
                         ) : (
                             <div className="w-full h-full flex items-center justify-center text-[#FF6B35] text-3xl font-bold">
                                 {user.name ? user.name[0].toUpperCase() : <User size={40} />}
                             </div>
                         )}
                     </div>
                     {isEditing && (
                         <button className="absolute bottom-0 right-0 p-2 bg-gray-900 text-white rounded-full hover:bg-black transition-colors shadow-md">
                             <Camera size={14} />
                         </button>
                     )}
                 </div>

                 {/* Fields */}
                 <div className="flex-1 w-full space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="space-y-1">
                             <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                             {isEditing ? (
                                 <input 
                                    type="text" 
                                    value={editForm.name} 
                                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                    placeholder="Enter your name"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                                 />
                             ) : (
                                 <p className="font-semibold text-gray-900 text-lg">{user.name || <span className="text-gray-400 italic font-normal">Add your name</span>}</p>
                             )}
                         </div>

                         <div className="space-y-1">
                             <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                             {isEditing ? (
                                 <input 
                                    type="text" 
                                    value={editForm.phone} 
                                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                                 />
                             ) : (
                                 <p className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                                     <Phone size={16} className="text-gray-400" /> {user.phone}
                                     <Badge variant="success" className="ml-2">Verified</Badge>
                                 </p>
                             )}
                         </div>

                         <div className="space-y-1 md:col-span-2">
                             <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                             {isEditing ? (
                                 <input 
                                    type="email" 
                                    value={editForm.email} 
                                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                    placeholder="Enter email address"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                                 />
                             ) : (
                                 <p className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                                     <Mail size={16} className="text-gray-400" /> {user.email || <span className="text-gray-400 italic font-normal text-sm">Add email address</span>}
                                 </p>
                             )}
                         </div>
                     </div>
                 </div>
             </div>
         </CardContent>
       </Card>

       {/* Addresses */}
       <Card>
          <CardHeader className="flex flex-row justify-between items-center py-4 border-b border-gray-100">
             <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                 <MapPin size={20} className="text-[#FF6B35]" /> Saved Addresses
             </h3>
             <Button size="sm" variant="secondary" onClick={handleAddAddress} className="h-8"><Plus size={16} className="mr-1"/> Add New</Button>
          </CardHeader>
          <CardContent className="p-0">
             {addresses.length === 0 ? (
                 <div className="p-8 text-center flex flex-col items-center justify-center text-gray-400">
                     <MapPin size={32} className="mb-2 opacity-50" />
                     <p className="text-sm">No saved addresses yet.</p>
                     <p className="text-xs mt-1">Add your home or work address for faster booking.</p>
                 </div>
             ) : (
                 addresses.map((addr, idx) => (
                     <div key={addr.id} className={`p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors ${idx !== addresses.length -1 ? 'border-b border-gray-100' : ''}`}>
                         <div className={`p-2 rounded-lg shrink-0 ${addr.type === 'home' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                             {addr.type === 'home' ? <Home size={20} /> : <Building2 size={20} />}
                         </div>
                         
                         {editingAddressId === addr.id && tempAddress ? (
                             <div className="flex-1 space-y-3">
                                 <input
                                    value={tempAddress.label}
                                    onChange={e => setTempAddress({...tempAddress, label: e.target.value})}
                                    className="border p-2 rounded-lg w-full text-sm font-bold focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                                    placeholder="Label (e.g. Home, Office)"
                                 />
                                 <textarea
                                    value={tempAddress.details}
                                    onChange={e => setTempAddress({...tempAddress, details: e.target.value})}
                                    className="border p-2 rounded-lg w-full text-sm focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                                    placeholder="Full Address Details"
                                    rows={2}
                                 />
                                 <div className="flex gap-2">
                                    <Button size="sm" onClick={handleSaveAddress} className="h-8"><Check size={14} className="mr-1"/> Save</Button>
                                    <Button size="sm" variant="ghost" onClick={handleCancelEditAddress} className="h-8"><X size={14} className="mr-1"/> Cancel</Button>
                                 </div>
                             </div>
                         ) : (
                             <div className="flex-1">
                                 <div className="flex justify-between items-start">
                                     <h4 className="font-bold text-gray-900">{addr.label}</h4>
                                     <div className="flex gap-2">
                                         <button onClick={() => handleEditAddress(addr)} className="text-gray-400 hover:text-[#FF6B35] p-1 rounded-md hover:bg-orange-50 transition-colors"><Edit2 size={14}/></button>
                                         <button onClick={() => handleDeleteAddress(addr.id)} className="text-gray-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors"><Trash2 size={14}/></button>
                                     </div>
                                 </div>
                                 <p className="text-sm text-gray-600 mt-1">{addr.details}</p>
                             </div>
                         )}
                     </div>
                 ))
             )}
          </CardContent>
       </Card>
    </div>
  );
};

export default ProfilePage;
