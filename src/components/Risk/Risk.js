import React, { Fragment, useState, useEffect } from "react";
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableCell } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles, Dialog } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
// import AddNewProject from './../AddProject/AddNewProject';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Autocomplete from '@material-ui/lab/Autocomplete';
import instance from '../../common/instance';
// import AddEmpToProject from './AddEmpToProject';
// import EditProjectDashboard from './EditProjectDashboard';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import VisibilityIcon from '@material-ui/icons/Visibility';
import swal from 'sweetalert';
import GetAppIcon from '@material-ui/icons/GetApp';
import DropDown from '../../common/DropDown';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import { Redirect } from "react-router-dom";
//import AddResourceAllocation from './AddResourceAllocation';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
//import RADetails from './ResourceAllocationDetails';
// import AddSow from "./AddSow";
import AddRisk from "./AddRisk"

const status = [
  {
    value: "active",
    label: "Active"
  },
  {
    value: "inactive",
    label: "Inactive"
  }
]

const getMuiTheme = () => createMuiTheme({
  overrides: {
     MUIDataTableHeadCell: {
     
    root: {
      backgroundColor: "#FFF",
      //  display: table-cell,
     fontWeight:"bold",
     marginLeft:'60px',
     sortAction: {
      '& svg': {
        color: "red" // or whatever you need
      }
    }
     
    }
  },

    MuiTableCell: {
      root: {
        backgroundColor: "#FFF",
        //  display: table-cell,
        padding: "1px",

      }
    },
    MuiTableSortLabel: {
      active: {
        marginTop: "6px",

        // backgroundColor: 'green' // your color here
      }
      
    },
    
  }
})



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  inline: {
    display: 'inline',
  },
  textField: {
    marginLeft: 0,
    backgroundColor: "red"

  },
  activeSortIcon: {
    opacity: 1,
  },
  icon: {
    display: 'none',
},
active: {
    '& $icon': {
        display: 'inline',
    },
},

}));

const dummyData = [
  {
  "id": 1,
  "status": true,
  "employee_id": "NIPL101",
  "project_name": "PMO 23",
  "program_manager": "Abhijeet Saha",
  "week_enddate": "20/05/2020",
  "overall_status": true,
  "openrisk":"3",
  "employee_name": "Akash Lakade",
  "reporting_manager": "Shailesh",
  "current_project": "PMO",
  "designation": "Developer",
  "billability_status": "Billed",
  "billability_sub_status": "Shadow",
  "billing": "50",
  },
  {
  "id": 2,
  "status": true,
  "employee_id": "NIPL110",
  "project_name": "SIAI",
  "program_manager": "Abhijeet Saha",
  "week_enddate": "21/05/2020",
  "overall_status": true,
  "openrisk":"4",
   "employee_name": "Akshay Gadgil",
  "reporting_manager": "Shailesh",
  "current_project": "PMO",
  "designation": "Developer",
  "billability_status": "Available",
  "billability_sub_status": "Optimization",
  "billing": "40",
  },
  {
  "id": 3,
  "status": false,
  "employee_id": "NIPL103",
  "project_name": "AWHP",
  "program_manager": "Uday Kadam",
  "week_enddate": "04/05/2020",
  "overall_status": true,
  "openrisk":"3",
  "employee_name": "Amit Yadav",
  "reporting_manager": "Uday Kadam",
  "current_project": "AWHP",
  "designation": "Tester",
  "billability_status": "FP Surplus",
  "billability_sub_status": "Shadow",
  "billing": "80",
  },
  {
  "id": 6,
  "status": true,
  "employee_id": "NIPL104",
  "project_name": "Bluestar",
  "program_manager": "Uday Kadam",
  "week_enddate": "03/04/2020",
  "overall_status": true,
  "openrisk":"2",
  "employee_name": "Atul Gaikwad",
  "reporting_manager": "Kasturi Panse",
  "current_project": "PMO",
  "designation": "Developer",
  "billability_status": "Billed",
  "billability_sub_status": "Replacement",
  "billing": "80",
  },
  {
  "id": 5,
  "status": false,
  "employee_id": "NIPL105",
  "program_manager": "Kasturi Panse",
  "project_name": "Sony",
  "week_enddate": "10/05/2020",
  "overall_status": true,
  "openrisk":"2",
  "employee_name": "Ashish Mali",
  "reporting_manager": "Uday Kadam",
  "current_project": "PMO",
  "designation": "Developer",
  "billability_status": "Available",
  "billability_sub_status": "Project",
  "billing": "46",
  },
  
 ]

 
