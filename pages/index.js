import React, { useState } from 'react';

const initialData = [
  {
    "id": "electronics",
    "label": "Electronics",
    "value": 1400, //this value needs to be calculated from the children values (800+700)
    "variance": 0,
    "children": [
      {
        "id": "phones",
        "label": "Phones",
        "value": 800,
        "variance": 0,
      },
      {
        "id": "laptops",
        "label": "Laptops",
        "value": 700,
        "variance": 0,
      }
    ]
  },
  {
    "id": "furniture",
    "label": "Furniture",
    "value": 1000, //this need to be calculated from the children values (300+700)
    "variance": 0,
    "children": [
      {
        "id": "tables",
        "label": "Tables",
        "value": 300,
        "variance": 0,
      },
      {
        "id": "chairs",
        "label": "Chairs",
        "value": 700,
        "variance": 0,
      }
    ]
  }
]

const App = () => {
  const [data, setData] = useState(initialData);
  const [percent, setPercent] = useState(0)

  const handlePercentage = (path, percent) => {
    const newData = [...data];
    let current = newData;
    path.forEach((index, i) => {
      // current[index].value += (current[index].value + percent);
      if (i === path.length - 1) {
        current[index].value += (current[index].value * percent) / 100;
        current[index].variance = percent
      } else {
        current = current[index].children;
      }
    });
    setData(newData);
  };

  const handleValue = (path, percent) => {
    const newData = [...data];
    let current = newData;
    path.forEach((index, i) => {
      console.log(current[index], "-----------------------ssssss");
      console.log(path.length,i, "-----------------------ssssss");
      
      if (i === path.length - 1) {
        current[index].value += (current[index].value * percent) / 100;
        current[index].variance = (current[index].variance + percent) / percent * 100
        console.log("IF WOKING");
        
      } else {
        current = current[index].children;
        console.log("ELSE WORKING");
        
      }
    });
    setData(newData);
  }
  

  const renderRows = (rows, path = []) => {
    return rows.map((row, index) => {
      console.log(row, "ROW");
      
      const currentPath = [...path, index];

      console.log(currentPath, "CURRENT PATH");
      
      return (
        <React.Fragment key={row.label}>
          <tr className="border border-white">
            <td className="p-2 border border-white">{path.length === 3 ? `--${row.label}` : row.label}</td>
            <td className="p-2 border border-white">{row.value}</td>
            <td className="p-2 border border-white">
              <input
                className="text-black"
                type="number"
                onChange={(e) => setPercent(Number(e.target.value))}
              />
            </td>
            <td className="p-2 border border-white">
              <button className="bg-blue-300 text-black px-2 py-1 mx-auto w-full" onClick={() => handlePercentage(currentPath, percent)}>percent</button>
            </td>
            <td className="p-2 border border-white">
              <button className="bg-blue-300 px-2 py-1 text-black mx-auto w-full" onClick={() => handleValue(currentPath, percent)}>Value</button>
            </td>
            <td className="p-2 border border-white">{row.variance}%</td>
          </tr>
          {row.children && renderRows(row.children, currentPath)}
        </React.Fragment>
      );
    });
  };

  return (
    <div>
      <table className="border-2 border-white">
        <thead>
          <tr>
            <th className="p-3 border border-white">Label</th>
            <th className="p-3 border border-white">Value</th>
            <th className="p-3 border border-white">Input</th>
            <th className="p-3 border border-white">Allocation %</th>
            <th className="p-3 border border-white">Allocation Val</th>
            <th className="p-3 border border-white">Variance %</th>
          </tr>
        </thead>
        <tbody className="border-white border">
          {renderRows(data)}
        </tbody>
      </table>
    </div>
  );
};

export default App;
