import React, { useEffect, useState } from "react";
// import "./styles.css";
import { EditOutlined} from "@ant-design/icons";
import { Menu, Dropdown } from 'antd';
import {Button,Modal, Form, Table} from "react-bootstrap";
import moment from 'moment';
import { getEditHoliday,getDeleteHoliday ,getHolidaysList} from ".././services/authentication";
import {CSVLink} from "react-csv";




function HrHolidays() {
  const [show, setShow] = useState(false);
  const[ShowModal,setShowModal]=useState(false)
  const [HolidaysData, setHolidaysData] = useState("");
  const[HolidayListArray,setHolidayListArray]=useState('')
  const [TableData, setTableData] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCancel = () =>setShowModal(false)
  const [Data,setData] = useState({
    id:"",
    Name:"",
    Day:"",
    date:"",
    Type:""
  })

  const{Name,Day,date,Type,id}=Data;

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const HandleClick = () =>{

  }


  


  //List API

  const handleHolidaysList = async () => {
    try {
      let tableDataArr = [];
      const resp = await getHolidaysList();
      setHolidayListArray(resp&&resp.data)
      resp &&
        resp.data.map((data, i) => {
          const value = {
            id:data.id,
            Name: data.name,
            Date: data.date,
            Day: data.day,
            Type: data.type,
          };
          tableDataArr.push(value);
          setHolidaysData(value)
          setTableData(tableDataArr);
          console.log("tdr", tableDataArr);
        });
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleHolidaysList();
  }, []);
  
  //Ended

  //Delete API

  const handleDeleteInfo = async() =>{
     
    const payload ={
         "id": HolidaysData.id,
      }
      try {
        const resp = await getDeleteHoliday(payload);
        console.log('success',resp)
        resp && handleHolidaysList()
        // handelEditCancel()
      } catch (error) {
          console.log('error',error)
      }
 

  }


  //Ended

  //Edit API

  const handleShowModal = (selectedRec) =>{
    console.log("table",HolidaysData)
    console.log('selectedRec',selectedRec)
    const Date = moment(selectedRec.date).format('YYYY-MM-DD');
    setData({ 
    id:selectedRec.id,
    Name:selectedRec.Name,
    Day:selectedRec.Day,
    date:Date,
    Type:selectedRec.Type})
    setShowModal(true)
  }
  
  
  const handleEditInfo = async() =>{
const payload ={
     "id": HolidaysData.id,
    "name": Name,
    "date": date,
    "day": Day,
    "type": Type
  }
  try {
    const resp = await getEditHoliday(payload);
    console.log('success',resp)
    resp && handleHolidaysList()
    // handelEditCancel()
    setShowModal(false)
  } catch (error) {
      console.log('error',error)
  }
  
  }


  //ADD List API 
  const handleAddHlidayAPI = () =>{

  }


  const menu =(selectedRec)=> {
    return(
    <Menu>
      {/* <Menu.Item key="1">Assign to</Menu.Item> */}
      <Menu.Item key="2" onClick={() =>{handleShowModal(selectedRec)}}>Edit Info</Menu.Item>
      <Menu.Item key="3" onClick={() =>{handleDeleteInfo(selectedRec)}}>Delete</Menu.Item>
    </Menu>
    )
  }

  //CSV Download

  const HolidayCSVdata = () =>{
    let HolidayData =[]
    console.log("hla",HolidayListArray)
    const HolidayListArrayData = HolidayListArray && HolidayListArray
    if(HolidayListArrayData){
      HolidayData.push('Id,Name,Date,Day,Type\n')
      HolidayListArrayData.map((excelData)=>{
        console.log("excel",excelData)
        HolidayData.push(
          `${excelData.id},${excelData.name}, ${excelData.date}, ${excelData.day},${excelData.type}\n`
 
          )

      })
    }
    
    return HolidayData.join('')
  }
  const HolidayCSV = HolidayCSVdata()


  //Filter
  const handleFilterData = (filterData) =>{
    const tableDataArr =[];
    console.log('filterData',filterData)
    if(filterData.length > 0){
     filterData.map((data, i) => {
      const value = {
       id:data.id,
       Name:data.name,
       Day:data.day,
       Date:data.date,
       Type:data.type,
      }
      tableDataArr.push(value);
    });
  }
    return tableDataArr
  }


  const handleclick = (Type)=>{
    const HolidayfilterData = HolidayListArray && HolidayListArray.filter((data)=>data.type === Type)
    const filterData = handleFilterData(HolidayfilterData)
    setTableData(filterData)
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-7  col-lg-4 col-md-4 col-sm-3">
            <h4 id="head" className="my-3 mx-5">
              Holiday List 2022
            </h4>
          </div>
          <div className="col-xl-5  col-lg-4 col-md-3 col-sm-2">
            <div className="header">
              <button
                type="button"
                className="btn btn-success btn-sm my-3"
                style={{ width: "130px" }}
                onClick={handleShow}
              >
                <i className="fas fa-plus-circle"></i> Add Holiday List
              </button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title
                    style={{ color: "#61B33B", marginLeft: "130px" }}
                  >
                    Add Holiday List
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5>Upload CSV</h5>
                  <div className="container">
                    <div className="droptarget">
                      <i
                        className="fas fa-upload"
                        style={{ justifyContent: "center", display: "flex" }}
                      ></i>
                      <span style={{ fontSize: "1rem" }}>
                        Drag Drop file here
                      </span>
                    </div>
                  </div>
                  <p style={{ justifyContent: "center", display: "flex" }}>
                    Or
                  </p>
                  <Form.Group
                    controlId="formFile"
                    className="mb-3"
                  ></Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAddHlidayAPI}
                    style={{ width: "200%" }}
                  >
                    Add
                  </Button>
                </Modal.Footer>
              </Modal>
              <div className="btn-group hover_drop_down">
                <button
                  type="button"
                  className="btn btn-success btn-sm my-3"
                  data-toggle="dropdown"
                  style={{ width: "130px" }}
                >
                  <i className="fas fa-filter"></i> Add Filters
                </button>
                <ul className="dropdown-menu" role="menu" onClick={HandleClick}>
                  <li>
                    <a onClick={() =>{handleclick("Public Holiday")}}>Public Holiday </a>
                  </li>
                  <li>
                    <a onClick={() =>{handleclick("National Holiday")}}>National Holiday</a>
                  </li>
                  <li>
                    <a onClick={() =>{handleclick("seasonal Holiday")}}>seasonal Holiday</a>
                  </li>
                </ul>
              <button type="button" className="btn btn-primary btn-sm my-3">
              <CSVLink data={HolidayCSV} target="_blank">
                    Download PDF/CSV
                  </CSVLink>
              </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12  col-lg-9 col-md-6 col-sm-4">
            <Table responsive>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {TableData &&
                  TableData.map((item) => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.Name}</td>
                      <td>{item.Date}</td>
                      <td>{item.Day}</td>
                      <td>{item.Type}</td>
                      <td>
                        <Dropdown overlay={menu(item)}>
                          <a className="ant-dropdown-link">
                            <EditOutlined style={{ paddingLeft: "30px" }} />
                          </a>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-9  col-lg-6 col-md-4 col-sm-2">
          Shown Results{HolidayListArray.length}
          </div>
          <div className="col-xl-3  col-lg-3 col-md-2 col-sm-1">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#">
                    Prev
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="col-xl-5  col-lg-4 col-md-3 col-sm-2">
            <div className="header">
              <Modal show={ShowModal} onHide={handleCancel}>
                <Modal.Header closeButton>
                  <Modal.Title
                    style={{ color: "#61B33B", marginLeft: "130px" }}
                  >
                    Edit Holiday List
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="container">
                    <Form.Group>
                    <Form.Label>Id</Form.Label>
                    <Form.Control type="id" value={id} name="id" onChange={handleChange}></Form.Control> 
                     <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={Name} name="Name" onChange={handleChange}></Form.Control>
                    <Form.Label>Day</Form.Label>
                    <Form.Control type="text" value={Day} name="Day" onChange={handleChange}></Form.Control>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" value={date} name="date" onChange={handleChange}></Form.Control>
                    <Form.Label>Type</Form.Label>
                    <Form.Control type="text" value={Type} name="Type" onChange={handleChange}></Form.Control>
                    </Form.Group>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleEditInfo}
                    style={{ width: "200%" }}
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
      </div>
    </>
  );
}

export default HrHolidays;
