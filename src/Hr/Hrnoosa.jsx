import React from 'react';
// import { Tabs, Layout } from 'antd';
import 'antd/dist/antd.css';
import AppHeader from '../user/Header/AppHeader';
import { Outlet, useNavigate,useLocation } from "react-router-dom";
import { Tab } from '@material-ui/core';


// const { TabPane } = Tabs;
const Tabs =Object.freeze([{label:"Dashboard", link:"hr/dashboard"},
{label:"ListedPolices", link:"hr/listedPolices"},
{label:"Client", link:"hr/client"},
{label:"Premium", link:"hr/paypremium"},
{label:"Claims", link:"hr/newClaim"},
{label:"Complaint Managment", link:"hr/complaint"},
{label:"Service Request", link:"hr/servicerequest"},
{label:"Reimbursement", link:"hr/reimbursement"},
{label:"Holidays", link:"hr/holidays"},
// {label:"Settings", link:"user/setting"},
// {label:"Help & Support", link:"user/helpandsupport"}
])




// const { Header } = Layout;

export default function Hrnoosa() {
    let navigate = useNavigate();
    const location = useLocation();
    return (
        <div class="sb-nav-fixed bg-light">


            <AppHeader />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div class="sb-sidenav-menu">
                            <div class="nav mt-4">
                                {Tabs.map(({label,link})=>{
                                    const isActive = location.pathname.split("/")[1] === link;
                                    return(<a class= {`nav-link ${isActive ? 'active' : ''}`} key={link} onClick={()=>navigate(`/${link}`)}>

                                    {label}
                                </a>)
                                })}
                                
                               
                            </div>
                        </div>

                    </nav>
                </div>Complaint
                <div id="layoutSidenav_content">
                    <div class="container-fluid">
                        <Outlet/>
                        </div>
                        </div>
            </div>
        </div>
    );
}