const Risk = () => {

  const columns = [

    {
      label: "Id",
      name: "id",
      options: {
        display: false,
        // sortDirection:'asc'
      }
    },
    {
      label: "",
      name: "",
      options: {
        sortDirection:'desc',
       
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowId = tableMeta.rowData;
          // console.log(value);


          if (value === true)
            return (
              <AssistantPhotoIcon fontSize="small" style={{ color: "green" }}></AssistantPhotoIcon>
              // <h2>hi</h2>
            );
          else
            return (
              <AssistantPhotoIcon fontSize="small" style={{ color: "red" }}></AssistantPhotoIcon>
            );
        }
      }


    },
    {
      label: "Employee ID",
      name: "employee_id",
        options: {
            display: false
      }
    },
    {
        label: "Project Name",
        name: "project_name",
          options: {
        }
      },
      {
        label: "Program Manager",
        name: "program_manager",
          options: {
        }
      },
      {
        label: "Week End Date",
        name: "week_enddate",
          options: {
        }
      }, 
      {
        label: "Overall Project Status",
        name: "overall_status",
        options: {
            sortDirection:'desc',
           
            customBodyRender: (value, tableMeta, updateValue) => {
              const rowId = tableMeta.rowData;
              // console.log(value);
    
    
              if (value === true)
                return (
                  <AssistantPhotoIcon fontSize="small" style={{ color: "green" }}></AssistantPhotoIcon>
                  // <h2>hi</h2>
                );
              else
                return (
                  <AssistantPhotoIcon fontSize="small" style={{ color: "red" }}></AssistantPhotoIcon>
                );
            }
          }
       },
       {
        label: "Open Risk",
        name: "open_risk",
          options: {

        }
      }, 
 
    {
      label: "Employee Name",
      name: "employee_name",
        options: {
          // sortDirection:'asc'
          display:false
      }

    },
    {
      label: "Reporting Manager",
      name: "reporting_manager",
      options: {
        // sortDirection:'asc'
      display:false   
    }

    },
    {
      label: "Current Project",
      name: "current_project",
       options: {
        display:false
       } 
    },
    {
      label: "Designation",
      name: "designation",
      options: {
        display:false
      }  
    },
    {
      label: "Billability Status",
      name: "billability_status",
        options: {
            display:false
        }
    },
    {
      label: "Billability Sub-Status",
      name: "billability_sub_status",
        options: {
          display:false
      }
    },
    {
      label: "Billing %",
      name: "billing",
      options: {
        display: false
      }
    },
    {
      label: "EMP Id",
      name: "emp_id",
      options: {
        display: false,
        // sortDirection:'asc'
      }
    },
    {
      label: "Project ID",
      name: "project_id",
      options: {
        display: false,
        // sortDirection:'asc'
      }
    },

    {
      label: "",
      options: {

        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowId = tableMeta.rowData;

          //  console.log(rowId)

          if (rowId[1] == true) {
            return (
              <div>
                <IconButton onClick={() => handleClickOpenDetails(rowId[2],rowId[3],rowId[6],rowId[10])}>
                  <EditIcon />
                </IconButton>
                
                <IconButton onClick={() => handleClickOpenAdd(rowId[2],rowId[3],rowId[10],rowId[11])}>
                  < AddIcon ></AddIcon>
                </IconButton>
              </div>
            )
          }
          else {
            return (
              // <IconButton disabled={true}>
              //   <EditIcon style={{color:"white"}}/>
              
                
              // </IconButton>

              <IconButton onClick={() => handleClickOpenAdd(rowId[2],rowId[3],rowId[10],rowId[11])}>
                  < AddIcon ></AddIcon>
                </IconButton>
            )
          }

        }

      },
    },

  ];

  const options = {
    selectableRows: false,   //no checkbox
    filterType: "dropdown",  //filter on columns
    // responsive: "scroll",    //scrollbar
    // pagination	:false,
    viewColumns: false,
    download: true,
    print: false,
    elevation: 0


  };

  // useEffect(()=>{
  //   instance.get('/Resource_Allocation/')
  //   .then(response => {
  //     console.log(response);
      
  //   })
  // })

  const classes = useStyles();
  // const instance = axios.create({
  //     baseURL: 'http://10.21.18.59:5200/api/' 
  // });
  // const [project, setProject] = useState([]);
  const [ra, setra] = useState([]);
  const [values, setValues] = React.useState({ projectlist: " " });
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [enable, setenable] = React.useState(false);
  const [view, setView] = React.useState([]);

  //const [radetails, setradetails] = React.useState(false);

  const [row, setrow] = useState([]);
  //for emp    
  const [emp, setemp] = useState([]);

  //for designation
  const [designation, setdesignation] = useState([]);

  const [empidlist, setempidlist] = useState([]);

  let projectInfo = [];
  let RAInfo = [];
  let EmployeeData = [];
  let DesignationData = [];
  let employeeIDs=[];

  useEffect(() => {
    console.log("Getting users");

    instance.get('/Resource_Allocation/')
    .then(response => {
      console.log(response);
      
      let updated_RA = []

      // jQuery.each( response.data, function( key, emp_obj ) {
        for(let key in response.data){
          let emp_obj=response.data[key];
        console.log( key + ": " + emp_obj );
        // Check is emp id exist
        console.log("emp_id: ",emp_obj['emp_id'], emp_obj['status']);
       let emp_id = emp_obj['emp_id'];
       let status = emp_obj['status'];
       let existing_emp_index = get_existing_emp(emp_id, status, updated_RA);
        
        console.log("exisitng emp index : ",existing_emp_index);
        if(typeof(existing_emp_index) !== 'boolean'){
          console.log("exist emp ");
         let existing_emp = updated_RA[existing_emp_index];
          //updated_RA[emp_id] = value;
          if(existing_emp['status'] === emp_obj['status']){
            console.log("same status of project")
            // Add new project into exisitng project list
           let new_project = emp_obj['project'][0]
            updated_RA[existing_emp_index]['project'].push(new_project);
            // update RA Keys 
            updated_RA[existing_emp_index]['billability_status'] = 'Multiple';
            updated_RA[existing_emp_index]['billing_percentage'] = 'Multiple';
            updated_RA[existing_emp_index]['forecasted_utilization'] = 'Multiple';
            updated_RA[existing_emp_index]['actual_utilization'] = 'Multiple';
            updated_RA[existing_emp_index]['remarks'] = 'Multiple';
            updated_RA[existing_emp_index]['billability_sub_status'] = 'Multiple';
          }else{
            console.log("same emp but different project status")
            updated_RA.push(emp_obj)
          }
        }else{
          console.log("not exist")
          updated_RA.push(emp_obj)
        }
  
  
        };
        console.log(updated_RA);
      for(const key in updated_RA){
        
        RAInfo.push({
          id: updated_RA[key].id,
          emp_id:updated_RA[key].emp_id,
          status: updated_RA[key].status,
          // employee_id: response.data[key].employee_id,
          employee_name: updated_RA[key].employees[0].display_name,

          reporting_manager: updated_RA[key].reporting_manager,
          // project_id: response.data[key].project[0].id,
          current_project: updated_RA[key].project[0].project_name,
          // designation: response.data[key].designation[0].name,
          billability_status: updated_RA[key].billability_status,
          billability_sub_status: updated_RA[key].billability_sub_status,
          billing_percentage: updated_RA[key].billing_percentage,
        })
        
       
       
      }
      setra(RAInfo);
      // setempidlist(employeeIDs);
      
    })
    .catch(error => { console.log(error) })
 
  }, [])

