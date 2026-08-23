import React, { useState } from 'react';
import { CheckCircle2, Eye, EyeOff } from 'lucide-react';

// Splash Screen
const SplashScreen = ({ onStart }: { onStart: () => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-200 to-cyan-300 flex flex-col items-center justify-center p-4">
    <div className="text-center mb-12">
      <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-3xl flex items-center justify-center border-4 border-cyan-300 shadow-2xl">
        <div className="text-5xl">🧠</div>
      </div>
      <h1 className="text-5xl font-bold text-gray-900 mb-2">AssessAI</h1>
      <p className="text-xl text-gray-700 mb-2">dz</p>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-powered assessment platform</h2>
      <p className="text-lg text-gray-700 mb-2">منصة تقييم مدعومة بالذكاء الاصطناعي</p>
      <p className="text-sm text-red-600 font-semibold">Aligned with English national syllabus</p>
      <p className="text-sm text-red-600 mb-8">متوافق مع المنهاج الوطني للغة الإنجليزية</p>
    </div>
    <button
      onClick={onStart}
      className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white font-bold py-4 px-12 rounded-full text-lg transition transform hover:scale-105 flex items-center gap-2"
    >
      Start <span className="text-xl">›</span>
    </button>
    <button
      onClick={onStart}
      className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white font-bold py-4 px-12 rounded-full text-lg transition transform hover:scale-105 flex items-center gap-2 mt-4"
    >
      ابدأ <span className="text-xl">›</span>
    </button>
  </div>
);

// Home Screen
const HomeScreen = ({ onSelectRole }: { onSelectRole: (role: string) => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-200 to-cyan-300 flex flex-col items-center justify-center p-4">
    <h1 className="text-5xl font-bold text-gray-900 mb-2">Welcome!</h1>
    <p className="text-2xl text-green-700 font-semibold mb-12">مرحباً بك!</p>

    <div className="grid md:grid-cols-2 gap-8 w-full max-w-2xl">
      {/* Parent Card */}
      <div
        onClick={() => onSelectRole('parent')}
        className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl cursor-pointer transform hover:scale-105 transition"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-5xl mb-4">👩‍👧</div>
            <h2 className="text-3xl font-bold text-green-700">Learner's Parent</h2>
            <p className="text-lg text-green-600">أنا ولي أمر متعلم</p>
          </div>
          <div className="bg-green-500 text-white rounded-full p-4 text-2xl">›</div>
        </div>
      </div>

      {/* Teacher Card */}
      <div
        onClick={() => onSelectRole('teacher')}
        className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl cursor-pointer transform hover:scale-105 transition"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-5xl mb-4">👨‍🏫</div>
            <h2 className="text-3xl font-bold text-blue-700">Teacher</h2>
            <p className="text-lg text-blue-600">أنا معلم</p>
          </div>
          <div className="bg-blue-500 text-white rounded-full p-4 text-2xl">›</div>
        </div>
      </div>
    </div>
  </div>
);

// Registration Form Component
const RegistrationForm = ({
  title,
  subtitle,
  onSubmit,
  onBack,
  buttonColor = 'bg-blue-600',
}: {
  title: string;
  subtitle: string;
  onSubmit: (data: any) => void;
  onBack: () => void;
  buttonColor?: string;
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          newErrors.fullName = 'Full name is required';
        } else {
          delete newErrors.fullName;
        }
        break;
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!validateEmail(value)) {
          newErrors.email = 'Please enter a valid email';
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        } else {
          delete newErrors.password;
        }
        break;
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Please confirm password';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, value);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const isBgGreen = buttonColor === 'bg-green-600';

  return (
    <div className={`min-h-screen bg-gradient-to-br flex flex-col items-center justify-center p-4 ${
      isBgGreen 
        ? 'from-green-50 to-green-100' 
        : 'from-blue-100 to-cyan-100'
    }`}>
      <button
        onClick={onBack}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 text-2xl"
      >
        ←
      </button>

      <h1 className={`text-5xl font-bold mb-2 text-center ${isBgGreen ? 'text-green-700' : 'text-blue-700'}`}>
        {title}
      </h1>
      <p className={`text-lg mb-8 text-center max-w-md ${isBgGreen ? 'text-green-600' : 'text-blue-600'}`}>
        {subtitle}
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        {/* Full Name */}
        <div className="relative">
          <div className="absolute left-4 top-4 text-blue-600 text-2xl">👤</div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full pl-12 pr-4 py-3 border-2 rounded-2xl focus:outline-none transition ${
              errors.fullName && touched.fullName
                ? 'border-red-500 focus:border-red-600'
                : 'border-gray-300 focus:border-blue-500'
            }`}
          />
          {errors.fullName && touched.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div className="relative">
          <div className="absolute left-4 top-4 text-blue-600 text-2xl">✉️</div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full pl-12 pr-4 py-3 border-2 rounded-2xl focus:outline-none transition ${
              errors.email && touched.email
                ? 'border-red-500 focus:border-red-600'
                : 'border-gray-300 focus:border-blue-500'
            }`}
          />
          {errors.email && touched.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="relative">
          <div className="absolute left-4 top-4 text-blue-600 text-2xl">🔒</div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full pl-12 pr-12 py-3 border-2 rounded-2xl focus:outline-none transition ${
              errors.password && touched.password
                ? 'border-red-500 focus:border-red-600'
                : 'border-gray-300 focus:border-blue-500'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3 text-blue-600 hover:text-blue-800 transition"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <Eye size={24} /> : <EyeOff size={24} />}
          </button>
          {errors.password && touched.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <div className="absolute left-4 top-4 text-blue-600 text-2xl">🔒</div>
          <input
            type={showConfirm ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full pl-12 pr-12 py-3 border-2 rounded-2xl focus:outline-none transition ${
              errors.confirmPassword && touched.confirmPassword
                ? 'border-red-500 focus:border-red-600'
                : 'border-gray-300 focus:border-blue-500'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 top-3 text-blue-600 hover:text-blue-800 transition"
            title={showConfirm ? 'Hide password' : 'Show password'}
          >
            {showConfirm ? <Eye size={24} /> : <EyeOff size={24} />}
          </button>
          {errors.confirmPassword && touched.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        {/* Terms */}
        <div className="flex items-center gap-3 p-3 bg-white bg-opacity-50 rounded-lg">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={formData.agreeTerms}
            onChange={(e) => {
              setFormData({ ...formData, agreeTerms: e.target.checked });
              setTouched({ ...touched, agreeTerms: true });
            }}
            className="w-6 h-6 cursor-pointer"
          />
          <label htmlFor="agreeTerms" className="text-gray-700 cursor-pointer">
            I agree to the <span className="text-blue-600 font-semibold">Terms of Service</span>
          </label>
        </div>
        {errors.agreeTerms && touched.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full ${buttonColor} text-white font-bold py-3 rounded-2xl hover:opacity-90 transition mt-6 active:scale-95`}
        >
          Create Account
        </button>

        <div className="text-center text-gray-600 py-2">or</div>
        <button
          type="button"
          onClick={onBack}
          className="w-full text-center text-blue-600 font-semibold hover:underline"
        >
          Already have an account? Sign In
        </button>
      </form>
    </div>
  );
};

// Learner Screen
const LearnerScreen = ({ onBack }: { onBack: () => void }) => {
  const [classCode, setClassCode] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [classCodeError, setClassCodeError] = useState('');

  const avatars = ['👧', '👦', '👧🧕', '👦🤓', '👧🎀'];
  const moods = [
    { emoji: '😊', label: 'Happy', ar: 'سعيد' },
    { emoji: '😢', label: 'Sad', ar: 'حزين' },
    { emoji: '😄', label: 'Excited', ar: 'متحمس' },
    { emoji: '😟', label: 'Worried', ar: 'قلق' },
    { emoji: '😌', label: 'Calm', ar: 'هادئ' },
    { emoji: '😴', label: 'Tired', ar: 'متعب' },
    { emoji: '😠', label: 'Frustrated', ar: 'محبط' },
  ];

  const handleClassCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setClassCode(value);
    if (value.trim()) {
      setClassCodeError('');
    }
  };

  const handleJoinClass = () => {
    if (!classCode.trim()) {
      setClassCodeError('Please enter a class code');
      return;
    }
    if (selectedAvatar === null) {
      alert('Please select an avatar');
      return;
    }
    if (selectedMood === null) {
      alert('Please select how you are feeling');
      return;
    }
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onBack();
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-cyan-100 flex items-center justify-center p-4">
        <div className="text-center">
          <CheckCircle2 className="w-24 h-24 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-green-700 mb-2">Success!</h1>
          <p className="text-lg text-green-600">You've joined the class</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cyan-50 p-4">
      <button
        onClick={onBack}
        className="mb-4 text-gray-600 hover:text-gray-900 text-2xl"
      >
        ←
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Empowering Every Learner 🌿</h1>
        <p className="text-lg text-gray-700 mb-8">Welcome! Let's learn together. 🌿</p>

        {/* Join Class Section */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🔒</span>
            <h2 className="text-2xl font-bold">Welcome! Let's learn together. 🌿</h2>
          </div>
          <input
            type="text"
            placeholder="Enter your class code"
            value={classCode}
            onChange={handleClassCodeChange}
            className={`w-full px-4 py-3 border-2 rounded-2xl mb-2 focus:outline-none transition ${
              classCodeError
                ? 'border-red-500 focus:border-red-600'
                : 'border-gray-300 focus:border-green-500'
            }`}
          />
          {classCodeError && <p className="text-red-500 text-sm mb-3">{classCodeError}</p>}
          <button
            onClick={handleJoinClass}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-2xl transition flex items-center justify-center gap-2 active:scale-95"
          >
            🚀 Join Class
          </button>
          <p className="text-center text-gray-600 text-sm mt-4">
            Class code not working? <span className="text-blue-600 cursor-pointer">Contact admins</span>
          </p>
        </div>

        {/* Avatar Selection */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Choose Your Avatar 🌿</h3>
          <div className="flex gap-4 justify-center flex-wrap">
            {avatars.map((avatar, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAvatar(idx)}
                className={`text-5xl p-4 rounded-3xl transition transform hover:scale-110 active:scale-95 ${
                  selectedAvatar === idx 
                    ? 'bg-green-200 ring-4 ring-green-500 scale-110' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                title={`Avatar ${idx + 1}`}
              >
                {avatar}
              </button>
            ))}
          </div>
          {selectedAvatar !== null && <p className="text-center text-green-600 mt-2">✓ Avatar selected</p>}
        </div>

        {/* Mood Selection */}
        <div>
          <h3 className="text-2xl font-bold mb-2">How are you feeling today?</h3>
          <p className="text-gray-600 mb-4">Your feelings matter.</p>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {moods.map((mood, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <button
                  onClick={() => setSelectedMood(idx)}
                  className={`text-4xl p-3 rounded-full transition transform hover:scale-110 active:scale-95 ${
                    selectedMood === idx 
                      ? 'ring-4 ring-blue-500 scale-110 bg-blue-100' 
                      : 'hover:bg-gray-100'
                  }`}
                  title={mood.label}
                >
                  {mood.emoji}
                </button>
                <p className="text-xs text-gray-600 mt-1 text-center">{mood.label}</p>
              </div>
            ))}
          </div>
          {selectedMood !== null && <p className="text-center text-green-600 mt-3">✓ Mood selected: {moods[selectedMood].label}</p>}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {[
            { icon: '🎧', title: 'Accessibility Support', desc: 'Audio, text size, UDL' },
            { icon: '♿', title: 'Wheelchair Accessible', desc: 'Designed for everyone' },
            { icon: '🌿', title: 'Sensory Friendly', desc: 'Calm colors, quiet spaces' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl shadow">
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h4 className="font-bold text-gray-900">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Teacher Screen
const TeacherScreen = ({ onBack }: { onBack: () => void }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const avatars = ['👩‍🦰', '👨‍🦱', '👩‍🦳', '👨‍🦲', '👩🏽'];
  const moods = [
    { emoji: '😊', label: 'Motivated' },
    { emoji: '😄', label: 'Supported' },
    { emoji: '✏️', label: 'Creative' },
    { emoji: '😠', label: 'Focused' },
    { emoji: '😌', label: 'Confident' },
    { emoji: '😰', label: 'Stressed' },
    { emoji: '😢', label: 'Overwhelmed' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 p-4">
      <button
        onClick={onBack}
        className="mb-4 text-gray-600 hover:text-gray-900 text-2xl"
      >
        ←
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Empowering Every Educator 💙</h1>
        <p className="text-lg text-gray-700 mb-8">Welcome! Let's help and empower! Teachers</p>

        {/* Create Assessment Section */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🔒</span>
            <h2 className="text-2xl font-bold">Welcome! Let's help and empower! Teachers</h2>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl transition">
            Create & Design Assessment
          </button>
          <p className="text-center text-gray-600 text-sm mt-4">
            Assessment ideas not working? <span className="text-blue-600 cursor-pointer">Contact support</span>
          </p>
        </div>

        {/* Avatar Selection */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Choose Your Avatar</h3>
          <div className="flex gap-4 justify-center flex-wrap">
            {avatars.map((avatar, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAvatar(idx)}
                className={`text-5xl p-4 rounded-3xl transition ${
                  selectedAvatar === idx ? 'bg-blue-200 ring-4 ring-blue-500' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>

        {/* Mood Selection */}
        <div>
          <h3 className="text-2xl font-bold mb-4">How can we empower you today?</h3>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {moods.map((mood, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedMood(idx)}
                className={`text-4xl p-3 rounded-full transition ${
                  selectedMood === idx ? 'ring-4 ring-blue-500 scale-110' : 'hover:scale-110'
                }`}
                title={mood.label}
              >
                {mood.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {[
            { icon: '🎧', title: 'Accessibility Support', desc: 'Audio, text size, UDL' },
            { icon: '♿', title: 'Wheelchair Accessible', desc: 'Designed for everyone' },
            { icon: '🌿', title: 'Sensory Friendly', desc: 'Calm colors, quiet spaces' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl shadow">
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h4 className="font-bold text-gray-900">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App Component
const Index = () => {
  const [screen, setScreen] = useState('splash');

  const handleNavigation = (newScreen: string) => {
    setScreen(newScreen);
  };

  const handleRegistration = (role: string) => {
    console.log(`${role} registered successfully`);
    handleNavigation(role === 'teacher' ? 'teacher' : 'learner');
  };

  return (
    <div className="w-full">
      {screen === 'splash' && <SplashScreen onStart={() => handleNavigation('home')} />}
      {screen === 'home' && <HomeScreen onSelectRole={(role) => handleNavigation(`${role}-register`)} />}
      {screen === 'parent-register' && (
        <RegistrationForm
          title="Learner's Parent Sign Up"
          subtitle="Create your account to stay connected and support your child's learning journey."
          onSubmit={() => handleRegistration('parent')}
          onBack={() => handleNavigation('home')}
          buttonColor="bg-green-600"
        />
      )}
      {screen === 'teacher-register' && (
        <RegistrationForm
          title="Teacher Sign Up"
          subtitle="Create your account to join our community of educators."
          onSubmit={() => handleRegistration('teacher')}
          onBack={() => handleNavigation('home')}
          buttonColor="bg-blue-600"
        />
      )}
      {screen === 'learner' && <LearnerScreen onBack={() => handleNavigation('home')} />}
      {screen === 'teacher' && <TeacherScreen onBack={() => handleNavigation('home')} />}
    </div>
  );
};

export default Index;
