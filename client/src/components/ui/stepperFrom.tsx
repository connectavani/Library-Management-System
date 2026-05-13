import { useState } from 'react'

const steps = [
  { label: 'School Info' },
  { label: 'School Timing' },
  { label: 'Competition Details' }
]

export default function StepperForm({ onClose }: any) {
  const [currentStep, setCurrentStep] = useState(0)

  const totalSteps = steps.length

  const handleNext = () => {
    if (currentStep < totalSteps - 1) setCurrentStep(prev => prev + 1)
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#ff680B]">School Registration</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">✖</button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
          <div
            className="bg-[#ff680B] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between items-center mb-6">
          {steps.map((step, index) => (
            <div key={step.label} className="flex flex-col items-center text-sm">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-[#ff680B] text-white'
                    : index < currentStep
                    ? 'bg-[#ff680B]/50 text-white'
                    : 'bg-gray-300 text-black'
                }`}
              >
                {index + 1}
              </div>
              <span className="mt-1 text-xs text-center">{step.label}</span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="mb-6">
          {currentStep === 0 && (
            <div className="space-y-4">
              <input type="text" placeholder="School Name" className="border p-2 w-full rounded" />
              <input type="text" placeholder="City" className="border p-2 w-full rounded" />
              <input type="text" placeholder="Principal Name" className="border p-2 w-full rounded" />
              <input type="text" placeholder="Principal Mobile" className="border p-2 w-full rounded" />
            </div>
          )}
          {currentStep === 1 && (
            <div className="space-y-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                <div key={day} className="flex gap-2 items-center">
                  <span className="w-24">{day}</span>
                  <input type="time" className="border p-1 rounded" />
                  <input type="time" className="border p-1 rounded" />
                </div>
              ))}
            </div>
          )}
          {currentStep === 2 && (
            <div className="space-y-4">
              <fieldset>
                <legend className="font-medium">Select Competitions</legend>
                <div className="flex flex-col gap-2 mt-2">
                  <label><input type="checkbox" /> Drawing</label>
                  <label><input type="checkbox" /> Singing</label>
                </div>
              </fieldset>
              <fieldset>
                <legend className="font-medium mt-4">Select Period</legend>
                <div className="flex flex-col gap-2 mt-2">
                  <label><input type="radio" name="period" /> 9/10/2025 - 9/20/2025</label>
                  <label><input type="radio" name="period" /> 10/01/2025 - 10/10/2025</label>
                </div>
              </fieldset>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === totalSteps - 1}
            className="px-4 py-2 rounded bg-[#ff680B] text-white hover:bg-[#e65d00]"
          >
            {currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}