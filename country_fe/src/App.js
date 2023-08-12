import React, { useState, useEffect } from "react";
import axios from "axios";
//import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import  "./App.css";
import ViewAll from './pages/viewAll'
import EditDialog from "./EditDialog";
import LineChartComponent from './components/LineChartComponent';
import AreaChartComponent from './components/AreaChartComponent';
import PieChartComponent from './components/PieChartComponent'; 
import BarChartComponent from './components/BarChartComponent'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedIndicator, setSelectedIndicator] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [chartData, setChartData] = useState(null);
  const [data , setData] = useState([]);
  const [flag , setFlag] = useState([true]);
  const [saveData , setSavedData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLineChart, setShowLineChart] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [showPieChart, setShowPieChart] = useState(false);
  const [showAreaChart, setShowAreaChart] = useState(false);
  const [chartType, setChartType] = useState('view');


  useEffect(() => {

    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://api.worldbank.org/v2/country?format=json&per_page=400"
        );
        console.log(response);
        const countriesData = response.data[1].map((country) => ({
          id: country.iso2Code,
          name: country.name,
        }));
        setCountries(countriesData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchIndicators = async () => {
      try {
        const response = await axios.get(
          "https://api.worldbank.org/v2/indicator?format=json&per_page=2500"
        );
        const indicatorsData = response.data[1].map((indicator) => ({
          id: indicator.id,
          name: indicator.name,
        }));
        setIndicators(indicatorsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountries();
    fetchIndicators();
  }, []);

  useEffect(() => {
    const storedChartData = localStorage.getItem("chartData");

    if (storedChartData) {
      setChartData(JSON.parse(storedChartData));
    }
  }, []);

  const fetchData = async () => {
  
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    try {
      const response = await axios.get(
        `https://api.worldbank.org/v2/country/${selectedCountry}/indicator/${selectedIndicator}`,
        {
          params: {
            date: `${formattedStartDate}:${formattedEndDate}`,
            format: "json",
          },
        }
      );
      const indicatorsData = response.data[1].map((vare) => ({
          idc: vare.country.id,
          country: vare.country.value,
          idi:vare.indicator.id,
          indicator:vare.indicator.value,
          cvalue:vare.value,
          decimal_1:vare.date,
        }));
      setData(indicatorsData);
      setFlag(true);
    } catch (error) {
      console.log(error);
    }
  };

  const viewData = () =>{
     setFlag(false);
     fetchSavedData();
   
  }
    const handleViewChart = () => {
    setShowChart(!showChart);
    setShowPieChart(false);
    setShowLineChart(false);
  };

  const handleViewPieChart = () => {
    setShowPieChart(!showPieChart);
    setShowChart(false);
    setShowLineChart(false);
  };

  const handleViewLineChart = () => {
    setShowLineChart(!showLineChart);
    setShowChart(false);
    setShowPieChart(false);
  };

  const handleViewAreaChart = () => {
    setShowAreaChart(!showAreaChart);
    setShowChart(false);
    setShowPieChart(false);
    setShowLineChart(false);
  };

    const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}`;
  };
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    console.log(event);
    setInputValue(event.target.value);
    setSelectedCountry(event.target.value);
  };
   const handleSaveItem = async (item) => {
    console.log(JSON.stringify(item));
    try {
      const response = await fetch('http://localhost:8080/Save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
       alert('Item saved successfully');
      } else {
        console.error('Failed to save item');
      }
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };
    useEffect(() => {
    fetchSavedData();
  }, []);

    const fetchSavedData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/GetAll");
      setSavedData(response.data); // Assuming the API response is an array of objects
    } catch (error) {
      console.log(error);
    }
  };
   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']; // Custom colors for pie chart
   const handleEditItem = (item) => {
    setEditedItem(item);
    setShowEditDialog(true);
  };

  const handleDialogClose = () => {
    setShowEditDialog(false);
    setEditedItem(null);
  };
   const handleDialogSave = async (editedData) => {
  try {
    // Delete the existing data with the item's id
    await axios.delete(`http://localhost:8080/DeleteComplete/${editedData.id}`);
    //alert(`Item with ID ${editedData.id} deleted`);

    // Add the new edited data using the save API
    const response = await fetch("http://localhost:8080/Save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    });

    if (response.ok) {
      alert("Item Updated successfully");
    } else {
      console.error("Failed to save item");
    }

    fetchSavedData(); // Refresh the data after saving
    setShowEditDialog(false); // Close the edit dialog
  } catch (error) {
    console.error("Error saving item:", error);
  }
};
  const [showChart, setShowChart] = useState(false);

   const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/DeleteComplete/${id}`);
      alert(`Item with ID ${id} deleted`);
      fetchSavedData(); // Refresh the data after deletion
    } catch (error) {
      console.error(`Error deleting item with ID ${id}:`, error);
    }
  };


  return (
     
    <div  className="App">
      { !showEditDialog &&
    <div>
      <h1>TS World Bank Data</h1>
      <div>
        <label htmlFor="country">Country ID:</label>
        <input
          type="text"
          value={selectedCountry}
          onChange={handleInputChange}
          list="data-list"
          autoComplete="off"
          placeholder="select country"
        />
        <datalist id="data-list">
          {countries.map((country) => (
            <option key={country.id} value={country.id} />
          ))}
        </datalist>
      </div>
      <br></br>
      <div>
        <label htmlFor="indicator">Indicator:</label>
        <input
        type="text"
        value={selectedIndicator}
        onChange={e => setSelectedIndicator(e.target.value)}
        list="data-list2"
        autoComplete="off"
        placeholder='select Indicator'
      />
      <datalist id="data-list2">
        {indicators.map(indicator => (
          <option key={indicator.id} value={indicator.name} />
        ))}
      </datalist>
      </div>
      <br></br>
      <div>
        <label htmlFor="startDate">Start Date:</label>

        <DatePicker
          id="startDate"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <DatePicker
          id="endDate"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <button
       className="button-container"
        onClick={fetchData}
        disabled={!selectedCountry || !selectedIndicator}
      >
        Fetch Data
      </button>
      <>             </>
        <button
         className="button-container"
         onClick={viewData}>
         view Data
        </button>
        <br></br>
         <select value={chartType} onChange={handleChartTypeChange}>
        <option value="none">Select Chart Type</option>
        <option value="view">Table View</option>
        <option value="bar">Bar Chart</option>
        <option value="pie">Pie Chart</option>
        <option value="line">Line Chart</option>
        <option value="area">Area Chart</option>
      </select>
      <div>
      
     {flag &&
     <div>
       <h2>Fatch Data from World Bank API</h2>
      {chartType === 'view' &&
       <table>
        <thead>
          <tr>
            <th>ID Country</th>
            <th>Country</th>
            <th>ID Indicator</th>
            <th>Indicator</th>
            <th>Value</th>
            <th>Date</th>
            <th>Save</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.idc + item.idi}>
              <td>{item.idc}</td>
              <td>{item.country}</td>
              <td>{item.idi}</td>
              <td>{item.indicator}</td>
              <td>{item.cvalue}</td>
              <td>{item.date}</td>

              <td>
                <button onClick={() => handleSaveItem(item)}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     }
          {chartType === 'bar' && <BarChartComponent data={data} />}
          {chartType === 'pie' && <PieChartComponent data={data} />}
          {chartType === 'line' && <LineChartComponent data={data}/>}
          {chartType === 'area'&& <AreaChartComponent data={data} />}
      </div>
      }

      {!flag &&
      <div>
         <h2>Saved Data </h2>
      {chartType === 'view' &&
       <table>
        <thead>
          <tr>
            <th>ID Country</th>
            <th>Country</th>
            <th>ID Indicator</th>
            <th>Indicator</th>
            <th>Value</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {saveData?.map((item) => (
            <tr key={item.idc + item.idi}>
              <td>{item.idc}</td>
              <td>{item.country}</td>
              <td>{item.idi}</td>
              <td>{item.indicator}</td>
              <td>{item.cvalue}</td>
              <td>{item.date}</td>
               <td>
                 <button onClick={() => handleEditItem(item)}>Edit</button>
              </td>
               <td>
                 <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
}
          {chartType === 'bar' && <BarChartComponent data={saveData} />}
          {chartType === 'pie' && <PieChartComponent data={saveData} />}
          {chartType === 'line' && <LineChartComponent data={saveData} />}
          {chartType === 'area'&& <AreaChartComponent data={saveData} />}
          </div>
      }
          
      </div>
    </div>
    }
    {showEditDialog && (
        <EditDialog
          item={editedItem}
          onClose={handleDialogClose}
          onSave={handleDialogSave}
        />
      )}
    </div>
     
   
  );
};

export default App;
