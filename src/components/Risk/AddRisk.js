import React, { Fragment, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import instance from '../../common/instance';
import DropDown from '../../common/DropDown';
import swal from 'sweetalert';
import MUIDataTable from "mui-datatables";
import { DropzoneArea } from 'material-ui-dropzone'
import Autocomplete from '@material-ui/lab/Autocomplete';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const risk_type = [
    "Risk 1",
    "Risk 2",
    "Risk 3"
]

const internal = [
    "Active",
    "onHold",
    "Inactive"
]

const owner = [
    "Owner 1",
    "Owner 2",
    "Owner 3"
]

const severity = [
    "Moderate",
    "Medium",
    "High"
]

const priority = [
    "Low",
    "Medium",
    "High"
]

const status = [
    "Available",
    "NotAvailable",
    "Hide"
]


const useStyles = makeStyles(() => ({
    // root:{

    // },
    container: {
        display: "flex",
        flexWrap: "wrap",
        width:"100%"
    },
    textField: {
        width: "100%",
    },
    dropDown: {
        width: "78%",
    },
    dialogcontent: {
        width: "1000%"
    },
    row: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%"
    },
    column: {
        display: "flex",
        flexDirection: "column",
        flexBasis: "100%",
        flex: 1
    }
}));

const projectData = [
    {
        "id":1,
        "project_name":"Project 1",
        "project_manager":"Manager 1",
        "allocation":"50",
        "role":"Tester",
        "billability_status":"Status 1",
        "billabilty_sub_status":"Sub-Status 1",
        "start_date":"10-03-2020",
        "end_date":"20-04-2020",
        "department":"P&D",
        "delivery_unit":"DU1"
    },
    // {
    //     "id":2,
    //     "project_name":"Project 2",
    //     "project_manager":"Manager 2",
    //     "allocation":"50",
    //     "role":"Developer",
    //     "billability_status":"Status 2",
    //     "billabilty_sub_status":"Sub-Status 2",
    //     "start_date":"10-03-2020",
    //     "end_date":"20-04-2020",
    //     "department":"P&D",
    //     "delivery_unit":"DU2"
    // },
    // {
    //     "id":3,
    //     "project_name":"Project 3",
    //     "project_manager":"Manager 3",
    //     "allocation":"50",
    //     "role":"Database",
    //     "billability_status":"Status 3",
    //     "billabilty_sub_status":"Sub-Status 3",
    //     "start_date":"10-03-2020",
    //     "end_date":"20-04-2020",
    //     "department":"P&D",
    //     "delivery_unit":"DU3"
    // }
]


