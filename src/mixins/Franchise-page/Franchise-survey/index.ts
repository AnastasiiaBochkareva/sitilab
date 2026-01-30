import { logIfDebug } from '../../../mydebug';
// const START_INDEX = 0;

// interface IChosenStep {
//   name: string;
//   value: string;
// }

// interface ISurveyData {
//   steps: IChosenStep[];
//   name: string;
//   phone: string;
//   email: string;
//   city: string;
// }

// function defineActiveStep() {
//   const survey = document.querySelector('.survey');
//   const surveySteps = Array.from(
//     survey?.querySelectorAll('.survey__step') || []
//   );
//   const activeStep = surveySteps.findIndex((element) =>
//     element.classList.contains('active')
//   );
//   return activeStep;
// }

// function initFranchiseSurvey() {
//   const data: ISurveyData = {
//     steps: [],
//     name: '',
//     phone: '',
//     email: '',
//     city: '',
//   };

//   const survey = document.querySelector('.survey');
//   const surveyTitle = survey?.querySelector('.survey__title');
//   const surveyBtnBack = survey?.querySelector('.button-back');
//   const steps = survey?.querySelectorAll('.survey__step');

//   if (!steps?.length) return;

//   survey?.addEventListener('change', (event) => {
//     const target = event.target as HTMLInputElement;
//     let activeStepIndex = defineActiveStep();
//     const isStartSurvey = activeStepIndex === START_INDEX;

//     data.steps[activeStepIndex] = {
//       name: target.name,
//       value: target.value,
//     };

//     setTimeout(() => {
//       const currentStep = steps[activeStepIndex];
//       const nextStep = currentStep?.nextElementSibling;
//       if (nextStep) {
//         currentStep?.classList.remove('active');
//         nextStep?.classList.add('active');
//       }
//       if (isStartSurvey) {
//         surveyTitle?.classList.remove('active');
//         surveyBtnBack?.classList.add('active');
//       }

//       activeStepIndex = defineActiveStep();
//       const isFinalSurvey = activeStepIndex === steps.length - 1;
//       if (isFinalSurvey) {
//         surveyBtnBack?.classList.remove('active');
//       }
//     }, 1000);
//   });

//   surveyBtnBack?.addEventListener('click', () => {
//     const activeStepIndex = defineActiveStep();
//     const currentStep = steps?.[activeStepIndex];
//     const previousStep = currentStep?.previousElementSibling;
//     const isStartSurvey = activeStepIndex - 1 === START_INDEX;

//     if (previousStep) {
//       currentStep?.classList.remove('active');
//       previousStep?.classList.add('active');
//     }

//     if (isStartSurvey) {
//       surveyTitle?.classList.add('active');
//       surveyBtnBack?.classList.remove('active');
//     }
//   });

//   const form = survey?.querySelector('.franchise-form .form');
//   form?.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const customEvent = new CustomEvent('submitSurvey', { detail: data });
//     document.dispatchEvent(customEvent);
//   });
// }

// export { initFranchiseSurvey };
const START_INDEX = 0;
const STEP_DELAY = 400;

interface IChosenStep {
  name: string;
  value: string;
}

interface ISurveyData {
  steps: IChosenStep[];
  name: string;
  phone: string;
  email: string;
  city: string;
}

function initFranchiseSurvey() {
  const data: ISurveyData = {
    steps: [],
    name: '',
    phone: '',
    email: '',
    city: '',
  };

  const survey = document.querySelector('.survey');
  const buttonsBack = Array.from(document.querySelectorAll('.button-back'));
  const steps = Array.from(survey?.querySelectorAll('.survey__step') || []);
  const progressBar = survey?.querySelector(
    '.progress-bar'
  ) as HTMLElement | null;
  const progressFill = progressBar?.querySelector(
    '.progress-bar__fill'
  ) as HTMLElement | null;

  if (!steps.length || !survey) return;

  let transitionTimeout: ReturnType<typeof setTimeout> | null = null;

  function updateProgressBar(stepIndex: number) {
    const totalSteps = steps.length;

    const isFinalStep = stepIndex === totalSteps - 1;

    const progressPercent = ((stepIndex + 1) / totalSteps) * 100;

    if (progressFill) {
      progressFill.style.transition = 'width 0.4s ease';
      progressFill.style.width = `${progressPercent}%`;
    }

    if (isFinalStep && progressBar) {
      setTimeout(() => {
        progressBar.style.opacity = '0';
        progressBar.style.transition = 'opacity 0.4s ease';
        setTimeout(() => {
          progressBar.style.display = 'none';
        }, 400);
      }, 400);
    } else if (progressBar) {
      progressBar.style.display = '';
      progressBar.style.opacity = '1';
    }
  }

  survey.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    let input: HTMLInputElement | null = null;

    if (
      target.tagName === 'INPUT' &&
      (target as HTMLInputElement).type === 'radio'
    ) {
      input = target as HTMLInputElement;
    } else {
      const maybeInput = target.closest(
        'input[type="radio"]'
      ) as HTMLInputElement | null;
      if (maybeInput) input = maybeInput;
    }

    if (!input) return;

    logIfDebug('[survey] clicked');

    const currentStep = survey.querySelector(
      '.survey__step.active'
    ) as HTMLElement | null;
    if (!currentStep) return;

    const activeStepIndex = steps.indexOf(currentStep);
    if (activeStepIndex === -1) return;

    const nextStep = currentStep.nextElementSibling as HTMLElement | null;

    data.steps[activeStepIndex] = {
      name: input.name,
      value: input.value,
    };

    if (transitionTimeout) clearTimeout(transitionTimeout);

    updateProgressBar(activeStepIndex + 1);

    transitionTimeout = setTimeout(() => {
      if (nextStep) {
        currentStep.classList.remove('active');
        nextStep.classList.add('active');
      }

      updateProgressBar(activeStepIndex + 1);
    }, STEP_DELAY);
  });

  buttonsBack.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (transitionTimeout) clearTimeout(transitionTimeout);

      const currentStep = survey.querySelector(
        '.survey__step.active'
      ) as HTMLElement | null;
      if (!currentStep) return;

      const previousStep =
        currentStep.previousElementSibling as HTMLElement | null;

      if (previousStep) {
        currentStep.classList.remove('active');
        previousStep.classList.add('active');
      }

      const prevIndex = steps.indexOf(previousStep!);
      updateProgressBar(prevIndex);
    });
  });

  const form = survey.querySelector('.franchise-form .form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const customEvent = new CustomEvent('submitSurvey', { detail: data });
    document.dispatchEvent(customEvent);
  });

  updateProgressBar(0);
}

export { initFranchiseSurvey };
