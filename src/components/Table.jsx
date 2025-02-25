import React, { useState } from "react";

// Initial data structure containing categories and their respective children with values
const items = [
  {
    id: "electronics",
    label: "Electronics",
    value: 1500,
    initialValue: 1500,
    children: [
      { id: "phones", label: "Phones", value: 800, initialValue: 800 },
      { id: "laptops", label: "Laptops", value: 700, initialValue: 700 },
    ],
  },
  {
    id: "furniture",
    label: "Furniture",
    value: 1000,
    initialValue: 1000,
    children: [
      { id: "tables", label: "Tables", value: 300, initialValue: 300 },
      { id: "chairs", label: "Chairs", value: 700, initialValue: 700 },
    ],
  },
];

const Table = () => {
  const [data, setData] = useState(items);

  // Function to update values based on input (absolute or percentage)
  const updateValue = (id, inputValue, isPercentage = false) => {
    setData((prevData) => {
      return prevData.map((category) => {
        // Update parent category directly if the ID matches
        if (category.id === id) {
          const updatedValue = isPercentage
            ? category.value * (1 + inputValue / 100) // Calculate percentage increase/decrease
            : inputValue; // Set new absolute value

          if (category.children) {
            // Get the total current value of all child elements
            const latestChildTotal = category.children.reduce(
              (sum, child) => sum + child.value,
              0
            );

            // Adjust child values proportionally based on the new parent value
            const updatedChildren = category.children.map((child) => {
              const proportion =
                latestChildTotal > 0
                  ? child.value / latestChildTotal // Maintain proportion
                  : 1 / category.children.length; // Equal split if no prior total
              const updatedChildValue = updatedValue * proportion;

              return {
                ...child,
                value: updatedChildValue,
                variance: (
                  ((updatedChildValue - child.initialValue) /
                    child.initialValue) *
                  100
                ).toFixed(2), // Calculate percentage variance
              };
            });

            return {
              ...category,
              value: updatedValue,
              variance: (
                ((updatedValue - category.initialValue) /
                  category.initialValue) *
                100
              ).toFixed(2),
              children: updatedChildren,
            };
          }

          return {
            ...category,
            value: updatedValue,
            variance: (
              ((updatedValue - category.initialValue) / category.initialValue) *
              100
            ).toFixed(2),
          };
        }

        // If the ID belongs to a child, update its value and adjust parent value
        if (category.children) {
          let updatedChildren = category.children.map((child) => {
            if (child.id === id) {
              const updatedChildValue = isPercentage
                ? child.value * (1 + inputValue / 100)
                : inputValue;

              return {
                ...child,
                value: updatedChildValue,
                variance: (
                  ((updatedChildValue - child.initialValue) /
                    child.initialValue) *
                  100
                ).toFixed(2),
              };
            }
            return child;
          });

          // Recalculate parent value as sum of children
          const updatedParentValue = updatedChildren.reduce(
            (sum, child) => sum + child.value,
            0
          );

          return {
            ...category,
            children: updatedChildren,
            value: updatedParentValue,
            variance: (
              ((updatedParentValue - category.initialValue) /
                category.initialValue) *
              100
            ).toFixed(2),
          };
        }

        return category;
      });
    });
  };

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Input</th>
          <th>Allocation %</th>
          <th>Allocation Val</th>
          <th>Variance %</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <React.Fragment key={item.id}>
            <tr>
              <td>{item.label}</td>
              <td>{item.value.toFixed(2)}</td>
              <td>
                <input id={`${item.id}-value`} type="number" />
              </td>
              {/* Apply percentage update */}
              <td>
                <button
                  onClick={() =>
                    updateValue(
                      item.id,
                      Number(document.getElementById(`${item.id}-value`).value),
                      true // Flag for percentage
                    )
                  }
                >
                  Apply %
                </button>
              </td>
              {/* Apply absolute value update */}
              <td>
                <button
                  onClick={() =>
                    updateValue(
                      item.id,
                      Number(document.getElementById(`${item.id}-value`).value),
                      false // Flag for absolute value
                    )
                  }
                >
                  Apply Value
                </button>
              </td>
              <td>{item.variance || 0}%</td>
            </tr>
            {/* Render child items */}
            {item.children?.map((child) => (
              <tr key={child.id}>
                <td>-- {child.label}</td>
                <td>{child.value.toFixed(2)}</td>
                <td>
                  <input id={`${child.id}-value`} type="number" />
                </td>
                <td>
                  <button
                    onClick={() =>
                      updateValue(
                        child.id,
                        Number(
                          document.getElementById(`${child.id}-value`).value
                        ),
                        true
                      )
                    }
                  >
                    Apply %
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      updateValue(
                        child.id,
                        Number(
                          document.getElementById(`${child.id}-value`).value
                        ),
                        false
                      )
                    }
                  >
                    Apply Value
                  </button>
                </td>
                <td>{child.variance || 0}%</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