const AddRisk = (props) => {

    const formik = useFormik({
        initialValues: {
          age: '',
          
        },
        // validate,
        validationSchema: Yup.object({
            age: Yup.string()
             .required('Age is required'),
            // description: Yup.string()
            // .required('Description Required'),
          }),   
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
          alert(values)
          console.log(values);
        },
      });


    const columns = [

        {
            label: "Id",
            name: "id",
            options: {
                display: false,
                sortDirection: 'asc',
                filter: false
            }
        },
        {
            label: "Project Name",
            name: "project_name",

        },
        {
            label: "Project Manager",
            name: "project_manager",

        },
        {
            label: "Allocation %",
            name: "allocation",

        },
        {
            label: "Role ",
            name: "role",

        },
        {
            label: "Billability Status",
            name: "billability_status",

        },
        {
            label: "Billability Sub-Status",
            name: "billability_sub_status",

        },
        {
            label: "Start Date ",
            name: "start_date",

        },
        {
            label: "End Date ",
            name: "end_date",

        },
        // {
        //     label: "Department ",
        //     name: "Department",

        // },
        {
            label: "Delivery Unit ",
            name: "delivery_unit",

        },
    ];


    //  const RiskColumns = [

    //     {
    //         label: "Id",
    //         name: "id",
    //         options: {
    //             display: false,
    //             sortDirection: 'asc'
    //         }
    //     },
    //     {
    //         label: "Age",
    //         name: "age",
    //         options: {
    //             sort: false
    //         }
    //     },

    //     {
    //         label: "Milestone Details",
    //         name: "milestone_details",
    //         options: {
    //             sort: false
    //         }

    //     },
    //     {
    //         label: "Amount",
    //         name: "amount",
    //         options: {
    //             sort: false
    //         }
    //     },

    // ];


    const options = {
        filterType: "dropdown",
        // responsive: "scroll",
        download: false,
        print: false,
        selectableRows: false,
        viewColumns: false,
        filter: false,
        pagination: false,
        search:false,
        elevation:0

    };

    
 const [files, setfiles] =useState([]);

 const handleChange1 = (file) => {
    // console.log("hi1");
     
     // setValues({ ...values, [name]: event.target.value });
     setfiles(file);
 };

   
    let emplist=[]
    const [emplistid, setemplistid] = useState([]);
    
    //console.log(props);
   
        // if(props.empidlist.length>0){
        //     console.log("found");
            
        // for (const key in props.empidlist) {
        //     emplist.push({
        //         id:  props.empidlist[key].emp_id,
        //     })
            
        //  }
        //     setemplistid(emplist)
        // }
  
    //     useEffect(()=>{
            
    //     if((props.empidlist).length){
    //         console.log("hi");
    //         for (const key in props.empidlist) {
    //                 emplist.push({
    //                     id:  props.empidlist[key].emp_id,
    //                 })
                    
    //              }
    //                 setemplistid(emplist)
    //     }
    //    else
    //    console.log("not found");
  
    //     },[props.empidlist])
        
    const classes = useStyles(0);
    const initialInputs = {  employee_id: "", tech_id: "", proj_id: "", status: "", allocation_percentage: "",utilization_percentage: ""}
   
    const [values, setValues] = React.useState(initialInputs)


     
    const [project, setProject] = useState([]);

    //projects per selected employee
    const [assignedProjectList,setassignedProjectList] = useState([]);
   
    let assignedprojlist=[];
 
   
    let projectInfo = [];
    let projects = [];
    const[list, setList] = useState([]);
    useEffect(() => {
      //for selecting projects
      console.log(props);

    //   const addRiskfun =() =>{
    //     console.log("In add risk function");
    //     alert("risk added ")
    //   }  
        // let data=[];
        // const [datalist,setdatalist]=useState([]);
        // const addResource =() =>{
        //     console.log("add");
        //     document.getElementById("resource-form").reset();
        //     console.log(data);
        //     console.log(data.length);
        
        //     const data1 = {
        //                     age:values.age,
        //                     // role:values.role,
        //                     // billability:values.billability,
        //                     // start_date:values.start_date,
        //                     // end_date:values.end_date,
        //                     // rate:values.rate
        //                 };

            
        //     data.push(data1)          
        
        //     if(datalist.length>0){
        //         console.log("not empty data");
        //         setdatalist([...datalist,data[0]])
        //     }
            
        //     else{
        //         console.log("empty data");
        //         setdatalist(data)
        //     }
        
        //     console.log(datalist.slice());
        
        
        //     // setdatalist(data)

        //     console.log(datalist);
        
        
        // }




//Project Dropdownlist    
      instance.get('/projects/')
      .then(response => {
          // console.log(response.data)
          for (const key in response.data) {
              projectInfo.push({
                  id: response.data[key].id,
                  name: response.data[key].name,
                  short_name: response.data[key].short_name,
                  code: response.data[key].code,
                  customer_id: response.data[key].customer_id,
                  project_type_one: response.data[key].project_type_one,
                  project_type_two: response.data[key].project_type_two,
                  project_type_three: response.data[key].project_type_three,
              })


          }
          setProject(projectInfo)
          // console.log(projectInfo)
      })
      .catch(error => { console.log(error) })


      instance.get(`/Resource_Allocation/emp/${props.employeeID}`)
      .then(response => {
          console.log(response)
          for (const key in response.data) {
              assignedprojlist.push({
                  proj_id: response.data[key].project[0].id,
              })
          }
         setassignedProjectList(assignedprojlist);
      })
      .catch(error => { console.log(error) })


    },[props])
