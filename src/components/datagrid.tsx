import React, { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';

const departments = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

function DataGridforTree() {
  const [selectedDepartments, setSelectedDepartments] = useState({});

  useEffect(() => {
    departments.forEach((dept) => {
      const allSubDepartmentsSelected = dept.sub_departments.every(
        (subDept) => selectedDepartments[subDept]
      );
      if (allSubDepartmentsSelected) {
        setSelectedDepartments((prevSelectedDepartments) => {
          return {
            ...prevSelectedDepartments,
            [dept.department]: true,
          };
        });
      } else if (selectedDepartments[dept.department]) {
        setSelectedDepartments((prevSelectedDepartments) => {
          return {
            ...prevSelectedDepartments,
            [dept.department]: false,
          };
        });
      }
    });
  }, [selectedDepartments]);

  const handleDepartmentChange = (department, isChecked) => {
    setSelectedDepartments((prevSelectedDepartments) => {
      return {
        ...prevSelectedDepartments,
        [department]: isChecked,
      };
    });

    if (isChecked) {
      departments.forEach((dept) => {
        if (dept.department === department) {
          dept.sub_departments.forEach((subDept) => {
            setSelectedDepartments((prevSelectedDepartments) => {
              return {
                ...prevSelectedDepartments,
                [subDept]: true,
              };
            });
          });
        }
      });
    } else {
      departments.forEach((dept) => {
        if (dept.department === department) {
          dept.sub_departments.forEach((subDept) => {
            setSelectedDepartments((prevSelectedDepartments) => {
              return {
                ...prevSelectedDepartments,
                [subDept]: false,
              };
            });
          });
        }
      });
    }
  };

  const handleSubDepartmentChange = (subDepartment, isChecked) => {
    setSelectedDepartments((prevSelectedDepartments) => {
      return {
        ...prevSelectedDepartments,
        [subDepartment]: isChecked,
      };
    });
  };

  return (
    <div>
      {departments.map((dept) => (
        <div key={dept.department}>
          <Checkbox
            checked={!!selectedDepartments[dept.department]}
            onChange={(e) =>
              handleDepartmentChange(dept.department, e.target.checked)
            }
          />
          <span>{dept.department}</span>
          <ul style={{ marginLeft: 20 }}>
            {dept.sub_departments.map((subDept) => (
              <li key={subDept}>
                <Checkbox
                  checked={!!selectedDepartments[subDept]}
                  onChange={(e) =>
                    handleSubDepartmentChange(subDept, e.target.checked)
                  }
                />
                <span>{subDept}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default DataGridforTree;