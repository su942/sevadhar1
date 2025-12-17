import React, { useState } from 'react';
import { Camera, Mic, Upload, ArrowRight, Check, Briefcase, FileText, User } from 'lucide-react';
import { CategoryId, Category } from '../../types';
import { CATEGORIES } from '../../lib/utils/constants';

interface OnboardingWizardProps {
  onComplete: (data: any) => void;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    experience: '',
    photo: null,
    documentFront: null,
    documentBack: null,
  });

  const steps = [
    { id: 1, title: 'Select Skill', desc: 'What work do you do?' },
    { id: 2, title: 'Verification', desc: 'Upload required documents' },
    { id: 3, title: 'Profile Photo', desc: 'Take a clear selfie' },
    { id: 4, title: 'Voice Intro', desc: 'Record your introduction' },
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete({ ...formData, category: selectedCategory, audio: audioBlob });
    }
  };

  const getRequiredDocName = () => {
    if (selectedCategory === 'driver') return 'Driving License';
    return 'Aadhaar Card';
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="py-2">
            <h4 className="text-sm font-bold text-gray-700 mb-3">Choose your primary service:</h4>
            <div className="grid grid-cols-3 gap-3 max-h-60 overflow-y-auto no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${selectedCategory === cat.id ? 'border-[#FF6B35] bg-orange-50' : 'border-gray-200 hover:border-orange-200'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedCategory === cat.id ? 'bg-[#FF6B35] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <Briefcase size={18} />
                  </div>
                  <div className="text-center">
                    <span className="block text-xs font-bold text-gray-800">{cat.label}</span>
                    <span className="block text-[10px] text-gray-500">{cat.labelMarathi}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
           <div className="space-y-4 py-4">
              <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-3 text-blue-800 text-sm mb-4">
                 <FileText size={20} />
                 <span>Required for <strong>{CATEGORIES.find(c => c.id === selectedCategory)?.label}</strong>: <br/><strong>{getRequiredDocName()}</strong></span>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors relative group">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFormData({...formData, documentFront: e.target.files?.[0] || null})} />
                  <Upload className={`mx-auto mb-2 ${formData.documentFront ? 'text-green-500' : 'text-gray-400'}`} />
                  <p className="text-sm font-medium text-gray-700">{formData.documentFront ? 'Front Uploaded ✅' : `Upload ${getRequiredDocName()} (Front)`}</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors relative group">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFormData({...formData, documentBack: e.target.files?.[0] || null})} />
                  <Upload className={`mx-auto mb-2 ${formData.documentBack ? 'text-green-500' : 'text-gray-400'}`} />
                  <p className="text-sm font-medium text-gray-700">{formData.documentBack ? 'Back Uploaded ✅' : `Upload ${getRequiredDocName()} (Back)`}</p>
              </div>
           </div>
        );

      case 3:
        return (
          <div className="text-center py-8">
            <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-dashed border-gray-300 overflow-hidden relative">
               {formData.photo ? (
                 <img src={URL.createObjectURL(formData.photo)} className="w-full h-full object-cover" />
               ) : (
                 <Camera size={40} className="text-gray-400" />
               )}
               <input type="file" accept="image/*" capture="user" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFormData({...formData, photo: e.target.files?.[0] || null})} />
            </div>
            <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform relative">
              Take Selfie
              <input type="file" accept="image/*" capture="user" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFormData({...formData, photo: e.target.files?.[0] || null})} />
            </button>
            <p className="text-xs text-gray-400 mt-4">Make sure your face is clearly visible.</p>
          </div>
        );

      case 4:
        return (
          <div className="text-center py-4">
             <div className="bg-orange-50 p-4 rounded-xl mb-6 text-left">
                <h4 className="font-bold text-gray-800 mb-2">Please say this in Marathi/Hindi:</h4>
                <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
                    <li>"Namaskar, my name is <strong>{formData.name || 'Your Name'}</strong>."</li>
                    <li>"I have <strong>{formData.experience || '5'} years</strong> of experience."</li>
                    <li>"I am a specialist in <strong>{CATEGORIES.find(c => c.id === selectedCategory)?.label || 'Work'}</strong>."</li>
                </ul>
             </div>

            <div 
              onClick={() => {
                  if(isRecording) {
                      setIsRecording(false);
                      setAudioBlob(new Blob(["mock-audio"], { type: "audio/wav" })); // Mock blob
                  } else {
                      setIsRecording(true);
                  }
              }}
              className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center cursor-pointer transition-all shadow-lg ${isRecording ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-200' : 'bg-white text-[#FF6B35] border-2 border-[#FF6B35]'}`}
            >
               <Mic size={32} />
            </div>
            <p className="font-medium text-gray-900">{isRecording ? 'Recording... Tap to Stop' : audioBlob ? 'Recorded! Tap to Re-record' : 'Tap to Record Info'}</p>
          </div>
        );
      default: return null;
    }
  };

  // Pre-onboarding data collection for better UX
  if (step === 1 && !selectedCategory) {
     // Wait for selection
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden my-8">
       <div className="bg-orange-50 p-6 border-b border-orange-100">
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-xl font-bold text-gray-900">Partner Registration</h2>
             <span className="text-xs font-bold bg-white px-2 py-1 rounded text-[#FF6B35] border border-orange-100">Step {step}/4</span>
          </div>
          <div className="flex gap-2">
             {steps.map(s => (
                <div key={s.id} className={`h-1 flex-1 rounded-full ${s.id <= step ? 'bg-[#FF6B35]' : 'bg-gray-200'}`} />
             ))}
          </div>
       </div>

       <div className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-1">{steps[step-1].title}</h3>
          <p className="text-sm text-gray-500 mb-6">{steps[step-1].desc}</p>
          
          {renderStepContent()}

          <div className="mt-6 flex gap-3">
              {step > 1 && (
                  <button onClick={() => setStep(step-1)} className="px-4 py-3 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50">Back</button>
              )}
              <button 
                onClick={handleNext}
                disabled={(step === 1 && !selectedCategory) || (step === 2 && (!formData.documentFront || !formData.documentBack)) || (step === 3 && !formData.photo)}
                className="flex-1 bg-[#FF6B35] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 4 ? 'Complete Registration' : 'Next Step'} <ArrowRight size={18} />
              </button>
          </div>
       </div>
    </div>
  );
};

export default OnboardingWizard;
