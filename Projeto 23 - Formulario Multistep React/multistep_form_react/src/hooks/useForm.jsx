import { useState } from "react";

export function useForm(steps) {
  const [currentStep, setCurrentStep] = useState(0);

  function changeStep(i, e) {
    //se o evento veio, fazer o preventdefault
    if (e) e.preventDefault();

    if (i < 0 || i >= steps.length) return;

    setCurrentStep(i);
  }

  return {
    currentStep,
    currentComponent: steps[currentStep],
    changeStep,
    // se for o ultipo passo do formulario true, se nao false
    isLastStep: currentStep + 1 === steps.length ? true : false,
    isFirstStep: currentStep === 0 ? true : false,
  };
}
