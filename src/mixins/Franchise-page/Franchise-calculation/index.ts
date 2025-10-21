interface IFranchiseCalculationData {
  population: string;
  hours: string;
  franchise: string;
}

const franchiseCalculationData: IFranchiseCalculationData = {
  population: '',
  hours: '',
  franchise: '',
};

function handleSetData() {
  const changeEvent = new CustomEvent('onChangeFranchiseCalculation', {
    detail: franchiseCalculationData,
  });
  document.dispatchEvent(changeEvent);
  console.log(`franchiseCalculationData: `, franchiseCalculationData);
}

function processFranchiseCalculation() {
  document.addEventListener('progressBarChange', (event: Event) => {
    // const detail = event.detail;
    const customEvent = event as CustomEvent<{
      name: keyof IFranchiseCalculationData;
      value: string;
    }>;
    const { name, value } = customEvent.detail;

    franchiseCalculationData[name] = value;
    handleSetData();
  });

  const toggles = document.querySelector('.calculation__toggles');
  toggles?.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    if (!target) return;

    franchiseCalculationData[target.name as keyof IFranchiseCalculationData] =
      target.value;
    handleSetData();
  });
}

export { processFranchiseCalculation };