const get_existing_emp =(emp_id, status, updated_RA) =>{
    var existing_emp_index = false
    // jquery.each( updated_RA, function( key, emp ) {
      for(let key in updated_RA){
        let emp=updated_RA[key];
        console.log("updated emp _id ", emp['emp_id'], "status : ",emp['status']);
        if(emp_id == emp['emp_id'] && status == emp['status']){
           console.log("found");
           existing_emp_index = key
        }
     };
     return existing_emp_index
    } 

    // console.log(updated_RA);
    

  let datalist = [];

  // console.log(ra);
  // console.log(dummyData);
  

  // console.log(dummyData.filter(data => data.status == false));

   let activeData1 = dummyData.filter(data => data.status == true)
  // let activeData1 = ra.filter(data => data.status == true)
  console.log(activeData1);

  let inactiveData2 = dummyData.filter(data => data.status == false)

  let activeData=activeData1.sort((a, b) => a.employee_id.localeCompare(b.employee_id))
  let inactiveData=inactiveData2.sort((a, b) => a.employee_id.localeCompare(b.employee_id))


let list=empidlist.sort((a, b) => a.employee_id.localeCompare(b.employee_id))

var results = [];
var results1 = [];
//get duplicate element
for (var i = 0; i < list.length - 1; i++) {
  console.log(list[i].employee_id);
  
  
  if (list[i + 1].employee_id === list[i].employee_id) {
      results.push(list[i]);
      console.log("hi");
     
  }
  
}
console.log(results);