// console.log(list);

    let projectList = [];
    list.forEach((project) => {
        const data = [];
        data.push(project.id);
        data.push(project.project_name);
        data.push(project.proj_manager);
        data.push(project.allocation);
        data.push(project.role);
        data.push(project.billability_status);
        data.push(project.billabilty_sub_status);
        data.push(project.start_date.slice(0,10));
        data.push(project.end_date.slice(0,10));
        data.push(project.department);
        data.push(project.delivery_unit);
            
        projectList.push(data);
        
    });

    // console.log(projectList);
    
    const handleChange = (name) => (event) => {
        // console.log(name);
        //  console.log(event.target.value);

        setValues({ ...values, [name]: event.target.value });
    };



    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values);
        console.log(props);
        console.log(emplistid);
      
        // instance.get(`/Resource_Allocation/emp/${props.employeeID}`)
        // .then(response => {
        //     console.log(response)
        //     for (const key in response.data) {
        //         assignedprojlist.push({
        //             proj_id: response.data[key].project[0].id,
        //         })
        //     }
        //    setassignedProjectList(assignedprojlist);
        // })
        // .catch(error => { console.log(error) })

        
        console.log(assignedProjectList);
        
        let valid=true;


        for(const key in assignedProjectList)
        {
            console.log(assignedProjectList[key]);
            
            if(assignedProjectList[key].proj_id===values.projectlist.id){
                console.log("in if");
                
                swal("Error", "Same Employee Already Assigned To This Project !", {
                                    // button:false,
                                    // timer:2000,
                                    icon:"warning"
                                });
                                valid=false;
                                break;
            }
        }
            if(valid){
                console.log("ITS fine");
                 let data = {
           
            emp_id: props.empID,
            tech_id: 1,
            role_id: 2,
            proj_id: values.projectlist.id,
            status:true,
            designation_id:2,
            // delivery_unit_id:values.du,
            delivery_unit_id:3,                   //auto populated
            proj_manager:values.manager_name,
            // proj_manager:values.manager_name,                    //auto populated

            reporting_manager: "Manager1",
            billability_status:values.billability_status,
            billability_sub_status:values.billability_sub_status,
            remarks:values.remarks,
            utilization:parseInt(values.actual_utilization),
            allocation:parseInt(values.allocation)

// empid,projid,role_id,tech_id,designation_id,proj_manager,utilization,allocation
        }
        console.log(data);

       

        instance.post('/Resource_Allocation/', data)
            .then((response) => {
                console.log(response);
                swal("Good job!", "Record inserted successfully!", {
                    button:false,
                    timer:2000,
                    icon:"success"
                });
                // props.addInput(data)
                
            }, (error) => {
                console.log(error);
            });

            }
        

    // if(emplistid){
    //     console.log("found");
    //    if((props.empidlist).length) {
    //     for(let key in props.empidlist)
    //     {
    //         console.log(emplistid[key].id);
    //         if(props.empidlist[key].emp_id==values.emplist.id){
    //             swal("Error", "Same Employee Already Assigned To This Project !", {
    //                 // button:false,
    //                 // timer:2000,
    //                 icon:"warning"
    //             });
    //             break;
    //         }
    //         else
    //         {
    //             let data = {
           
    //                 emp_id: values.emplist.id,
    //                 tech_id: values.techlist.id,
    //                 role_id: values.rolelist.id,
    //                 proj_id: props.proj_id.id,
    //                 status:values.allocation_status,
                   
    //                 utilization:parseInt(values.utilization),
    //                 allocation:parseInt(values.allocation)
                   
    //             }
    //             console.log(data);
        
               
        
    //             instance.post('/Resource_Allocation/', data)
    //                 .then((response) => {
    //                     console.log(response);
    //                     // emplistid.push({id:values.emplist.id});

    //                     swal("Good job!", "Record inserted successfully!", {
    //                         button:false,
    //                         timer:2000,
    //                         icon:"success"
    //                     });
    //                     props.addInput(data)
                        
    //                 }, (error) => {
    //                     console.log(error);
    //                 });
        
        
    //             setValues(initialInputs);
    //             // props.handleClose(false)
    //             break;
    //         }
            
    //     }}
    //     else{
    //         console.log("hi");
    //         let data = {
           
    //             emp_id: values.emplist.id,
    //             tech_id: values.techlist.id,
    //             role_id: values.rolelist.id,
    //             proj_id: props.proj_id.id,
    //             status:values.allocation_status,
               
    //             utilization:parseInt(values.utilization),
    //             allocation:parseInt(values.allocation)
               
    //         }
    //         console.log(data);
    
           
    
    //         instance.post('/Resource_Allocation/', data)
    //             .then((response) => {
    //                 console.log(response);
    //                 // emplistid.push({id:values.emplist.id});

    //                 swal("Good job!", "Record inserted successfully!", {
    //                     button:false,
    //                     timer:2000,
    //                     icon:"success"
    //                 });
    //                 props.addInput(data)
                    
    //             }, (error) => {
    //                 console.log(error);
    //             });
    
    
    //         setValues(initialInputs);
    //         props.handleClose(false)
    //        break;
    //     }
        
        
    // }
    // else{
        // console.log("in else");
        
        // let data = {
           
        //     emp_id: props.empID,
        //     tech_id: 1,
        //     role_id: 2,
        //     proj_id: values.projectlist.id,
        //     status:true,
        //     designation_id:2,
        //     // delivery_unit_id:values.du,
        //     delivery_unit_id:3,                   //auto populated
        //     proj_manager:values.manager_name,
        //     // proj_manager:values.manager_name,                    //auto populated

        //     reporting_manager: "Manager1",
        //     billability_status:values.billability_status,
        //     billability_sub_status:values.billability_sub_status,
        //     remarks:values.remarks,
        //     utilization:parseInt(values.actual_utilization),
        //     allocation:parseInt(values.allocation)

