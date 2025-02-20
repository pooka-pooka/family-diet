import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputNumber } from "primereact/inputnumber";
import loadCsvData from "../helper.js";

const NutritionTable = ({ familyMember }) => {
  const [rows, setRows] = useState([]);
  const [nutritionData, setNutritionData] = useState([]);
  const [foodNames, setFoodNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await loadCsvData();
      setNutritionData(csvData);
      setFoodNames(csvData.map((row) => row[Object.keys(row)[0]]));
    };

    fetchData();
  }, []);

  const handleAddRow = () => {
    setRows([
      ...rows,
      { food: "", calories: 0, fat: 0, protein: 0, vitamins: "" },
    ]);
  };

  const startContent = (
    <React.Fragment>
      <Button onClick={handleAddRow} label="Add Row" />
    </React.Fragment>
  );

  const handleFoodChange = (index, food) => {
    const quantity = rows[index].quantity || 0.25;
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      food,
      quantity,
      ...calculateNutrients(food, quantity),
    };
    setRows(updatedRows);
  };

  const handleFoodQuantityChange = (index, quantity) => {
    const food = rows[index].food;
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      quantity,
      ...calculateNutrients(food, quantity),
    };
    setRows(updatedRows);
  };

  const defaultValues = {
    calories: 0,
    total_fat_g: 0,
    total_fat_p: 0,
    sat_fat_g: 0,
    sat_fat_p: 0,
    trans_fat_g: 0,
    cholesterol_mg: 0,
    cholesterol_p: 0,
    sodium_mg: 0,
    sodium_p: 0,
    total_carb_g: 0,
    total_carb_p: 0,
    dietary_fiber_g: 0,
    dietary_fiber_p: 0,
    total_sugar_g: 0,
    added_sugar_g: 0,
    added_sugar_p: 0,
    protein_g: 0,
    protein_p: 0,
    vitamin_d_mcg: 0,
    vitamin_d_p: 0,
    calcium_mg: 0,
    calcium_p: 0,
    iron_mg: 0,
    iron_p: 0,
    pottassium_mg: 0,
    pottassium_p: 0,
  };

  const calculateNutrients = (food, qty) => {
    const foodData = nutritionData.find((n) => n.name === food);
    const baseNutrients = foodData || defaultValues;
    const quantity = qty * 4;
    return {
      calories: baseNutrients.calories * quantity,
      total_fat_g: baseNutrients.total_fat_g * quantity,
      total_fat_p: baseNutrients.total_fat_p * quantity,
      sat_fat_g: (baseNutrients.sat_fat_g * quantity).toFixed(2),
      sat_fat_p: baseNutrients.sat_fat_p * quantity,
      trans_fat_g: baseNutrients.trans_fat_g * quantity,
      cholesterol_mg: baseNutrients.cholesterol_mg * quantity,
      cholesterol_p: baseNutrients.cholesterol_p * quantity,
      sodium_mg: baseNutrients.sodium_mg * quantity,
      sodium_p: baseNutrients.sodium_p * quantity,
      total_carb_g: baseNutrients.total_carb_g * quantity,
      total_carb_p: baseNutrients.total_carb_p * quantity,
      dietary_fiber_g: baseNutrients.dietary_fiber_g * quantity,
      dietary_fiber_p: baseNutrients.dietary_fiber_p * quantity,
      total_sugar_g: baseNutrients.total_sugar_g * quantity,
      added_sugar_g: baseNutrients.added_sugar_g * quantity,
      added_sugar_p: baseNutrients.added_sugar_p * quantity,
      protein_g: baseNutrients.protein_g * quantity,
      protein_p: baseNutrients.protein_p * quantity,
      vitamin_d_mcg: baseNutrients.vitamin_d_mcg * quantity,
      vitamin_d_p: baseNutrients.vitamin_d_p * quantity,
      calcium_mg: baseNutrients.calcium_mg * quantity,
      calcium_p: baseNutrients.calcium_p * quantity,
      iron_mg: baseNutrients.iron_mg * quantity,
      iron_p: baseNutrients.iron_p * quantity,
      pottassium_mg: baseNutrients.pottassium_mg * quantity,
      pottassium_p: baseNutrients.pottassium_p * quantity,
    };
  };

  const calculateTotals = () => {
    const totals = rows.reduce((acc, row) => {
      acc.calories += row.calories;
      acc.total_fat_g += row.total_fat_g;
      acc.total_fat_p += row.total_fat_p;
      acc.sat_fat_g += parseFloat(row.sat_fat_g);
      acc.sat_fat_p += row.sat_fat_p;
      acc.trans_fat_g += row.trans_fat_g;
      acc.cholesterol_mg += row.cholesterol_mg;
      acc.cholesterol_p += row.cholesterol_p;
      acc.sodium_mg += row.sodium_mg;
      acc.sodium_p += row.sodium_p;
      acc.total_carb_g += row.total_carb_g;
      acc.total_carb_p += row.total_carb_p;
      acc.dietary_fiber_g += row.dietary_fiber_g;
      acc.dietary_fiber_p += row.dietary_fiber_p;
      acc.total_sugar_g += row.total_sugar_g;
      acc.added_sugar_g += row.added_sugar_g;
      acc.added_sugar_p += row.added_sugar_p;
      acc.protein_g += row.protein_g;
      acc.protein_p += row.protein_p;
      acc.vitamin_d_mcg += row.vitamin_d_mcg;
      acc.vitamin_d_p += row.vitamin_d_p;
      acc.calcium_mg += row.calcium_mg;
      acc.calcium_p += row.calcium_p;
      acc.iron_mg += row.iron_mg;
      acc.iron_p += row.iron_p;
      acc.pottassium_mg += row.pottassium_mg;
      acc.pottassium_p += row.pottassium_p;

      return acc;
    }, defaultValues);
    return totals;
  };

  const totals = calculateTotals();

  const foodItemTemplate = (row, { rowIndex }) => {
    return (
      <Dropdown
        // options={Object.keys(nutritionData)}
        options={foodNames}
        value={row.food}
        onChange={(e) => handleFoodChange(rowIndex, e.value)}
        placeholder="Select a food"
        className="w-full md:w-14rem"
        style={{ width: "200px" }}
      />
    );
  };

  const foodQuantityTemplate = (row, { rowIndex }) => {
    return (
      <InputNumber
        value={row.quantity}
        onValueChange={(e) => handleFoodQuantityChange(rowIndex, e.value)}
        showButtons
        buttonLayout="horizontal"
        step={0.25}
        incrementButtonIcon="pi pi-plus"
        decrementButtonIcon="pi pi-minus"
        size={4}
      />
    );
  };

  return (
    <div className="nutrition-table card">
      <Toolbar start={startContent} style={{ marginBottom: "10px" }} />
      <DataTable
        value={rows}
        header="Nutrition Table"
        size="small"
        style={{ whiteSpace: "" }}
      >
        <Column header="Food Item" body={foodItemTemplate} />
        <Column
          header="Quantity in Cups"
          body={foodQuantityTemplate}
          style={{ width: "120px" }}
        />
        <Column field="calories" header="Calories" footer={totals.calories} />
        <Column
          field="protein_g"
          header="Protein(g)"
          footer={totals.protein_g?.toFixed(2) + "g"}
        />
        <Column
          field="protein_p"
          header="Protein%"
          footer={totals.protein_p?.toFixed(2) + "%"}
        />
        <Column
          field="dietary_fiber_g"
          header="Fiber(g)"
          footer={totals.dietary_fiber_g?.toFixed(2) + "g"}
        />
        <Column
          field="dietary_fiber_p"
          header="Fiber%"
          footer={totals.dietary_fiber_p?.toFixed(2) + "%"}
        />
        <Column
          field="total_fat_g"
          header="TotFat(g)"
          footer={totals.total_fat_g?.toFixed(2) + "g"}
        />
        <Column
          field="total_fat_p"
          header="TotalFat%"
          footer={totals.total_fat_p?.toFixed(2) + "%"}
        />
        <Column
          field="sat_fat_g"
          header="SatFat(g)"
          footer={totals.sat_fat_g?.toFixed(2) + "g"}
        />
        <Column
          field="sat_fat_p"
          header="SatFat%"
          footer={totals.sat_fat_p?.toFixed(2) + "%"}
        />
        <Column
          field="trans_fat_g"
          header="TransFat(g)"
          footer={totals.trans_fat_g?.toFixed(2) + "g"}
        />
        <Column
          field="cholesterol_mg"
          header="Cholesterol(mg)"
          footer={totals.cholesterol_mg?.toFixed(2) + "mg"}
        />
        <Column
          field="cholesterol_p"
          header="Cholesterol%"
          footer={totals.cholesterol_p?.toFixed(2) + "%"}
        />
        <Column
          field="sodium_mg"
          header="Sodium(mg)"
          footer={totals.sodium_mg?.toFixed(2) + "mg"}
        />
        <Column
          field="sodium_p"
          header="Sodium%"
          footer={totals.sodium_p?.toFixed(2) + "%"}
        />
        <Column
          field="total_carb_g"
          header="TotalCarb(g)"
          footer={totals.total_carb_g?.toFixed(2) + "g"}
        />
        <Column
          field="total_carb_p"
          header="TotalCarb%"
          footer={totals.total_carb_p?.toFixed(2) + "%"}
        />

        <Column
          field="total_sugar_g"
          header="TotalSugar(g)"
          footer={totals.total_sugar_g?.toFixed(2) + "g"}
        />
        <Column
          field="added_sugar_g"
          header="AddedSugar(g)"
          footer={totals.added_sugar_g?.toFixed(2) + "g"}
        />
        <Column
          field="added_sugar_p"
          header="AddedSugar%"
          footer={totals.added_sugar_p?.toFixed(2) + "%"}
        />

        <Column
          field="vitamin_d_mcg"
          header="VitaminD(mcg)"
          footer={totals.vitamin_d_mcg?.toFixed(2) + "mcg"}
        />
        <Column
          field="vitamin_d_p"
          header="VitaminD%"
          footer={totals.vitamin_d_p?.toFixed(2) + "%"}
        />
        <Column
          field="calcium_mg"
          header="Calcium(mg)"
          footer={totals.calcium_mg?.toFixed(2) + "mg"}
        />
        <Column
          field="calcium_p"
          header="Calcium%"
          footer={totals.calcium_p?.toFixed(2) + "%"}
        />
        <Column
          field="iron_mg"
          header="Iron(mg)"
          footer={totals.iron_mg?.toFixed(2) + "mg"}
        />
        <Column field="iron_p" header="Iron%" footer={totals.iron_p + "%"} />
        <Column
          field="pottassium_mg"
          header="Pottassium(mg)"
          footer={totals.pottassium_mg?.toFixed(2) + "mg"}
        />
        <Column
          field="pottassium_p"
          header="Pottassium%"
          footer={totals.pottassium_p?.toFixed(2) + "%"}
        />
      </DataTable>
    </div>
  );
};

export default NutritionTable;