//unique employee_id
const uniqueID = Array.from(new Set(activeData.map(a => a.employee_id)))
console.log(uniqueID);

  //for active 
  const multi=["nipl000"];
  activeData.forEach((e) => {

    const data = [];
    
    while (e.status === true) {
      
      data.push(e.id)
      data.push(e.status)
      data.push(e.employee_id)
      data.push(e.project_name)
      data.push(e.program_manager)
      data.push(e.week_enddate)
      data.push(e.overall_status)
      data.push(e.openrisk)  
      multi.push(e.employee_id)
      data.push(e.employee_name)
      data.push(e.reporting_manager)
      data.push(e.current_project)
      data.push(e.designation)
      data.push(e.billability_status)
      data.push(e.billability_sub_status)
      data.push(e.billing)
      data.push(e.emp_id)
      data.push(e.project_id)
      
      datalist.push(data);
    
      break
    }
  });
  //for inactive 

  inactiveData.forEach((e) => {

    //  console.log("found");
    const data = [];
    const data_inactive = [];
    

    while (e.status === false) {

      data.push(e.id)
      data.push(e.status)
      data.push(e.employee_id)
      data.push(e.project_name)
      data.push(e.program_manager)
      data.push(e.week_enddate)
      data.push(e.overall_status)
      data.push(e.openrisk)  
      data.push(e.employee_name)
      data.push(e.reporting_manager)
      data.push(e.current_project)
      data.push(e.designation)
      data.push(e.billability_status)
      data.push(e.billability_sub_status)
      data.push()      
      data.push(e.emp_id)
      data.push(e.project_id)

      datalist.push(data);
      break

    }
  });


  //props to AddResourceAllocation
  const [empID,setempID]=useState("");
  const [employeeID,setemployeeID]=useState("");
  const [employeeName,setemployeeName]=useState("");
  const [currentProjectID,setcurrentProjectID]=useState("");


  const handleClickOpenAdd = (employeeid,empname,empid,projid) => {
    //console.log(datalist);

    console.log(employeeid);
    console.log(empname);
    console.log(empid);
    console.log(projid);
    setempID(empid);
    setcurrentProjectID(projid)
    setemployeeID(employeeid)
    setemployeeName(empname)
    setOpen(true);


  };
  //const [editing, setEditing] = useState(false);
  const initialState = { employee_name:'', employee_id:'', designation:'' };
  const [currentPerson, setCurrentPerson] = useState(initialState);
  const [currentEmployee, setCurrentEmployee] = useState(initialState);



// useEffect(()=>{
//   console.log("false setting");
//   setEditing(false)

// })
  const handleClickOpenDetails = (empid,empname,designation,joining_date) => {
    //console.log(datalist);
    // console.log(empid);

    // // setradetails(true);
    // setEditing(true);

    // setCurrentPerson({ employee_name: empname, employee_id: empid, designation:designation })
    setCurrentEmployee({ employee_name: empname, employee_id: empid, designation:designation,joining_date:joining_date })

  };

  function handleClose() {
    setOpen(false);
    // setSow(false)
  }
  function addInput() {
    // setOpen(false);
    // setSow(false)
    window.location.reload();
  }

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (

    <div className="mainContent" >
        <h1>Risk</h1>
        <div  >
            <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
            data={datalist}
            columns={columns}
            options={options}
            // className={classes.root}
            />
            </MuiThemeProvider>
        </div>
        <AddRisk open={open} addInput={addInput} handleClose={handleClose} employeeName={employeeName} empID={empID} currentProjectID={currentProjectID} employeeID={employeeID}/>
    </div>


  );

}
export default Risk;