//empid,projid,role_id,tech_id,designation_id,proj_manager,utilization,allocation
        // }
        // console.log(data);

       

        // instance.post('/Resource_Allocation/', data)
        //     .then((response) => {
        //         console.log(response);
        //         swal("Good job!", "Record inserted successfully!", {
        //             button:false,
        //             timer:2000,
        //             icon:"success"
        //         });
        //         // props.addInput(data)
                
        //     }, (error) => {
        //         console.log(error);
        //     });


        // setValues(initialInputs);
    // }
    }
//  console.log(props);
// console.log(assignedProjectList);

// const check = () =>{
//     console.log("in check");
//     console.log(assignedProjectList);
    
//     for(const key in assignedProjectList)
//     {
//         console.log(assignedProjectList[key]);
        
//         if(assignedProjectList[key].proj_id===values.projectlist.id){
//             console.log("in if");
            
//             swal("Error", "Same Employee Already Assigned To This Project !", {
//                                 // button:false,
//                                 // timer:2000,
//                                 icon:"warning"
//                             });
//                             break;
//         }
//         else{
//             console.log("ITS fine");
            
//         }
//     }
    
// }
 let str="2020-04-21";
 
 
    return (
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth = "xl"
                >
               

                

                <form onSubmit={formik.handleSubmit}>
                <DialogTitle id="form-dialog-title">Add New WSR</DialogTitle>
                    <DialogContent>
                    {/* <div style={{display:"inline-flex"}}>
                        <label style={{marginLeft:"45px"}}> Project Name</label>
                        <label style={{marginLeft:"220px"}}>Project Manager</label>
                        <label style={{marginLeft:"175px"}}>Delivery Unit</label>
                        <label style={{marginLeft:"210px"}}>From Date:</label>
                        <label style={{marginLeft:"210px"}}>End Date:</label>
                    </div> */}
                    {/* <hr></hr> */}
                    <ExpansionPanel
                    defaultExpanded
                    style={{marginTop:"30px"}}
                >
                    <ExpansionPanelSummary
                        style={{ background: "rgb(127,127,127)" }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={classes.heading}
                    >
                        <Typography><b>Upload Files</b></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                                         
                          <DropzoneArea
                            id="file"
                                dropzoneText="Drag and Drop Files Here to Upload"
                                filesLimit={1000}
                                acceptedFiles={[]}
                                // showPreviews={true}
                                maxFileSize={500000000000000}
                                // showPreviewsInDropzone={false}
                                 showFileNames={true}
                                // previewText="Files"
                                // dropzoneClass={classes.DropzoneArea}
                                onChange={handleChange1.bind("file")}
                            />
                         
                          <div>
                        {/* <Button className={classes.button} variant="contained" >Add</Button> */}
                          </div>

                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanelSummary
                        style={{ background: "rgb(127,127,127)" }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={classes.heading}
                    >
                        <Typography><b>Risks</b></Typography>
                    </ExpansionPanelSummary>
                
                     
                    <div style={{display:"inline-flex"}}>
                    <Autocomplete
                                    size="small"
                                    id="risk_type"
                                    options={risk_type}
                                    getOptionLabel={option => option}
                                    onChange={(event, risk_type) => {
                                        setValues({ ...values, risk_type });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{ marginLeft: "10px", padding: "10px", width: "320px" }}
                                    renderInput={params => <TextField {...params}
                                        label="Risk Type"
                                        InputLabelProps={{ shrink: true }}
                                        margin="normal"
                                        variant="outlined"
                                        required={true}
                                    />}
                                />
                        
                        <div>
                                 <Autocomplete
                                    size="small"
                                    id="internal"
                                    options={internal}
                                    getOptionLabel={option => option}
                                    onChange={(event, internal) => {
                                        setValues({ ...values, internal });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{ marginLeft: "10px", padding: "10px", width: "320px" }}
                                    renderInput={params => <TextField {...params}
                                        label="Internal/External"
                                        InputLabelProps={{ shrink: true }}
                                        margin="normal"
                                        variant="outlined"
                                        required={true}
                                    />}
                                />
                            </div>
                            <Autocomplete
                                    size="small"
                                    id="owner"
                                    options={owner}
                                    getOptionLabel={option => option}
                                    onChange={(event, owner) => {
                                        setValues({ ...values, owner });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{ marginLeft: "10px", padding: "10px", width: "320px" }}
                                    renderInput={params => <TextField {...params}
                                        label="Owner"
                                        InputLabelProps={{ shrink: true }}
                                        margin="normal"
                                        variant="outlined"
                                        required={true}
                                    />}
                                />
                            </div>
                            <br></br>
                            <div style={{display:"inline-flex"}}>
                                <Autocomplete
                                    size="small"
                                    id="severity"
                                    options={severity}
                                    getOptionLabel={option => option}
                                    onChange={(event, severity) => {
                                        setValues({ ...values, severity });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{ marginLeft: "10px", padding: "10px", width: "320px" }}
                                    renderInput={params => <TextField {...params}
                                        label="Severity"
                                        InputLabelProps={{ shrink: true }}
                                        margin="normal"
                                        variant="outlined"
                                        required={true}
                                    />}
                                />
            
                    
                                <Autocomplete
                                    size="small"
                                    id="priority"
                                    options={priority}
                                    getOptionLabel={option => option}
                                    onChange={(event, priority) => {
                                        setValues({ ...values, priority });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{ marginLeft: "10px", padding: "10px", width: "320px" }}
                                    renderInput={params => <TextField {...params}
                                        label="Priority"
                                        InputLabelProps={{ shrink: true }}
                                        margin="normal"
                                        variant="outlined"
                                        required={true}
                                    />}
                                />
                    
                                
                                <TextField
                                    id="outlined-name"
                                    label="Risk Raised Date"
                                    InputLabelProps={{ shrink: true }}
                                    type="date"
                                    className={classes.textField}
                                    value={values.start_date}
                                    
                                    onChange={handleChange("start_date")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width: "200px", padding: "10px", marginLeft:"35px"}}
                                />
                         </div>   

                    {/* <br></br><br></br><br></br>
                    <div style={{display:"inline-flex"}}>
                        <label style={{marginLeft:"45px"}}>Allocation %</label>
                        <label style={{marginLeft:"220px"}}>*Fore-casted Utilization</label>
                        <label style={{marginLeft:"140px"}}>*Actual Utilization</label>
                        <label style={{marginLeft:"180px"}}>*Billability Status</label>
                        <label style={{marginLeft:"150px"}}>*Billability Sub-Status</label>
                    </div> */}
                    <br></br>
                    <div style={{display:"inline-flex"}}>
                    <TextField
                            id="age"
                            name="age"
                            label="Age"
                            InputLabelProps={{ shrink: true }}                            
                            className={classes.textField}
                            // required={true}
                            onChange={formik.handleChange("age")}
                            onBlur={formik.handleBlur}
                            value={formik.values.age}
                            margin="normal"
                            variant="outlined"
                            style={{marginLeft: "10px", padding: "10px", width: "320px" }}
                            // onInput = {(e) =>{
                            //     e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)
                            // }}
                        />
                          {formik.touched.age && formik.errors.age ? (
                                    <div style={{ marginLeft: "35px" }}>
                                      {formik.errors.age}
                                    </div>
                                  ) : null}

                                <Autocomplete
                                    size="small"
                                    id="status"
                                    options={status}
                                    getOptionLabel={option => option}
                                    onChange={(event, status) => {
                                        setValues({ ...values, status });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{marginLeft: "10px", padding: "10px", width: "320px" }}
                                    renderInput={params => <TextField {...params}
                                        label="Status"
                                        InputLabelProps={{ shrink: true }}
                                        margin="normal"
                                        variant="outlined"
                                        required={true}
                                    />}
                                />
                          <Button className={classes.button} style={{height:40,float:"right", marginLeft: "290px", marginTop:"25px"}} variant="contained"
                                       
                                        >
                                                    Add Risk
                          </Button> 
                                    
                       
                       
                     </div>
                      
                   </DialogContent>


                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary"> Cancel </Button>
                        <Button color="primary" type="submit" onClick={()=>props.handleClose}>Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
    );
};

export default AddRisk;
