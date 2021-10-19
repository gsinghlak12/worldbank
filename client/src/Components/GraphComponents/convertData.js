function twoDatasets(
  labelArray,
  firstLabel,
  firstDataset,
  SecondLabel,
  secondDataset
) {
  return {
    labels: labelArray,
    datasets: [
      {
        label: firstLabel,
        backgroundColor: "rgba(192,75,75,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: firstDataset,
      },
      {
        label: SecondLabel,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: secondDataset,
      },
    ],
  };
}

function oneDataset(labelArray, label, dataset) {
  return {
    labels: labelArray,
    datasets: [
      {
        label: label,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: dataset,
      },
    ],
  };
}

function convertData(dataset) {
  if (dataset.length > 3) {
    return twoDatasets(
      dataset[0],
      dataset[1],
      dataset[2],
      dataset[3],
      dataset[4]
    );
  }
  return oneDataset(dataset[0], dataset[1], dataset[2]);
}
export default convertData;
