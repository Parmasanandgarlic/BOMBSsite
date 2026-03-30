import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User as UserIcon, LogOut, Package, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AccountProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Account({ isOpen, onClose }: AccountProps) {
  const { user, userProfile, isAuthReady, loginWithGoogle, loginWithEmail, signupWithEmail, logout, updateShippingData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (userProfile?.shippingData) {
      setFormData(userProfile.shippingData);
    }
  }, [userProfile]);

  // Real-time email validation
  useEffect(() => {
    if (email) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setEmailError(isValidEmail ? '' : 'Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  }, [email]);

  // Real-time password validation
  useEffect(() => {
    if (password) {
      setPasswordError(password.length >= 6 ? '' : 'Password must be at least 6 characters.');
    } else {
      setPasswordError('');
    }
  }, [password]);

  const validateShippingField = (name: string, value: string) => {
    let error = '';
    if (!value.trim()) {
      error = 'This field is required.';
    } else {
      switch (name) {
        case 'zip':
          if (!/^\d{5}(-\d{4})?$/.test(value)) {
            error = 'Please enter a valid ZIP code.';
          }
          break;
        case 'fullName':
        case 'address':
        case 'city':
        case 'state':
        case 'country':
          if (value.trim().length < 2) {
            error = 'Must be at least 2 characters.';
          }
          break;
      }
    }
    setShippingErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateShippingField(name, value);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before saving
    let isValid = true;
    Object.entries(formData).forEach(([key, value]) => {
      if (!validateShippingField(key, value)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    setIsSaving(true);
    try {
      await updateShippingData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save shipping data", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (emailError || passwordError || !email || !password) {
      return;
    }

    setAuthError('');
    setIsAuthenticating(true);
    try {
      if (isLoginMode) {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password);
      }
    } catch (error: any) {
      setAuthError(error.message || "Authentication failed");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const isAuthFormValid = email && password && !emailError && !passwordError;
  const isShippingFormValid = Object.values(shippingErrors).every(err => err === '') && Object.values(formData).every(val => val.trim() !== '');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-50 shadow-2xl border-l-4 border-black flex flex-col"
          >
            <div className="p-6 border-b-4 border-black flex justify-between items-center bg-black text-white">
              <h2 className="text-2xl font-black italic uppercase tracking-widest flex items-center gap-2">
                <UserIcon size={24} />
                Syndicate ID
              </h2>
              <button onClick={onClose} className="hover:text-gray-300 transition-colors">
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!isAuthReady ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                </div>
              ) : !user ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                  <Package size={64} className="text-gray-300" />
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-widest mb-2">Identify Yourself</h3>
                    <p className="text-gray-500 text-sm">Sign in to access your syndicate profile and save shipping intel.</p>
                  </div>
                  
                  <form onSubmit={handleEmailAuth} className="w-full space-y-4 text-left">
                    {authError && (
                      <div className="bg-red-100 text-red-700 p-3 text-sm border-2 border-red-700 flex items-start gap-2">
                        <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                        <span>{authError}</span>
                      </div>
                    )}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-1">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full border-2 p-2 focus:outline-none focus:ring-2 focus:ring-black transition-colors ${emailError ? 'border-red-500 bg-red-50' : 'border-black'}`}
                        required
                      />
                      {emailError && (
                        <p className="text-red-500 text-xs mt-1 font-bold flex items-center gap-1">
                          <AlertCircle size={12} /> {emailError}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-1">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full border-2 p-2 focus:outline-none focus:ring-2 focus:ring-black transition-colors ${passwordError ? 'border-red-500 bg-red-50' : 'border-black'}`}
                        required
                      />
                      {passwordError && (
                        <p className="text-red-500 text-xs mt-1 font-bold flex items-center gap-1">
                          <AlertCircle size={12} /> {passwordError}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isAuthenticating || !isAuthFormValid}
                      className="w-full bg-black text-white py-4 font-black uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors border-4 border-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAuthenticating ? 'Processing...' : (isLoginMode ? 'Sign In' : 'Sign Up')}
                    </button>
                  </form>

                  <div className="w-full flex items-center justify-between">
                    <hr className="w-full border-black" />
                    <span className="px-4 text-xs font-bold uppercase tracking-widest text-gray-500">OR</span>
                    <hr className="w-full border-black" />
                  </div>

                  <button
                    onClick={loginWithGoogle}
                    className="w-full bg-white text-black py-4 font-black uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors border-4 border-black"
                  >
                    Continue with Google
                  </button>
                  
                  <button
                    onClick={() => {
                      setIsLoginMode(!isLoginMode);
                      setAuthError('');
                      setEmailError('');
                      setPasswordError('');
                    }}
                    className="text-xs font-bold uppercase tracking-widest underline hover:text-gray-500"
                  >
                    {isLoginMode ? "Need an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                  
                  <p className="text-xs text-gray-400 mt-4">
                    Note: Email/Password sign-up requires manual activation in the Firebase Console under Authentication &gt; Sign-in method.
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="bg-gray-100 p-4 border-2 border-black">
                    <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">Authenticated As</p>
                    <p className="font-black truncate">{user.email}</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-black uppercase tracking-widest">Shipping Intel</h3>
                      {!isEditing && (
                        <button 
                          onClick={() => setIsEditing(true)}
                          className="text-xs font-bold uppercase tracking-widest underline hover:text-gray-500"
                        >
                          Edit
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <form onSubmit={handleSave} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest mb-1">Full Name</label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className={`w-full border-2 p-2 focus:outline-none focus:ring-2 focus:ring-black transition-colors ${shippingErrors.fullName ? 'border-red-500 bg-red-50' : 'border-black'}`}
                            required
                          />
                          {shippingErrors.fullName && (
                            <p className="text-red-500 text-xs mt-1 font-bold flex items-center gap-1">
                              <AlertCircle size={12} /> {shippingErrors.fullName}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest mb-1">Address</label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className={`w-full border-2 p-2 focus:outline-none focus:ring-2 focus:ring-black transition-colors ${shippingErrors.address ? 'border-red-500 bg-red-50' : 'border-black'}`}
                            required
                          />
                          {shippingErrors.address && (
                            <p className="text-red-500 text-xs mt-1 font-bold flex items-center gap-1">
                              <AlertCircle size={12} /> {shippingErrors.address}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-1">City</label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className={`w-full border-2 p-2 focus:outline-none focus:ring-2 focus:ring-black transition-colors ${shippingErrors.city ? 'border-red-500 bg-red-50' : 'border-black'}`}
                              required
                            />
                            {shippingErrors.city && (
                              <p className="text-red-500 text-xs mt-1 font-bold flex items-center gap-1">
                                <AlertCircle size={12} /> {shippingErrors.city}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-1">State</label>
                            <input
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              className={`w-full border-2 p-2 focus:outline-none focus:ring-2 focus:ring-black transition-colors ${shippingErrors.state ? 'border-red-500 bg-red-50' : 'border-black'}`}
                              required
                            />
                            {shippingErrors.state && (
                              <p className="text-red-500 text-xs mt-1 font-bold flex items-center gap-1">
                                <AlertCircle size={12} /> {shippingErrors.state}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-1">ZIP</label>
                            <input
                              type="text"
                              name="zip"
                              value={formData.zip}
                              onChange={handleInputChange}
                              className={`w-full border-2 p-2 focus:outline-none focus:ring-2 focus:ring-black transition-colors ${shippingErrors.zip ? 'border-red-500 bg-red-50' : 'border-black'}`}
                              required
                            />
                            {shippingErrors.zip && (
                              <p className="text-red-500 text-xs mt-1 font-bold flex items-center gap-1">
                                <AlertCircle size={12} /> {shippingErrors.zip}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-1">Country</label>
                            <input
                              type="text"
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              className={`w-full border-2 p-2 focus:outline-none focus:ring-2 focus:ring-black transition-colors ${shippingErrors.country ? 'border-red-500 bg-red-50' : 'border-black'}`}
                              required
                            />
                            {shippingErrors.country && (
                              <p className="text-red-500 text-xs mt-1 font-bold flex items-center gap-1">
                                <AlertCircle size={12} /> {shippingErrors.country}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-4 pt-4">
                          <button
                            type="button"
                            onClick={() => {
                              setIsEditing(false);
                              setShippingErrors({});
                              if (userProfile?.shippingData) setFormData(userProfile.shippingData);
                            }}
                            className="flex-1 py-3 border-2 border-black font-black uppercase tracking-widest text-sm hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSaving || !isShippingFormValid}
                            className="flex-1 py-3 bg-black text-white border-2 border-black font-black uppercase tracking-widest text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSaving ? 'Saving...' : 'Save'}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="bg-gray-50 p-4 border-2 border-black space-y-2">
                        {userProfile?.shippingData ? (
                          <>
                            <p className="font-bold">{userProfile.shippingData.fullName}</p>
                            <p>{userProfile.shippingData.address}</p>
                            <p>{userProfile.shippingData.city}, {userProfile.shippingData.state} {userProfile.shippingData.zip}</p>
                            <p>{userProfile.shippingData.country}</p>
                          </>
                        ) : (
                          <p className="text-gray-500 italic text-sm">No shipping intel on file.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {user && (
              <div className="p-6 border-t-4 border-black">
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 py-4 border-4 border-black font-black uppercase tracking-widest text-sm hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
                >
                  <LogOut size={18} />
                  Disconnect
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
