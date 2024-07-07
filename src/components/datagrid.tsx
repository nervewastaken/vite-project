import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";

interface Department {
  department: string;
  sub_departments: string[];
}

const departments: Department[] = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

const DataGridforTree: React.FC = () => {
  const [selectedDepartments, setSelectedDepartments] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    departments.forEach((dept) => {
      const allSubDepartmentsSelected = dept.sub_departments.every(
        (subDept) => selectedDepartments[subDept]
      );
      if (allSubDepartmentsSelected && !selectedDepartments[dept.department]) {
        setSelectedDepartments((prevSelectedDepartments) => {
          return {
            ...prevSelectedDepartments,
            [dept.department]: true,
          };
        });
      } else if (
        !allSubDepartmentsSelected &&
        selectedDepartments[dept.department]
      ) {
        setSelectedDepartments((prevSelectedDepartments) => {
          return {
            ...prevSelectedDepartments,
            [dept.department]: false,
          };
        });
      }
    });
  }, [selectedDepartments]);

  const handleDepartmentChange = (department: string, isChecked: boolean) => {
    setSelectedDepartments((prevSelectedDepartments) => {
      return {
        ...prevSelectedDepartments,
        [department]: isChecked,
      };
    });

    departments.forEach((dept) => {
      if (dept.department === department) {
        dept.sub_departments.forEach((subDept) => {
          setSelectedDepartments((prevSelectedDepartments) => {
            return {
              ...prevSelectedDepartments,
              [subDept]: isChecked,
            };
          });
        });
      }
    });
  };

  const handleSubDepartmentChange = (
    subDepartment: string,
    isChecked: boolean
  ) => {
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
};

export default DataGridforTree;
